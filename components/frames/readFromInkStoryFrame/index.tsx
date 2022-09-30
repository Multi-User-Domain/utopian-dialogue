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
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE, INTUITION_COLOUR, FAST_PACE } from "../../lib/constants";

const SHAKE_TIMEOUT = 500;

/*
*   A component which renders a dialogue directly from an ink file
*/

function ReadFromInkDialogue({followLink} : IStoryFrame) : React.ReactElement {
    const { addMessage } = useDialogue();
    const { playerPerformer } = usePlayer();
    const [storyUrl, setStoryUrl] = useState(null);
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
        if(effectName == "Shake") {
            return <Effect key={key} fn={() => shakeEffect("shake-hard shake-constant", ms)} />
        }
    }

    // contains a set of definitions for element generators supported in Ink files
    // for example, <Pause 100> will result in the React element <Pause ms={100}></Pause>
    const customInkElementDict = {
        "Pause": (key, ms) => { return <Pause key={key} ms={ms}></Pause> },
        "Effect": resolveEffect
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
        let content: string = inkStory.Continue();
        content = content.substring(originalChoiceText.length, content.length).trim();

        return getNext(content);
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
     * @return a React element generated from parsing
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
            let end = s.indexOf(">") + 1;
            let element: any = s.substring(index + 1, end -1);

            // split the element into its' component, and it's parameters (separated by spaces)
            element = element.split(" ");
            let elementName = element.shift();

            // find the element and push it to the contentArr
            contentArr.push(<span key={contentArr.length}>{s.substring(0, index)}</span>);
            if(Object.keys(customInkElementDict).includes(elementName)) {
                contentArr.push(customInkElementDict[elementName](contentArr.length, ...element));
            }

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
        let content = <Text>{contentArr}</Text>;

        return content;
    }

    const getNext = (s: string = null) => {
        if(s == null) s = inkStory.Continue();

        let performer = getPerformerFromContent(s);
        let content = parseContent(s);

        let hasChoices: boolean = inkStory.currentChoices.length > 0;

        addMessage({
            content: content,
            performer: performer,
            includeContinuePrompt: hasChoices ? false : true,
            getResponses: hasChoices ? () => getResponses(inkStory.currentChoices) : null,
            selectFollowup: inkStory.canContinue ? getNext : null
        });
    }

    useEffect(() => {
        if(storyUrl != null) {
            axios.get(storyUrl).then(res => {
                // get the file type returned by the server
                let story = null;

                if(res.headers["content-type"] == "application/json")
                    story = new InkJs.Story(res.data);
                else if(res.headers["content-type"] == "application/inkml+xml")
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

export default function ReadFromInkStoryFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <DialogueProvider>
            <ReadFromInkDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}
