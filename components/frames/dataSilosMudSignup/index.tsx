import React, { useEffect } from "react";
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

import { useMudAccount } from "../../../hooks/useMudAccount";

import { WindupChildren, Pause, Pace, Effect } from "windups";
import { IStoryFrame } from "../../lib/types";

import { 
  LoginForm
} from "../../lib/loginForm";
import useDialogue from "../../../hooks/useDialogue";
import Dialogue from "../../lib/dialogue";
import { DialogueProvider, IMessage } from "../../../context/dialogueContext";
import usePlayer from "../../../hooks/usePlayer";
import { IPerformer } from "../../lib/performers";

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

export function DemoDialogue({followLink}: IStoryFrame) : React.ReactElement {
    const { dataset } = useDataset();
    const { addMessage } = useDialogue();
    const { playerPerformer } = usePlayer();

    const parsePerformer = (mt: Thing) => {
        const performerUrl = getUrl(mt, MUD_DIALOGUE.performer);

        return new Promise<Thing>((resolve, reject) => {
            getSolidDataset(performerUrl).then((performerDataset) => {
                return resolve(getThing(performerDataset, performerUrl));
            });
        });
    }

    const resourceFollowup = (urlFollowup) => {
        if(!urlFollowup) return;
        parseMessagesFromUrl(urlFollowup);
    }

    const parseBasicMessagePerformerUnknown: (mt: Thing, perfomerThing: Thing) => IMessage = (mt, performerThing) => {
        
        const followup = getUrl(mt, MUD_DIALOGUE.selectFollowup);

        return {
            content: <Text>{getStringNoLocale(mt, MUD_DIALOGUE.content)}</Text>,
            contentUrl: getUrl(mt, MUD_DIALOGUE.content),
            performer: {
                name: getStringNoLocale(performerThing, FOAF.name),
                imgSrc: getUrl(performerThing, FOAF.depiction)
            },
            includeContinuePrompt: getBoolean(mt, MUD_DIALOGUE.includeContinuePrompt),
            selectFollowup: followup ? () => resourceFollowup(followup) : undefined
        };
    }
    const parseBasicMessagePerformerKnown: (mt: Thing, performer: IPerformer) => IMessage = (mt, performer) => {

        const followup = getUrl(mt, MUD_DIALOGUE.selectFollowup);

        return {
            content: <Text>{getStringNoLocale(mt, MUD_DIALOGUE.content)}</Text>,
            contentUrl: getUrl(mt, MUD_DIALOGUE.content),
            performer: performer,
            includeContinuePrompt: getBoolean(mt, MUD_DIALOGUE.includeContinuePrompt),
            selectFollowup: followup ? () => resourceFollowup(followup) : undefined
        };
    }

    const parseMessagesFromDataset = (dataset) => {
        const messageThings = getFilteredThings(dataset, MUD_DIALOGUE.Message);
    
        messageThings.forEach(async (mt) => {
            // parse each message from the data source
            let performer = await parsePerformer(mt);

            // read the message itself
            let message = parseBasicMessagePerformerUnknown(mt, performer);

            // may need to read responses from a specific URL, and fetch those, too
            const responsesUrl = getUrl(mt, MUD_DIALOGUE.getResponses);

            if(responsesUrl) {
                getSolidDataset(responsesUrl).then((responses) => {
                    message.getResponses = () => {
                        return getFilteredThings(responses, MUD_DIALOGUE.Message).map(response => parseBasicMessagePerformerKnown(response, playerPerformer));
                    }

                    addMessage(message);
                });
            }
            else return addMessage(message);
        });
    }

    const parseMessagesFromUrl = (url) => {
        return new Promise<void>((resolve, reject) => {
            getSolidDataset(url).then((dataset) => resolve(parseMessagesFromDataset(dataset)));
        });
    }

    useEffect(() => {
        parseMessagesFromDataset(dataset);
    }, [dataset]);

    return (
        <Dialogue>

        </Dialogue>
    );
}

export function MisDirection({followLink}: IStoryFrame) : React.ReactElement {
    const { session } = useSession();
    const { webId } = useMudAccount();

    if (!session.info.isLoggedIn) {
        return <LoginForm />;
    }

    return (
        <>
        <DatasetProvider datasetUrl="https://calum.inrupt.net/public/utopian-dialogue/guillame_intro.ttl">
            <DemoDialogue followLink={followLink} />
        </DatasetProvider>
        </>
    );
}

export default function DataSilosMudSignup({followLink} : IStoryFrame) : React.ReactElement {
    return <DialogueProvider><MisDirection followLink={followLink} /></DialogueProvider>;
}
