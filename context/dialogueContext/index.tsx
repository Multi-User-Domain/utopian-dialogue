import React, { createContext, ReactElement, useState, useEffect } from "react";

import { Text } from "@chakra-ui/react";

import {
    getThingAll,
    getUrlAll,
    SolidDataset,
    Thing,
    getStringNoLocale,
    getThing,
    getUrl,
    getSolidDataset,
    getBoolean
  } from "@inrupt/solid-client";
import { useSession, DatasetProvider, useDataset } from "@inrupt/solid-ui-react";
import {RDF, FOAF} from "@inrupt/lit-generated-vocab-common";
import { MUD_DIALOGUE } from "@multi-user-domain/mud-lib";

import { IPerformer } from "../../components/lib/performers";

export interface IMessage {
    performer?: IPerformer;
    performerUrl?: string;
    containerCss?: string;
    content?: ReactElement;
    contentUrl?: string;
    shorthandContent?: ReactElement;
    read?: boolean;
    includeContinuePrompt?: boolean; //if set to true it will hold other messages until the user selects 'Continue'
    sideEffect?: () => void;
    getResponses?: () => IMessage[];
    responsesUrl?: string;
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
    parsePerformer?: (performerUrl: string) => Promise<IPerformer>;
    addMessagesFromSolidDataset?: (dataset: SolidDataset) => void;
    addMessagesFromUrl?: (url: string) => void;
    parseResponses?: (responsesUrl: string, performer: IPerformer) => Promise<IMessage[]>;
};

export interface IDialogueContextProps {
    children: any;
};

/**
 * @returns All Things from a given dataset if they are of parameterised type
 */
export const getFilteredThings: (dataset: SolidDataset, propertyType: string) => Thing[] = (dataset, propertyType) => {
    let ret = [];
    getThingAll(dataset).forEach((thing) => {
        const TYPES = getUrlAll(thing, RDF.type);
        if(TYPES.includes(propertyType)) ret.push(thing);
    });
    return ret
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

    // methods for handling RDF reading
    const parsePerformer: (performerUrl: string) => Promise<IPerformer> = (performerUrl) => {
        return new Promise<IPerformer>((resolve, reject) => {
            getSolidDataset(performerUrl).then((performerDataset) => {

                const performerThing = getThing(performerDataset, performerUrl);

                return resolve({
                    name: getStringNoLocale(performerThing, FOAF.name),
                    imgSrc: getUrl(performerThing, FOAF.depiction)
                });
            });
        });
    }

    const parseResponses: (responsesUrl: string, performer: IPerformer) => Promise<IMessage[]> = (responsesUrl, performer) => {

        return new Promise<IMessage[]>((resolve, reject) => {

            getSolidDataset(responsesUrl).then((dataset) => {
                return resolve(getFilteredThings(dataset, MUD_DIALOGUE.Message).map(response => parseMessage(response, performer)));
            });

        });
    }

    const resourceFollowup = (urlFollowup) => {
        if(!urlFollowup) return;
        addMessagesFromUrl(urlFollowup);
    }

    const parseMessage: (mt: Thing, performer?: IPerformer) => IMessage = (mt, performer=undefined) => {
        
        const followup = getUrl(mt, MUD_DIALOGUE.selectFollowup);

        return {
            content: <Text>{getStringNoLocale(mt, MUD_DIALOGUE.content)}</Text>,
            contentUrl: getUrl(mt, MUD_DIALOGUE.content),
            performer: performer,
            performerUrl: getUrl(mt, MUD_DIALOGUE.performer),
            includeContinuePrompt: getBoolean(mt, MUD_DIALOGUE.includeContinuePrompt),
            selectFollowup: followup ? () => resourceFollowup(followup) : undefined,
            responsesUrl: getUrl(mt, MUD_DIALOGUE.getResponses)
        }
    }

    const addMessagesFromSolidDataset = (dataset) => {
        const messageThings = getFilteredThings(dataset, MUD_DIALOGUE.Message);

        messageThings.forEach((mt) => {
            let message = parseMessage(mt);

            addMessage(message);
        });
    }

    const addMessagesFromUrl = (url) => {
        return new Promise<void>((resolve, reject) => {
            getSolidDataset(url).then((dataset) => resolve(addMessagesFromSolidDataset(dataset)));
        });
    }

    return(
        <DialogueContext.Provider
            value={{
                getResponse,
                timeline,
                addMessage,
                dialogueEnded,
                setDialogueEnded,
                parsePerformer,
                parseResponses,
                addMessagesFromSolidDataset,
                addMessagesFromUrl,
            }}
        >
            {children}
        </DialogueContext.Provider>
    );
};
