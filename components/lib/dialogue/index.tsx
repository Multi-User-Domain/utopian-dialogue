import React from "react";

import {
    Container
} from "@chakra-ui/react";

import { WindupChildren } from "windups";

import useDialogue from "../../../hooks/useDialogue";
import DialogueMessage from "../dialogueMessage";
import { DialogueResponsePrompt } from "../dialogueResponse";

export interface IDialogue {
    children: any
}

export default function Dialogue({children}: IDialogue): React.ReactElement {

    const { timeline } = useDialogue();

    const messagesRead = [];
    const messagesUnread = [];

    timeline.map((msgValue, i) => {
        let msgDisplay = <DialogueMessage key={i} message={msgValue}>{msgValue.content}</DialogueMessage>;

        if(msgValue.read) messagesRead.push(msgDisplay);
        else {
            messagesUnread.push(msgDisplay);
            msgValue.read = true;
        }
    });

    return (
        <Container>
            {messagesRead}
            <WindupChildren>
                {messagesUnread}
                <DialogueResponsePrompt />
            </WindupChildren>
        </Container>
    );
}
