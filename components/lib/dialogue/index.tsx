import React from "react";

import {
    Container,
    Grid,
    Center,
    Text,
    GridItem,
    Image
} from "@chakra-ui/react";

import { WindupChildren, Pause, Effect, Pace } from "windups";

import useDialogue from "../../../hooks/useDialogue";
import DialogueMessage from "../dialogueMessage";

export interface IDialogue {
    children: any
}

export default function Dialogue({children}: IDialogue): React.ReactElement {

    const { timeline } = useDialogue();

    const messagesRead = [];
    const messagesUnread = [];

    for (let i = 0; i < timeline.length; i++) {
        let msgValue = timeline[i];
        let msgDisplay = <DialogueMessage key={i} message={msgValue}>{msgValue.content}</DialogueMessage>;

        if(msgValue.read) messagesRead.push(msgDisplay);
        else {
            messagesUnread.push(msgDisplay);
            // the windupchildren doesn't work if you do this here for some reason
            //msgValue.read = true;
        }
    }

    return (
        <Container>
            {messagesRead}
            <WindupChildren>
                {messagesUnread}
            </WindupChildren>
        </Container>
    );
}
