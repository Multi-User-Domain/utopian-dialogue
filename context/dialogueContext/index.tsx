import React, { createContext, ReactElement, useState } from "react";
import { IPerformer } from "../../components/lib/performers";

export interface IMessage {
    performer?: IPerformer;
    containerCss?: string;
    content?: ReactElement;
    shorthandContent?: ReactElement;
    read?: boolean; // indicates that the message has been read now and the display should change accordingly (e.g. stop animating)
    includeContinuePrompt?: boolean; //if set to true it will hold other messages until the user selects 'Continue'
    sideEffect?: () => void;
    getResponses?: () => IMessage[];
    selectFollowup?: () => void; // a shortcut to the response mechanism - forces the message to be responded to in a specific way
}

export interface IRemoteMessage extends IMessage {
    performerUrl?: string;
    contentUrl?: string;
    responsesUrl?: string;
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
    dialogueEnded?: boolean;
    setDialogueEnded?: (dialogueEnded: boolean) => void;
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
        setMessageBuffer(prevBuffer => (
            [...prevBuffer, msg]
        ));
    }

    const getResponse = (msg) => {
        // the conversation lead (player) has said something
        addMessage(msg);

        if(msg.selectFollowup) {
            msg.selectFollowup();
            return;
        }
    }

    return(
        <DialogueContext.Provider
            value={{
                getResponse,
                messageBuffer,
                addMessage,
                dialogueEnded,
                setDialogueEnded
            }}
        >
            {children}
        </DialogueContext.Provider>
    );
};
