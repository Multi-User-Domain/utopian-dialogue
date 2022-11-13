import React, { useEffect, useState } from "react";
import InkJs from 'inkjs';
import axios from 'axios';
import { Text, Container, Button, Center, Input } from "@chakra-ui/react";
import { WindupChildren, Pause, Pace, Effect } from "windups";

import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../../components/lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";

import { performers, PerformerNames } from "../../lib/performers";
import { colourFadeAnimationCss, fadeOutTransition, fadeInTransition } from "../../lib/animations";
import { SLOW_PACE } from "../../lib/constants";

const SHAKE_TIMEOUT = 500;

interface IReadFromInkDialogueFrame extends IStoryFrame {
    url?: string;
}

/*
*   A component which renders a dialogue directly from an ink file
*/

function ReadFromInkDialogue({followLink, url} : IReadFromInkDialogueFrame) : React.ReactElement {
    const { addMessage } = useDialogue();
    const { playerPerformer } = usePlayer();
    const [storyUrl, setStoryUrl] = useState(url);
    const [storyUrlInput, setStoryUrlInput] = useState("https://calum.inrupt.net/public/utopian-dialogue/ink/achilles.ink");
    const [inkStory, setInkStory] = useState(null);

    // CSS classes to apply to the story container
    // used for example for animations
    const [storyClasses, setStoryClasses] = useState(null);

    const shakeEffect = (classes: string, timeout=SHAKE_TIMEOUT) => {
        setStoryClasses(classes);

        setTimeout(() => {
            setStoryClasses(null);
        }, timeout);
    }

    const resolveEffect = (key, effectName, ms=SHAKE_TIMEOUT) => {
        if(effectName == "Shake")  
            return <Effect key={key} fn={() => shakeEffect("shake-hard shake-constant", ms)} />;
    }

    const colorFadeTransition = (key, subcontent, colorA, colorB, ms) => {
        return <Text key={key} className={colourFadeAnimationCss(colorA, colorB, ms)} as="span">{subcontent}</Text>;
    }

    // contains a set of definitions for element generators supported in Ink files
    // for example, <Pause 100> will result in the React element <Pause ms={100}></Pause>
    const customInkElementDict = {
        "Pause": (key, ms) => { return <Pause key={key} ms={ms}></Pause> },
        "Effect": resolveEffect,
        "em": (key, subcontent) => { return <em key={key}>{subcontent}</em> },
        "b": (key, subcontent) => { return <b key={key}>{subcontent}</b> },
        "color": (key, subcontent, color) => { return <Text key={key} color={color} as="span">{subcontent}</Text> },
        "Pace": (key, subcontent, ms) => { return <Pace key={key} ms={ms}>{subcontent}</Pace> },
        "br/": (key) => { return <br key={key} /> },
        "ColorFade": colorFadeTransition,
        "Continue": () => { return "" },
    }

    // similar pattern which returns css classes following directives
    const customInkCssDirectiveDict = {
        "FadeInAll": fadeInTransition,
        "FadeOutAll": fadeOutTransition
    }

    const getPerformerFromContent = (content: string) => {
        if(content.startsWith("<") && content.indexOf(":>") > 0) {
            let i = content.indexOf(":>");
            let name = content.substring(1,i);
            
            if(name == "Player") return playerPerformer;
            else if (name in performers) return performers[name];
        }

        return performers[PerformerNames.NULL_PERFORMER]
    }

    const stripPerformerFromContent: (string) => string = (content: string) => {
        let i = content.indexOf(":>");
        if(content.startsWith("<") && i > 0) content = content.substring(i + 2, content.length);

        return content;
    }

    const makeChoice = (index: number, originalChoiceText: string) => {
        inkStory.ChooseChoiceIndex(index);
        getNext(originalChoiceText, () => {
            let content: string = inkStory.Continue();
            content = content.substring(originalChoiceText.length, content.length).trim();
            getNext(content);
        });
    }

    const getResponses = (choices) => {
        let responses: IMessage[] = [];

        for(let i = 0; i < choices.length; i++) {
            let choice = choices[i];

            responses.push({
                shorthandContent: <p>{stripPerformerFromContent(choice.text)}</p>,
                performer: getPerformerFromContent(choice.text),
                selectFollowup: () => makeChoice(i, choice.text)
            });
        }

        return responses;
    }

    /**
     * @param s the string from an Ink file to be parsed
     * @return a React element generated from parsing. The content contained within a <span> component
     */
    const parseContent = (s: string) => {
        s = stripPerformerFromContent(s);
        let contentArr = [];

        // first find all the explicit examples of animation controls
        let index = 0;
        while(index >= 0) {
            index = s.indexOf("<");
            if(index < 0 || s[index + 1] == ">") continue; // catch empty brackets - ink "glue" syntax

            // isolate the bounds of our element
            let end = s.indexOf(">", index) + 1;
            let nextOpenTag = s.indexOf("<", index+1);
            if(end <= 0 || (nextOpenTag > 0 && nextOpenTag <= end)) {
                console.warn("Possible error in ink story - missing closing tag for element. Is this an intended less-than character (<)? The surrounding text is: " + s.substring(index, index + 15));
                s = s.substring(index+1, s.length);
                continue;
            }
            let element: any = s.substring(index + 1, end -1);

            // split the element into its' component, and it's parameters (separated by spaces)
            element = element.split(" ");
            let elementName = element.shift();

            // find the element and push it to the contentArr
            contentArr.push(<span key={contentArr.length}>{s.substring(0, index)}</span>);
            if(Object.keys(customInkElementDict).includes(elementName)) {
                // some elements encapsulate text (e.g. <em>text</em>)
                let endBracket = s.indexOf("</" + elementName + ">");
                if(endBracket >= 0) {
                    let nextInst = s.indexOf("<" + elementName, index + 1);
                    if (nextInst < 0 || endBracket < nextInst) {
                        let subcontent: any = parseContent(s.substring(end, endBracket));
                        contentArr.push(customInkElementDict[elementName](contentArr.length, subcontent, ...element));

                        // when we remove the element from the string, we can now remove the text within as well
                        end = endBracket + elementName.length + 3; // + 3 for < and then /> characters
                    }
                }

                // .. whilst others represent standalone effects (e.g. <Pause>)
                else {
                    contentArr.push(customInkElementDict[elementName](contentArr.length, ...element));
                }
            }
            else console.warn("parsed unknown element " + elementName);

            // strip the element from the content
            s = s.substring(end, s.length);
        }

        // find all automated animations
        index = 0;
        while(index >= 0) {
            index = s.indexOf("...");
            if(index < 0) break;

            s = s.substring(0, index) + s.substring(index + 3, s.length);
            contentArr.push(<span key={contentArr.length}><Pace ms={SLOW_PACE}>...</Pace></span>)
        }

        // build the content into a ReactElement
        contentArr.push(<span key={contentArr.length}>{s}</span>);
        let content = <Text as="span">{contentArr}</Text>;

        return content;
    }

    /**
     * @param s the string from an Ink file to be parsed
     * @return an array. In [0] - the css requested to be applied to the container (can be null). In [1], the string with all css tags removed
     */
    const parseContainerCss = (s: string) => {
        let css = null;

        // TODO: allow more than one CSS directive - at the moment it is only FadeIn or FadeOut, which are incompatible anyway
        for(let [key, value] of Object.entries(customInkCssDirectiveDict)) {
            let searchTerm = "<" + key;
            let index = s.indexOf(searchTerm);
            if(index >= 0) {
                let end = s.indexOf(">", index) + 1;
                let element: any = s.substring(index + 1, end - 1);
                element = element.split(" ");
                element.shift(); // remove element name from the parameters

                css = customInkCssDirectiveDict[key](...element);

                s = s.substring(0, index) + s.substring(end, s.length);
                break;
            }
        }

        return [css, s];
    }

    const hasContinue = (s: string) => {
        return s.indexOf("<Continue>") > 0;
    }

    const getNext: (s?: string, selectFollowup?: () => void) => void = (s=null, selectFollowup=null) => {
        if(s == null) s = inkStory.Continue();

        let isContinue = hasContinue(s);
        let performer = getPerformerFromContent(s);
        let parsedCss = parseContainerCss(s);
        s = parsedCss[1];
        let content = <Text>{parseContent(s)}</Text>;

        let hasChoices: boolean = inkStory.currentChoices.length > 0;
        let includeContinuePrompt: boolean = isContinue && !hasChoices;
        if(selectFollowup == null) selectFollowup = inkStory.canContinue ? () => getNext() : null;

        addMessage({
            containerCss: parsedCss[0],
            content: content,
            performer: performer,
            includeContinuePrompt: includeContinuePrompt,
            getResponses: hasChoices ? () => getResponses(inkStory.currentChoices) : null,
            selectFollowup: selectFollowup,
            onRead: (!hasChoices && !includeContinuePrompt && inkStory.canContinue) ? () => getNext() : null
        });
    }

    useEffect(() => {
        if(storyUrl != null) {
            axios.get(storyUrl).then(res => {
                // get the file type returned by the server
                let story = null;

                if(res.headers["content-type"].includes("application/json") || res.headers["content-type"].includes("text/plain"))
                    story = new InkJs.Story(res.data);
                else if(res.headers["content-type"].includes("application/inkml+xml"))
                    story = new InkJs.Compiler(res.data).Compile();
                
                if(story != null) setInkStory(story);
                else console.error("unrecognised content-type " + res.headers["content-type"]);
            });
        }
    }, [storyUrl]);

    useEffect(() => {
        if(inkStory != null) getNext();
    }, [inkStory]);

    if(storyUrl == null) {
        return (
            <Container>
                <Center marginTop={15}>
                    <Input
                        label="Story URL"
                        type="url"
                        value={storyUrlInput}
                        onChange={(e) => setStoryUrlInput(e.target.value)}/>
                </Center>
                <Center marginTop={10}>
                    <Button onClick={() => setStoryUrl(storyUrlInput)}>Submit</Button>
                </Center>
            </Container>
        );
    }

    return (
        <Container className={storyClasses ? storyClasses : ""}>
            <WindupChildren>
                <Dialogue>
                </Dialogue>
            </WindupChildren>
        </Container>
    );
    
}

export default function ReadFromInkStoryFrame({followLink, url} : IReadFromInkDialogueFrame): React.ReactElement {

    return (
        <DialogueProvider>
            <ReadFromInkDialogue followLink={followLink} url={url}/>
        </DialogueProvider>
    );
}
