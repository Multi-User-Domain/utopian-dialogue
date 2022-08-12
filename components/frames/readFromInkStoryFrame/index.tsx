import React, { useEffect, useState } from "react";
import InkJs from 'inkjs';
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

    const storyJson = {"inkVersion":20,"root":[[{"->":"introduce_achilles"},["done",{"#f":5,"#n":"g-0"}],null],"done",{"introduce_achilles":[["^<Craig:> \"Greetings! I am Achilles, Champion of all the Greeks! And who are <em>you</em>, strange humanoid?\"","\n","^<Rupert:> \"And <em>I</em> am King Rupert\"","\n","^<Craig:> \"Nobody cares who you are\"","\n",["ev",{"^->":"introduce_achilles.0.6.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^<Player:> I am Player One, number one of all players ",{"->":"$r","var":true},null]}],["ev",{"^->":"introduce_achilles.0.7.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^<Player:> Greetitudes! I am Player One ",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"introduce_achilles.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.6.s"},[{"#n":"$r2"}],{"->":"champion"},"\n",{"#f":5}],"c-1":["ev",{"^->":"introduce_achilles.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.7.s"},[{"#n":"$r2"}],{"->":"not_champion"},"\n",{"#f":5}]}],{"#f":1}],"champion":["^<Craig:> \"Champion, eh?\". Achilles seems impressed","\n","done",{"#f":1}],"not_champion":["^<Craig:> \"Ha! Just Player One. Champion of nothing and superior to nobody\"","\n","done",{"#f":1}],"#f":1}],"listDefs":{}}
    const inkStory = new InkJs.Story(storyJson);

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

    const getResponses = (choices) => {
        let responses: IMessage[] = [];

        for(let i = 0; i < choices.length; i++) {
            let choice = choices[i];

            responses.push({
                shorthandContent: <p>{stripPerformerFromContent(choice.text)}</p>,
                performer: getPerformerFromContent(choice.text),
                selectFollowup: () => getNext(inkStory.ChooseChoiceIndex(i))
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
        getNext();
    }, []);

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
