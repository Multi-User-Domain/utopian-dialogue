import React, { createContext, ReactElement, useState } from "react";
import { IPerformer, performers, PerformerNames } from "../../components/lib/performers";

export interface IMessage {
    performer: IPerformer;
    containerCss?: string;
    content?: ReactElement;
    shorthandContent?: ReactElement;
    read?: boolean; // indicates that the message has been read now and the display should change accordingly (e.g. stop animating)
    includeContinuePrompt?: boolean; //if set to true it will hold other messages until the user selects 'Continue'
    excludeSkipPrompt?: boolean; //if set to true the message cannot be skipped
    getResponses?: () => IMessage[];
    selectFollowup?: () => void; // a shortcut to the response mechanism - forces the message to be responded to in a specific way
    onRead?: () => void; // an optional hook when the message is read
}

export interface IDialogueParticipant {
    webId?: string;
    name: string;
    imgSrc: string;
}

export interface IDialogueContext {
    getResponse?: (msg: IMessage) => void;
    messageBuffer?: IMessage[];
    addMessage?: (msg: IMessage) => void;
    addMessages?: (...messages: IMessage[]) => void;
    nextMessageBuffer?: () => void;
    dialogueEnded?: boolean;
    setDialogueEnded?: (dialogueEnded: boolean) => void;
    selectRandomFrom?: (arr: any[]) => any;
};

export interface IDialogueContextProps {
    children: any;
};

export const DialogueContext = createContext<IDialogueContext>({});

export const DialogueProvider = ({
    children
}: IDialogueContextProps): ReactElement => {

    // a dialogue maintains two buffers
    // the messages which will be rendered next (until the next time the player can make an action)
    const [messageBuffer, setMessageBuffer] = useState<IMessage[]>([]);

    // this boolean should be used in the UI to instruct that the dialogue is finished and it's time to move on
    const [dialogueEnded, setDialogueEnded] = useState<boolean>(false);

    const addMessage = (msg) => {
        if(msg.includeContinuePrompt && msg.getResponses) {
            console.error("addMessage received a message with both includeContinuePrompt and getResponses");
            console.error(msg);
        }

        if(msg.performer == null) {
            console.warn("addMessage received a message not passing a performer. Setting to the null performer for now");
            console.log(msg);
            msg.performer = performers[PerformerNames.NULL_PERFORMER]
        }

        setMessageBuffer(prevBuffer => (
            [...prevBuffer, msg]
        ));
    }

    const addMessages = (...messages) => {
        setMessageBuffer(prevBuffer => (
            [...prevBuffer, ...messages]
        ));
    }

    const nextMessageBuffer = () => {
        for(let msg of messageBuffer) {
            messageBuffer.shift();

            if(msg.includeContinuePrompt || msg.getResponses) break;
        }

        setMessageBuffer(messageBuffer);
    }

    const getResponse = (msg) => {
        // the conversation lead (player) has said something
        nextMessageBuffer();

        if(msg.selectFollowup && !msg.includeContinuePrompt) {
            msg.selectFollowup();
        }
    }

    const selectRandomFrom = (arr: any[]) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    return(
        <DialogueContext.Provider
            value={{
                getResponse,
                messageBuffer,
                addMessage,
                addMessages,
                nextMessageBuffer,
                dialogueEnded,
                setDialogueEnded,
                selectRandomFrom,
            }}
        >
            {children}
        </DialogueContext.Provider>
    );
};
