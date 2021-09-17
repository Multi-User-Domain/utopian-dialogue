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
    includeContinuePrompt?: boolean; //if set to true it will hold other messages until the user selects 'Continue'
    sideEffect?: () => void;
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
    speak: (lastMsg: IMessage) => IMessage;
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

    const [participants, setParticipants] = useState<{ [key: string]: IDialogueParticipant }>({});
    const [timeline, setTimeline] = useState([]);

    const addParticipant = (p: IDialogueParticipant) => {
        setParticipants(prevParticipants => ({
            ...prevParticipants,
            [p.name]: p
        }));
    }

    const addMessage = (msg) => {
        if(msg.sideEffect) msg.sideEffect();

        setTimeline(prevTimeline => (
            [...prevTimeline, msg]
        ));
    }

    const getResponse = (msg) => {
        // the conversation lead (player) has said something
        addMessage(msg);

        // this is the triggering of a new "round" of dialogue
        // each non-human character is given a chance to speak, the highest priority wins
        let response = null;

        for(let [name, participant] of Object.entries(participants)) {
            let newResponse = participant.speak(msg);

            if(response == null || newResponse.urgency > response.urgency) response = newResponse;
        }

        addMessage(response);
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
