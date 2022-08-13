import React, { useEffect, useState } from "react";
import InkJs from 'inkjs';
import axios from 'axios';
import { Text } from "@chakra-ui/react";

import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../../components/lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";

import { performers, PerformerNames, IPerformer } from "../../lib/performers";

/*
*   A component which renders a dialogue directly from an ink file
*/

function ReadFromInkDialogue({followLink} : IStoryFrame) : React.ReactElement {
    const { addMessage, dialogueEnded, setDialogueEnded, selectRandomFrom } = useDialogue();
    const { playerPerformer } = usePlayer();
    const [inkStory, setInkStory] = useState(null);

    const storyUrl = "https://calum.inrupt.net/public/utopian-dialogue/achilles.ink.json";

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
        if(content.startsWith("<") && content.indexOf(":>") > 0) {
            let i = content.indexOf(":>");

            content = content.substring(i + 2, content.length);
        }

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

    const getNext = (s: string = null) => {
        if(s == null) s = inkStory.Continue();

        let performer = getPerformerFromContent(s);
        s = stripPerformerFromContent(s);

        let hasChoices: boolean = inkStory.currentChoices.length > 0;

        addMessage({
            content: <Text>{s}</Text>,
            performer: performer,
            includeContinuePrompt: hasChoices ? false : true,
            getResponses: hasChoices ? () => getResponses(inkStory.currentChoices) : null,
            selectFollowup: inkStory.canContinue ? getNext : null
        });
    }

    useEffect(() => {
        axios.get(storyUrl).then(res => {
            setInkStory(new InkJs.Story(res.data));
        });
    }, []);

    useEffect(() => {
        if(inkStory != null) getNext();
    }, [inkStory]);

    return (
        <Dialogue>
        </Dialogue>
    );
    
}

export default function ReadFromInkStoryFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <DialogueProvider>
            <ReadFromInkDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}
