import React, { createContext, ReactElement, useState } from "react";
import { IPerformer } from "../../components/lib/performers";

export interface IRelationship {
    label: string,
    strength?: number
}

export interface IPlayerContext {
    webId?: string;
    setName?: (string) => void;
    setImage?: (string) => void;
    playerPerformer?: IPerformer;
    relationships?: {[object: string]: IRelationship[]};
    hasRelationshipPair?: (object: string, label: string) => boolean;
    hasRelationshipStrongerThan?: (object: string, label: string, strength: number) => boolean;
    hasRelationshipWeakerThan?: (object: string, label: string, strength: number) => boolean;
    getRelationshipPair?: (object: string, label: string) => IRelationship;
    addRelationship?: (object: string, newRelationship: IRelationship) => void;
    removeRelationship?: (object: string, newRelationship: IRelationship) => void;
    buildRelationshipObject?: (label: string, strength: number) => IRelationship;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const [webId, setWebId] = useState("_:player");
    const [playerPerformer, setPlayerPerformer] = useState<IPerformer>({
        name: "",
        imgSrc: "../../../public/img/playerProfile/7.webp"
    });
    const [relationships, setRelationships] = useState<{[object: string]: IRelationship[]}>({});

    const setName = (value: string) => {
        playerPerformer.name = value;
        setPlayerPerformer(playerPerformer);
    }

    const setImage = (value: string) => {
        playerPerformer.imgSrc = value;
        setPlayerPerformer(playerPerformer);
    }

    const getRelationshipPair = (object: string, label: string) : IRelationship => {
        if(!(object in relationships)) return null

        for(let i = 0; i < relationships[object].length; i++) {
            let r = relationships[object][i];
            if(r.label.includes(label)) return r;
        }

        return null;
    }

    const addRelationship = (object, newRelationship) => {
        // merge with pre-existing relationships
        if(object in relationships) {

            let r = getRelationshipPair(object, newRelationship.label);

            if(r != null) {
                // update strength. Add them together if we can, else choose the one which is defined
                let str = r.strength ? (newRelationship.strength ? r.strength + newRelationship.strength : r.strength) : newRelationship.strength;

                relationships[object][newRelationship.label] = {
                    label: newRelationship.label,
                    strength: str
                }
            }
        }
        else relationships[object] = [newRelationship];

        setRelationships({...relationships});
    }

    const removeRelationship = (object, relationship) => {
        if(!hasRelationshipPair(object, relationship.label)) return;

        relationships[object] = relationships[object].filter(x => relationship.label.includes(x.label));
        setRelationships({...relationships});
    }

    const hasRelationshipPair = (object, label) => {
        return (object in relationships && getRelationshipPair(object, label) != null);
    }

    const hasRelationshipStrongerThan = (object, label, strength) => {
        return hasRelationshipPair(object, label) && getRelationshipPair(object, label).strength >= strength;
    }

    const hasRelationshipWeakerThan = (object, label, strength) => {
        return hasRelationshipPair(object, label) && getRelationshipPair(object, label).strength <= strength;
    }

    const buildRelationshipObject = (label, strength) => {
        return {
            'label': label,
            'strength': strength
        }
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
                hasRelationshipPair,
                hasRelationshipStrongerThan,
                hasRelationshipWeakerThan,
                getRelationshipPair,
                buildRelationshipObject
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
