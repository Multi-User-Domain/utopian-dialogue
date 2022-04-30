import React, {useRef, useState, useEffect} from "react";

import {
    Container,
    Center,
    Button
} from "@chakra-ui/react";

import { WindupChildren, OnChar } from "windups";

import useDialogue from "../../../hooks/useDialogue";
import DialogueMessage from "../dialogueMessage";
import { IMessage } from "../../../context/dialogueContext";

export interface IDialogue {
    children: any
}

export default function Dialogue({children}: IDialogue): React.ReactElement {

    // DialogueContext MessageBuffer tells us about the messages in the dialogue globally
    const { messageBuffer } = useDialogue();

    // our own message display buffer tells us about the messages which are being rendered to the player now
    // e.g. until the next 'Continue' Prompt
    const [messageDisplayBuffer, setMessageDisplayBuffer] = useState<IMessage[]>([]);

    const messagesEnd = useRef(null);
    // "read" messages are those which have been animated already, we do not animate these
    const [messagesRead, setMessagesRead] = useState([]);
    const [animatingMessages, setAnimatingMessages] = useState([]);
    const [continueButton, setContinueButton] = useState(null);

    useEffect(() => {
        continueDialogue();
    }, [messageBuffer]);

    useEffect(() => {
        renderNextMessages();
    }, [messageDisplayBuffer]);

    const renderNextMessages = () => {
        // adds all of the unread messages to the displayed messages in the WindupAnimation,
        let messagesRead = [];
        let temp = [];

        for(let i = 0; i < messageDisplayBuffer.length; i++) {
            let msgValue = messageDisplayBuffer[i];
            let msgContent = msgValue.content ? msgValue.content : msgValue.shorthandContent;
            let msgDisplay = <DialogueMessage key={i} message={msgValue} firstMessageInSeq={i == 0}>{msgContent}</DialogueMessage>;
        
            if(msgValue.read) messagesRead.push(msgDisplay);
            else {
                temp.push(msgDisplay);
                if(msgValue.includeContinuePrompt) break;
            }
        }

        setMessagesRead(messagesRead);
        setAnimatingMessages(temp);

    }

    // resets the display buffer and populates it with the next messages from the dialogue buffer
    const continueDialogue = () => {

        let temp: IMessage[] = [];

        // decide whether to clear old messages or not
        if(messageDisplayBuffer.length) {
            let last = messageDisplayBuffer[messageDisplayBuffer.length - 1];
            if(!last.includeContinuePrompt && !last.getResponses) temp = Array.from(messageDisplayBuffer);
        }

        while(messageBuffer.length) {
            let message = messageBuffer.shift();
            temp.push(message);
            
            // the display buffer next ends when it finds a message with a continue prompt or a player action
            if(message.includeContinuePrompt || message.getResponses) break;
        }

        setMessageDisplayBuffer(temp);
    }

    const selectContinue = (msgValue: IMessage) => {
        setContinueButton(null);
        if(msgValue.sideEffect) msgValue.sideEffect();
        if(msgValue.selectFollowup) msgValue.selectFollowup();
        continueDialogue();
    }

    const markAllAsRead = () => {
        for(let msg of messageDisplayBuffer) {
            if(!msg.read) {
                msg.read = true;
                //side-effects are carried out when the message has been read
                //but if there is a continue prompt then it will be effected after that is clicked
                if(msg.sideEffect && !msg.includeContinuePrompt) msg.sideEffect();
                if(msg.includeContinuePrompt) {
                    //display continue button
                    setContinueButton(<Container marginTop={5}>
                        <Center>
                            <Button onClick={() => selectContinue(msg)}>Continue</Button>
                        </Center>
                    </Container>);

                    return; //stop marking message read at any breaks
                };
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
                    {animatingMessages}
                </OnChar>
            </WindupChildren>
            {continueButton}
            <div style={{ float:"left", clear: "both"}} ref={messagesEnd}></div>
        </Container>
    );
}
