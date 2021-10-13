import React, { createContext, ReactElement, useState } from "react";
import { IPerformer } from "../../components/lib/performers";

export interface IPlayerContext {
    webId?: string;
    setName?: (string) => void;
    setImage?: (string) => void;
    playerPerformer?: IPerformer;
    relationships?: {[object: string]: string[]};
    hasRelationshipPair?: (object: string, label: string) => boolean;
    addRelationship?: (object: string, labels: string[]) => void;
    removeRelationship?: (object: string, labels: string[]) => void;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const [webId, setWebId] = useState("_:player");
    const [playerPerformer, setPlayerPerformer] = useState<IPerformer>({
        name: "",
        imgSrc: "../../../public/img/playerProfile/3.webp"
    });
    const [relationships, setRelationships] = useState({});

    const setName = (value: string) => {
        playerPerformer.name = value;
        setPlayerPerformer(playerPerformer);
    }

    const setImage = (value: string) => {
        playerPerformer.imgSrc = value;
        setPlayerPerformer(playerPerformer);
    }

    const concatWithoutDuplicates = (arr1, arr2) => {
        return Array.from(new Set([...arr1,...arr2]));
    }

    const addRelationship = (object, labels) => {
        // merge with pre-existing relationships
        if(object in relationships) {
            labels = concatWithoutDuplicates(labels, relationships[object])
        }

        relationships[object] = labels;
        setRelationships({...relationships});
    }

    const removeRelationship = (object, labels) => {
        if(!(object in relationships)) return;

        relationships[object] = relationships[object].filter(x => !labels.includes(x));
        setRelationships({...relationships});
    }

    const hasRelationshipPair = (object, label) => {
        return (object in relationships && relationships[object].includes(label));
    }

    return(
        <PlayerContext.Provider
            value={{
                webId,
                playerPerformer,
                setName,
                setImage,
                relationships,
                addRelationship,
                removeRelationship,
                hasRelationshipPair
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
