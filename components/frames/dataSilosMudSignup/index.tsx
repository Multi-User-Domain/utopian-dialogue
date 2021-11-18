import React, { useEffect } from "react";
import { useSession, DatasetProvider, useDataset } from "@inrupt/solid-ui-react";

import { WindupChildren, Pause, Pace, Effect } from "windups";
import { IStoryFrame } from "../../lib/types";

import { 
  LoginForm
} from "../../lib/loginForm";
import useDialogue from "../../../hooks/useDialogue";
import Dialogue from "../../lib/dialogue";
import { DialogueProvider } from "../../../context/dialogueContext";

export function DemoDialogue({followLink}: IStoryFrame) : React.ReactElement {
    const { dataset } = useDataset();
    const { addMessagesFromSolidDataset } = useDialogue();

    useEffect(() => {
        addMessagesFromSolidDataset(dataset);
    }, [dataset]);

    return (
        <Dialogue>

        </Dialogue>
    );
}

export function MisDirection({followLink}: IStoryFrame) : React.ReactElement {
    const { session } = useSession();

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
