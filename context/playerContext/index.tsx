import React, { createContext, ReactElement, useState, useEffect } from "react";
import axios from "axios";
import validator from 'validator';
import { IPerformer } from "../../components/lib/performers";
import { API_URL, MUD_CHAR } from "../../components/lib/constants";

import { useMudAccount } from "../../hooks/useMudAccount";

export interface IRelationship {
    label: string,
    strength?: number
}

export interface IPlayerContext {
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
    createCharacter?: () => void;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const { webId } = useMudAccount();

    const [playerPerformer, setPlayerPerformer] = useState<IPerformer>({
        name: "",
        imgSrc: "../../../public/img/playerProfile/7.webp"
    });
    const [relationships, setRelationships] = useState<{[object: string]: IRelationship[]}>({});

    const getUrlImgSrc = () => {
        if(validator.isUrl(playerPerformer.imgSrc)) return playerPerformer.imgSrc;

        let imgFileNameArr = playerPerformer.imgSrc.split("/");
        let imgFileName = imgFileNameArr[imgFileNameArr.length - 1];
        return "https://raw.githubusercontent.com/Multi-User-Domain/utopian-dialogue/master/public/img/playerProfile/" + imgFileName;
    }

    const createCharacter = () => {
        let jsonld = {
            "@context": MUD_CHAR.DEFAULT_CONTEXT,
            "@type": MUD_CHAR.Character,
            "dcterms:creator": webId,
            "foaf:depiction": getUrlImgSrc(),
            "n:fn": playerPerformer.name
        }

        axios.post(API_URL + "characters/", jsonld).then((res) => {
            console.log("successfully posted character " + res["n:fn"]);
        });
    }

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
            console.log(r.label.normalize() + ' == ' + label.normalize() + '? ' + r.label.normalize() == label.normalize());
            if(r.label.normalize() == label.normalize()) return r;
        }

        return null;
    }

    const addRelationship = (object, newRelationship) => {
        // merge with pre-existing relationships
        console.log("adding " + object + " relationship " + newRelationship.label + " (" + newRelationship.strength + ")")

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

        console.log(relationships);

        setRelationships({...relationships});
    }

    const removeRelationship = (object, relationship) => {
        if(!hasRelationshipPair(object, relationship.label)) return;

        relationships[object] = relationships[object].filter(x => relationship.label.includes(x.label));
        setRelationships({...relationships});
    }

    const hasRelationshipPair = (object, label) => {
        console.log("is object " + object + " in player relationships? " + (object in relationships));
        console.log("getRelationshipPair returns " + getRelationshipPair(object, label));
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
                buildRelationshipObject,
                createCharacter
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
