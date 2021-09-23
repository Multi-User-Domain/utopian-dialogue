import React, { createContext, ReactElement, useState, useEffect } from "react";

export interface IPlayerContext {
    webId?: string;
    name?: string;
    setName?: (string) => void;
    image?: string;
    setImage?: (string) => void;
    incomingRelationships?: any;
    outgoingRelationships?: {[object: string]: string[]};
    addIncomingRelationship?: (subject: string, labels: string[]) => void;
    hasIncomingRelationshipPair?: (subject: string, label: string) => boolean;
    addOutgoingRelationship?: (object: string, labels: string[]) => void;
    hasOutgoingRelationshipPair?: (object: string, label: string) => boolean;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const [webId, setWebId] = useState("_:player");
    const [name, setName] = useState("");
    const [image, setImage] = useState("../../../public/img/playerProfile/3.webp");
    const [incomingRelationships, setIncomingRelationships] = useState({});
    const [outgoingRelationships, setOutgoingRelationships] = useState({});

    const concatWithoutDuplicates = (arr1, arr2) => {
        return Array.from(new Set([...arr1,...arr2]));
    }

    const addIncomingRelationship = (subject, labels) => {
        // merge with pre-existing relationships
        if(subject in incomingRelationships) {
            labels = concatWithoutDuplicates(labels, incomingRelationships[subject])
        }

        incomingRelationships[subject] = labels;
        setIncomingRelationships({...incomingRelationships});
    }

    const addOutgoingRelationship = (object, labels) => {
        // merge with pre-existing relationships
        if(object in outgoingRelationships) {
            labels = concatWithoutDuplicates(labels, outgoingRelationships[object])
        }

        outgoingRelationships[object] = labels;
        setOutgoingRelationships({...outgoingRelationships});
    }

    const hasIncomingRelationshipPair = (subject, label) => {
        return (subject in incomingRelationships && incomingRelationships[subject].includes(label));
    }

    const hasOutgoingRelationshipPair = (object, label) => {
        return (object in outgoingRelationships && outgoingRelationships[object].includes(label));
    }

    return(
        <PlayerContext.Provider
            value={{
                webId,
                name,
                setName,
                image,
                setImage,
                incomingRelationships,
                outgoingRelationships,
                addIncomingRelationship,
                addOutgoingRelationship,
                hasIncomingRelationshipPair,
                hasOutgoingRelationshipPair
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
