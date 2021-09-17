import React, {useRef} from "react";

import {
    Container
} from "@chakra-ui/react";

import { WindupChildren, OnChar } from "windups";

import useDialogue from "../../../hooks/useDialogue";
import DialogueMessage from "../dialogueMessage";
import { DialogueResponsePrompt } from "../dialogueResponse";

export interface IDialogue {
    children: any
}

export default function Dialogue({children}: IDialogue): React.ReactElement {

    const { timeline } = useDialogue();
    const messagesEnd = useRef(null);

    const messagesRead = [];
    const messagesUnread = [];

    timeline.map((msgValue, i) => {
        let msgDisplay = <DialogueMessage key={i} message={msgValue}>{msgValue.content}</DialogueMessage>;

        if(msgValue.read) messagesRead.push(msgDisplay);
        else {
            messagesUnread.push(msgDisplay);
        }
    });

    const markAllAsUnread = () => {
        timeline.map((msgValue, i) => {
            msgValue.read = true;
        });
    }

    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <Container paddingBottom="10vh">
            {messagesRead}
            <WindupChildren onFinished={markAllAsUnread}>
                <OnChar fn={scrollToBottom}>
                    {messagesUnread}
                    <DialogueResponsePrompt />
                </OnChar>
            </WindupChildren>
            <div style={{ float:"left", clear: "both"}} ref={messagesEnd}></div>
        </Container>
    );
}
