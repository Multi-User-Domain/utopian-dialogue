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

    const { timeline } = useDialogue();
    const messagesEnd = useRef(null);
    const [displayMessages, setDisplayMessages] = useState([]);
    const [continueButton, setContinueButton] = useState(null);

    useEffect(() => {
        renderNextMessages();

        return () => {
            setDisplayMessages([]);
        }
    }, [timeline]);

    // "read" messages are those which have been animated already, we do not animate these
    let messagesRead = [];

    const renderNextMessages = () => {
        // adds all of the unread messages to the displayed messages in the WindupAnimation,
        // up until it hits the next break (continue button)
        let temp = [];

        for(let i = 0; i < timeline.length; i++) {
            let msgValue = timeline[i];
            let msgDisplay = <DialogueMessage key={i} message={msgValue}></DialogueMessage>;
        
            if(msgValue.read) messagesRead.push(msgDisplay);
            else {
                temp.push(msgDisplay);
                if(msgValue.includeContinuePrompt) break;
            }
        }

        setDisplayMessages(temp);

    }

    const nextMessage = (msgValue: IMessage) => {
        setContinueButton(null);
        if(msgValue.sideEffect) msgValue.sideEffect();
        renderNextMessages();
    }

    const markAllAsRead = () => {
        for(let msg of timeline) {
            if(!msg.read) {
                msg.read = true;
                //side-effects are carried out when the message has been read
                //but if there is a continue prompt then it will be effected after that is clicked
                if(msg.sideEffect && !msg.includeContinuePrompt) msg.sideEffect();
                if(msg.includeContinuePrompt) {
                    //display continue button
                    setContinueButton(<Container marginTop={5}>
                        <Center>
                            <Button onClick={() => nextMessage(msg)}>Continue</Button>
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
                    {displayMessages}
                </OnChar>
            </WindupChildren>
            {continueButton}
            <div style={{ float:"left", clear: "both"}} ref={messagesEnd}></div>
        </Container>
    );
}
