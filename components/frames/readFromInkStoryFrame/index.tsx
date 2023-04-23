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

import { performers, PerformerNames, IPerformer } from "../../lib/performers";
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
    const [storyUrlInput, setStoryUrlInput] = useState("https://calum.inrupt.net/public/utopian-dialogue/ospreyWithersDialogue.json");
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

    const resolveNameFromJsonLD = (data) => {
        //TODO: reading different name properties and syntaxes using a JSON-LD parser
        return "n:fn" in data ? data["n:fn"] : ("foaf:name" in data ? data["foaf:name"] : "[Unknown]")
    }

    const getPerformerRemote = async (url: string) => {
        return new Promise<IPerformer>((resolve, reject) => {
            // TODO: corsanywhere is not a production solution for CORS errors
            axios.get("https://cors-anywhere.herokuapp.com/" + url).then(res => {
                let content_type = res.headers["content-type"]
                // can be json-ld
                // TODO: remove text/plain when not using static GitHub resources for testing
                if(content_type.includes("application/json") || content_type.includes("application/ld+json") ||
                    content_type.includes("text/plain")) {

                    return resolve({
                        name: resolveNameFromJsonLD(res.data),
                        imgSrc: "https://cors-anywhere.herokuapp.com/" + res.data["foaf:depiction"]
                    });
                }
                // can be just an image directly
                else if(content_type.includes("image/")) {
                    return resolve({
                        name: "[Unknown]",
                        imgSrc: "https://cors-anywhere.herokuapp.com/" + url
                    });
                }
            });
        });
    }

    const getPerformerFromContent = async (content: string) => { 
        if(content.startsWith("<") && content.indexOf(":>") > 0) {
            let i = content.indexOf(":>");
            let name = content.substring(1,i);
            
            if(name == "Player") return playerPerformer;
            else if (name in performers) return performers[name];
            // read remote performer
            else if (name.startsWith("http")) return await getPerformerRemote(name);
        }

        return performers[PerformerNames.NULL_PERFORMER];
    }

    const stripPerformerFromContent: (content: string) => string = (content) => {
        
        let i = content.indexOf(":>");
        if(content.startsWith("<") && i > 0) content = content.substring(i + 2, content.length);

        return content;
    }

    /**
     * a generator which identifies the bounds of each opening tag in parameterised string
     * @param s the content to parse
     */
    function getGeneratorForTagBounds(s: string, startIndex: number = 0) {

        function* generator() {
            s = s.slice(); // creates a local copy of s
            let index: number = startIndex;

            while(true) {
                index = s.indexOf("<", index);
                if(index < 0) break; // stop condition - no more open tags
                if(s[index + 1] == ">") continue; // ignore <>, it's ink "glue" syntax and should be left in-tact
                
                // code for finding the closing tag that bounds it
                let end = s.indexOf(">", index);
                if(end < 0) break; // stop condition - no more closing tags
                end++;
                let nextOpenTag = s.indexOf("<", index+1);
                if(end <= 0 || (nextOpenTag > 0 && nextOpenTag < end)) {
                    console.warn("Possible error in ink story - missing closing tag for element. Is this an intended less-than character (<)? The surrounding text is: " + s.substring(index, index + 15));
                    s = s.substring(index+1, s.length);
                    continue;
                }
                
                yield [index, end];
                index++;
            }
        }

        return generator();
    }

    /**
     * @returns a version of parameter content with all directives removed (e.g. performer, pauses, <Continue>)
     */
    const stripAllDirectivesFromContent: (content: string) => string = (s) => {
        s = stripPerformerFromContent(s);

        let tagParser = getGeneratorForTagBounds(s, 0);
        let next = tagParser.next();
        
        while(!next.done) {
            s = s.substring(0, next.value[0] - 1) + s.substring(next.value[1], s.length);
            next = tagParser.next();
        }

        return s;
    }

    const getResponses = async (choices) => {
        let responses: IMessage[] = [];

        for(let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            let choiceText = stripPerformerFromContent(choice.text)

            responses.push({
                shorthandContent: <p>{stripAllDirectivesFromContent(choiceText)}</p>,
                content: <p>{choiceText}</p>,
                performer: await getPerformerFromContent(choice.text),
                selectFollowup: () => {
                    inkStory.ChooseChoiceIndex(i);
                    getNext(null, null, choice.text);
                }
            });
        }

        return responses;
    }

    /**
     * @param s the string from an Ink file to be parsed
     * @return a React element generated from parsing. The content contained within a <span> component
     */
    const parseContent = (inputString: string) => {
        const originalContent = stripPerformerFromContent(inputString.slice()); // slice() passes a copy of the string
        let parserIndex: number = 0;
        let contentArr = [];

        // auxiliary function for pushing content which has no animation tags inside
        const commitTaglessContent = (s: string) => {
            // we check for automated animations here
            //TODO: reintroduce this
            /*let index = 0;
            while(index >= 0) {
                index = s.indexOf("...");
                if(index < 0) break;
    
                contentArr.push(<span key={contentArr.length}>{s}</span>)
                contentArr.push(<span key={contentArr.length}><Pace ms={SLOW_PACE}>...</Pace></span>)
            }*/
    
            contentArr.push(<span key={contentArr.length}>{s}</span>)
        }

        // commits content up to a certain index, and then the tag
        const commitParsedContent = (contentFunction, contentParams, startIndex: number, endIndex: number) => {
            commitTaglessContent(originalContent.substring(parserIndex, startIndex));
            contentArr.push(contentFunction(contentArr.length, ...contentParams));
            parserIndex = endIndex;
        }

        // auxiliary function for handling encapsulating tags (tags containing subcontent, like <em>subcontent</em>)
        const handleEncapsulatingTag = (element, elementName: string, index: number, contentStart: number, endBracket: number) => {
            let nextInst = originalContent.indexOf("<" + elementName, index + 1);
            if (nextInst < 0 || endBracket < nextInst) {
                let subcontent: any = parseContent(originalContent.substring(contentStart, endBracket));
                // NOTE: we separate function and params so that the "key" parameter isn't assigned until the content is committed
                let contentFunction = customInkElementDict[elementName];
                let contentParams = [subcontent, ...element];
                // find the end bracket
                let endOfEndBracket = endBracket + elementName.length + 3; // + 3 for < and then for />
                commitParsedContent(contentFunction, contentParams, index, endOfEndBracket);
            }
        }

        // first find all the explicit examples of animation controls
        let tagParser = getGeneratorForTagBounds(originalContent, 0);
        let next = tagParser.next();
        
        while(!next.done) {
            // iterate over the content and find tags
            let index: number = next.value[0];
            let openingTagEnd: number = next.value[1];
            let element: any = originalContent.substring(index + 1, openingTagEnd -1);

            // identify the opening tag content
            element = element.split(" ");
            let elementName = element.shift();

            // customInkElementDict contains all of the valid tag rules
            if(Object.keys(customInkElementDict).includes(elementName)) {
                // some elements encapsulate text (e.g. <em>text</em>)
                let endBracket = originalContent.indexOf("</" + elementName + ">", index);
                if(endBracket >= 0) handleEncapsulatingTag(element, elementName, index, openingTagEnd, endBracket);

                // .. whilst others represent standalone effects (e.g. <br/> <Pause>)
                else {
                    let contentFunction = customInkElementDict[elementName];
                    let contentParams = [...element];
                    commitParsedContent(contentFunction, contentParams, index, openingTagEnd);
                }
            }
            else console.warn("parsed unknown element '" + elementName + "'");

            next = tagParser.next();
        }

        // stripped all of the tags out, push whatever is remaining
        commitTaglessContent(originalContent.substring(parserIndex, originalContent.length));

        // build the content into a ReactElement
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

    const getNext: (s?: string, selectFollowup?: () => void, stripText?: string) => void = async (s=null, selectFollowup=null, stripText=null) => {
        if(s == null) s = inkStory.Continue();
        if(stripText != null) {
            let index = s.indexOf(stripText);
            if(index >= 0) s.substring(index, stripText.length);
        }

        let isContinue = hasContinue(s);
        if(isContinue) s = s.substring(0, s.indexOf("<Continue>"));
        let performer = await getPerformerFromContent(s);
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
            getResponses: hasChoices ? async () => await getResponses(inkStory.currentChoices) : null,
            selectFollowup: selectFollowup,
            onRead: (!hasChoices && !includeContinuePrompt && inkStory.canContinue) ? () => getNext() : null
        });
    }

    /**
     * @param res a response from a web request, including headers and JSON or Ink content for the story script
     * @return compiled Story object (InkJS), which we can run
     */
    const compileStory = (res) => {
        let story = null;

        if(res.headers["content-type"].includes("application/json") || res.headers["content-type"].includes("text/plain"))
            story = new InkJs.Story(res.data);
        else if(res.headers["content-type"].includes("application/inkml+xml"))
            story = new InkJs.Compiler(res.data).Compile();
        else console.error("unrecognised content-type " + res.headers["content-type"]);
        
        return story;
    }

    /**
     * parses a muddialogue:Interaction, setting the script and context accordingly
     * @param data a muddialogue:Interaction object, in JSON-LD
     */
    const parseInteraction = (data) => {
        return new Promise<any>((resolve, reject) => {
            if("muddialogue:inkFile" in data) {
                axios.get(data["muddialogue:inkFile"]).then((res) => {
                    return resolve(compileStory(res));
                });
            }
            else console.error("muddialogue:inkFile key must be included in Interaction JSON");
        });
    }

    useEffect(() => {
        const parseFromResponse = async (res) => {
            return new Promise<any>(async (resolve, reject) => {
                let story = null;

                if("@type" in res.data && res.data["@type"] == "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/muddialogue.ttl#Interaction")
                    story = await parseInteraction(res.data);
                
                // fallback case is to attempt to compile it as an ink story directly (for simple narratives)
                else story = compileStory(res);
                
                return resolve(story);
            });
        }

        if(storyUrl != null) {
            axios.get(storyUrl).then(res => {
                parseFromResponse(res).then((story) => {
                    if(story != null) setInkStory(story);
                });
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
