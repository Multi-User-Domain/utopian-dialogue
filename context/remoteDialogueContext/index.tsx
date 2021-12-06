

// The design is going to change so that when I connect to a world, it loads in the story content, and then
// it adds the messages

// then the display of the messages is handled by the DialogueContext, which does not do any content loading

import React, { createContext, ReactElement } from "react";
import axios from 'axios';

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
import {RDF, FOAF} from "@inrupt/lit-generated-vocab-common";
import { MUD_DIALOGUE } from "@multi-user-domain/mud-lib";

import { IPerformer } from "../../components/lib/performers";
import { IMessage } from "../dialogueContext";
import useDialogue from "../../hooks/useDialogue";
import usePlayer from "../../hooks/usePlayer";

export interface IRemoteDialogueContext {
    addMessagesFromSolidDataset?: (dataset: SolidDataset) => void;
    children?: any;
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

export const RemoteDialogueContext = createContext<IRemoteDialogueContext>({});

export const RemoteDialogueProvider = ({
    children
}: IRemoteDialogueContext): ReactElement => {

    const { addMessages } = useDialogue();
    const { playerPerformer } = usePlayer();

    const getRemoteContent: (messageUrl: string) => Promise<React.ReactElement> = (messageUrl) => {
        return new Promise<React.ReactElement>((resolve, reject) => {
            axios.get(messageUrl).then(res => { return resolve(<>{res.data}</>) });
        });
    }

    // we want to read each message in from a storyline

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
                let messageThings = getFilteredThings(dataset, MUD_DIALOGUE.Message);

                resloveMessageThings(messageThings, performer).then((messages) => {return resolve(messages)});
            });

        });
    }

    const resourceFollowup = (urlFollowup) => {
        if(!urlFollowup) return;
        addMessagesFromUrl(urlFollowup);
    }

    /**
     * reads a message Thing which may have distant links, resolves these to create a finished IMessage
     * @param performer if the performer is known in advance, it can be passed as a parameter
     */
    const parseMessage: (mt: Thing, performer?: IPerformer) => Promise<IMessage> = (mt, performer=undefined) => {

        // resolve all of the links which exist on the dataset which we have to hand
        const followup = getUrl(mt, MUD_DIALOGUE.selectFollowup);

        let remoteMsg: IMessage = {
            content: getUrl(mt, MUD_DIALOGUE.content) ? null : <Text>{getStringNoLocale(mt, MUD_DIALOGUE.content)}</Text>,
            performer: performer,
            includeContinuePrompt: getBoolean(mt, MUD_DIALOGUE.includeContinuePrompt),
            selectFollowup: followup ? () => resourceFollowup(followup) : undefined
        };

        // check the URL fields, fetch them and resolve them
        return new Promise<IMessage>(async (resolve, reject) => {
            const tasks = [
                async () => {
                    let contentUrl = getUrl(mt, MUD_DIALOGUE.content);
                    if(contentUrl) remoteMsg.content = await getRemoteContent(contentUrl);
                },
                async () => {
                    let performerUrl = getUrl(mt, MUD_DIALOGUE.performer);
                    if(!performer && performerUrl) 
                        remoteMsg.performer = await parsePerformer(performerUrl);
                },
                async () => {
                    let responsesUrl = getUrl(mt, MUD_DIALOGUE.getResponses);
                    if(responsesUrl) {
                        let responses = await parseResponses(responsesUrl, playerPerformer);
                        remoteMsg.getResponses = () => { return responses; }
                    }
                }
            ]
    
            await Promise.all(tasks.map(async (task) => await task()));
            return resolve(remoteMsg);
        });
    }

    /**
     * resolves the array of message things so that all distant content has been fetched in the returned array
     * maintaining the order of the array
     */
    const resloveMessageThings: (messageThings: Thing[], performer?: IPerformer) => Promise<IMessage[]> = (messageThings, performer=undefined) => {

        return new Promise<IMessage[]>(async (resolve, reject) => {
            const tasks = messageThings.map((mt) => parseMessage(mt, performer));

            return resolve(await Promise.all(tasks));
        });
    }

    const addMessagesFromSolidDataset = (dataset) => {
        const messageThings: Thing[] = getFilteredThings(dataset, MUD_DIALOGUE.Message);

        resloveMessageThings(messageThings).then((messages) => {
            addMessages(...messages);
        });
    }

    const addMessagesFromUrl = (url) => {
        return new Promise<void>((resolve, reject) => {
            getSolidDataset(url).then((dataset) => resolve(addMessagesFromSolidDataset(dataset)));
        });
    }

    return(
        <RemoteDialogueContext.Provider
            value={{
                addMessagesFromSolidDataset
            }}
        >
            {children}
        </RemoteDialogueContext.Provider>
    );
};
