import React, { createContext, ReactElement, useState, useEffect } from "react";

export interface IPlayerContext {
    webId?: string;
    name?: string;
    setName?: (string) => void;
    image?: string;
    setImage?: (string) => void;
    incomingRelationships?: any;
    outgoingRelationships?: any;
    addIncomingRelationship?: (subject: string, labels: string[]) => void;
    addOutgoingRelationship?: (object: string, labels: string[]) => void;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const [webId, setWebId] = useState("_:player");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
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

        setIncomingRelationships(prevIncomingRelationships => (
            {...prevIncomingRelationships, [subject]: labels}
        ));
    }

    const addOutgoingRelationship = (object, labels) => {
        // merge with pre-existing relationships
        if(object in outgoingRelationships) {
            labels = concatWithoutDuplicates(labels, outgoingRelationships[object])
        }

        setOutgoingRelationships(prevOutgoingRelationships => (
            {...prevOutgoingRelationships, [object]: labels}
        ));
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
                addOutgoingRelationship
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
