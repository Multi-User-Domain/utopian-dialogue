import React, { createContext, ReactElement, useState, useEffect } from "react";

export interface IMessage {
    webId?: string;
    msgId?: string;
    name: string;
    imgSrc?: string;
    content: ReactElement;
    shorthandContent?: ReactElement;
    urgency?: number;
    read?: boolean;
    getResponses?: () => IMessage[];
}

export interface IDialogueParticipant {
    webId?: string;
    name: string;
    imgSrc: string;
    isHuman: boolean;
    indexStart: number;
    mood: string;
    currentGoal: string;
    speak: () => IMessage;
}

export interface IDialogueContext {
    getResponse?: (msg: IMessage) => void;
    timeline?: IMessage[];
    addParticipant?: (p: IDialogueParticipant) => void;
    addMessage?: (msg: IMessage) => void;
};

export interface IDialogueContextProps {
    children: any;
};

export const DialogueContext = createContext<IDialogueContext>({});

export const DialogueProvider = ({
    children
}: IDialogueContextProps): ReactElement => {

    const [participants, setParticipants] = useState({});
    const [timeline, setTimeline] = useState([]);

    const addParticipant = (p: IDialogueParticipant) => {
        setParticipants(prevParticipants => ({
            ...prevParticipants,
            [p.name]: p
        }));
    }

    const addMessage = (msg) => {
        setTimeline(prevTimeline => (
            [...prevTimeline, msg]
        ));
    }

    const getResponse = (msg) => {
        // someone has sent a message

        // this function is the triggering of a new "round" of dialogue
        // each character is given a chance to speak

        // human participants speak with priority

        // AI is allowed to react

    }

    return(
        <DialogueContext.Provider
            value={{
                getResponse,
                timeline,
                addParticipant,
                addMessage
            }}
        >
            {children}
        </DialogueContext.Provider>
    );
};
