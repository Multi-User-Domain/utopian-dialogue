import React, {useRef, useState, useEffect} from "react";

import {
    Container,
    Center,
    Button
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
    const [displayMessages, setDisplayMessages] = useState([]);
    const [continueButton, setContinueButton] = useState(null);

    useEffect(() => {
        renderNextMessages();
    }, [timeline]);

    // "read" messages are those which have been animated already, we do not animate these
    let messagesRead = [];

    const renderNextMessages = () => {
        // adds all of the unread messages to the displayed messages in the WindupAnimation,
        // up until it hits the next break (continue button)
        let temp = [];

        for(let i = 0; i < timeline.length; i++) {
            let msgValue = timeline[i];
            let msgDisplay = <DialogueMessage key={i} message={msgValue}>{msgValue.content}</DialogueMessage>;
        
            if(msgValue.read) messagesRead.push(msgDisplay);
            else {
                temp.push(msgDisplay);
                if(msgValue.includeContinuePrompt) {
                    setContinueButton(<Container marginTop={5}>
                        <Center>
                            <Button onClick={() => nextMessage()}>Continue</Button>
                        </Center>
                    </Container>);
                    break;
                }
            }
        }

        setDisplayMessages(temp);

    }

    const nextMessage = () => {
        setContinueButton(null);
        renderNextMessages();
    }

    const markAllAsRead = () => {
        for(let msg of timeline) {
            if(!msg.read) {
                msg.read = true;
                if(msg.includeContinuePrompt) return; //stop at any breaks
            }
        }
    }

    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <Container paddingBottom="10vh">
            {messagesRead}
            <WindupChildren onFinished={markAllAsRead}>
                <OnChar fn={scrollToBottom}>
                    {displayMessages}
                    <DialogueResponsePrompt />
                    {continueButton}
                </OnChar>
            </WindupChildren>
            <div style={{ float:"left", clear: "both"}} ref={messagesEnd}></div>
        </Container>
    );
}
