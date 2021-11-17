import React, { createContext, ReactElement, useState, useEffect } from "react";
import { IPerformer } from "../../components/lib/performers";

export interface IMessage {
    performer: IPerformer;
    containerCss?: string;
    content: ReactElement;
    shorthandContent?: ReactElement;
    read?: boolean;
    includeContinuePrompt?: boolean; //if set to true it will hold other messages until the user selects 'Continue'
    sideEffect?: () => void;
    getResponses?: () => IMessage[];
    selectFollowup?: () => void; // a shortcut to the response mechanism - forces the message to be responded to in a specific way
}

export interface IDialogueParticipant {
    webId?: string;
    name: string;
    imgSrc: string;
}

export interface IDialogueContext {
    getResponse?: (msg: IMessage) => void;
    timeline?: IMessage[];
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

    const [timeline, setTimeline] = useState([]);
    const [dialogueEnded, setDialogueEnded] = useState(false);

    const addMessage = (msg) => {
        setTimeline(prevTimeline => (
            [...prevTimeline, msg]
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
                timeline,
                addMessage,
                dialogueEnded,
                setDialogueEnded
            }}
        >
            {children}
        </DialogueContext.Provider>
    );
};
