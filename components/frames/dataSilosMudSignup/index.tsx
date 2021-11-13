import React, { useEffect } from "react";
import { Container, Text, Center, Button } from "@chakra-ui/react";

import {
    createSolidDataset,
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
import {RDF, VCARD, FOAF} from "@inrupt/lit-generated-vocab-common";

import { useMudAccount } from "../../../hooks/useMudAccount";

import { WindupChildren, Pause, Pace, Effect } from "windups";
import { IStoryFrame } from "../../lib/types";

import { 
  LoginForm
} from "../../lib/loginForm";
import useDialogue from "../../../hooks/useDialogue";
import Dialogue from "../../lib/dialogue";
import { DialogueProvider } from "../../../context/dialogueContext";

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

    useEffect(() => {
        const messageThings = getFilteredThings(dataset, "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/muddialogue.ttl#Message");
    
        messageThings.forEach((mt) => {
            const performerUrl = getUrl(mt, "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/muddialogue.ttl#performer");
            
            getSolidDataset(performerUrl).then((performerDataset) => {
                const performerThing = getThing(performerDataset, performerUrl);

                addMessage({
                    content: <p>{getStringNoLocale(mt, "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/muddialogue.ttl#content")}</p>,
                    performer: {
                        name: getStringNoLocale(performerThing, FOAF.name),
                        imgSrc: getUrl(performerThing, FOAF.depiction)
                    },
                    includeContinuePrompt: getBoolean(mt, "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/muddialogue.ttl#includeContinuePrompt")
                });
            });
        });
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
        <p>Hello, {webId}! ({session.info.webId} - {session.info.isLoggedIn.toString()})</p>
        <DatasetProvider datasetUrl="https://calum.inrupt.net/public/utopian-dialogue/guillame_intro.ttl">
            <DemoDialogue followLink={followLink} />
        </DatasetProvider>
        </>
    );
}

export default function DataSilosMudSignup({followLink} : IStoryFrame) : React.ReactElement {
    return <DialogueProvider><MisDirection followLink={followLink} /></DialogueProvider>;
}
