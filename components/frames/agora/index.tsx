import React, { useEffect } from "react";
import {
    Text
} from "@chakra-ui/react";

import { WindupChildren, Pause, Effect, Pace } from "windups";
import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE } from "../../lib/constants";
import { IDialogueParticipant, IMessage, DialogueProvider } from "../../../context/dialogueContext";
import RelationshipIndicator from "../../lib/relationshipIndicator";

function initMayorRupert() : IDialogueParticipant {
    let mayor: IDialogueParticipant = {
        name: "Mayor Rupert",
        imgSrc: "../../../public/img/mayor_rupert.png",
        isHuman: false,
        indexStart: 0,
        mood: "",
        currentGoal: "Enforce Power",
        speak: null
    }

    mayor.speak = (lastMsg: IMessage) => {
        return {
            content: null,
            name: mayor.name,
            imgSrc: mayor.imgSrc
        };
    }

    return mayor;
}

function initBodyGuard() : IDialogueParticipant {
    let bg: IDialogueParticipant = {
        name: "Burly Bodyguard",
        imgSrc: "../../../public/img/bodyguard.webp",
        isHuman: false,
        indexStart: 0,
        mood: "",
        currentGoal: "Shout a bit and let off some steam",
        speak: null
    }

    bg.speak = (lastMsg: IMessage) => {
        return null;
    }

    return bg;
}

function initMari() : IDialogueParticipant {
    let mari: IDialogueParticipant = {
        name: "Mari",
        imgSrc: "../../../public/img/mari.webp",
        isHuman: false,
        indexStart: 0,
        mood: "",
        currentGoal: "Establish an agora",
        speak: null
    }

    mari.speak = (lastMsg: IMessage) => {
        return null;
    }

    return mari;
}

function AgoraDialogue() : React.ReactElement {

    const { addParticipant, addMessage } = useDialogue();
    const { name, image, addOutgoingRelationship, addIncomingRelationship } = usePlayer();

    const introduceMayorRupert = (mayorRupert) => {
        return {
            content: (
                <>
                <p>"What is the meaning of this?!"</p>
                <p>He calls out to the audience, his arms waving theatrically:</p>
                <p>"Good citizens of <b>Rupertston</b>, I am your regent!"</p>
                <p>"I understand that The Great Pop seems to have affected our memories of that but I am your mayor!"</p>
                <Pause ms={SHORT_PAUSE * 1.25} />
                <p>"And of course I have all of the necessary <Pause ms={SHORT_PAUSE*0.25}/><em>*ahem*</em> records to prove it"</p>
                </>
            ),
            name: mayorRupert.name,
            imgSrc: mayorRupert.imgSrc,
            includeContinuePrompt: true
        }
    }

    const introduceBodyguard = (bg) => {
        return {
            content: (
                <>
                <p>"Yeah! Your gathering here is illegal!" Says the tallest of the guardsmen, in a fiercely bright orange and white blouse.</p>
                </>
            ),
            name: bg.name,
            imgSrc: bg.imgSrc,
            includeContinuePrompt: true
        }
    }

    const introduceMari = (mari) => {
        return {
            content: (
                <>
                <p>"Who are you?"</p>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc
        }
    }

    useEffect(() => {
        let mayorRupert = initMayorRupert();
        addParticipant(mayorRupert);
        addMessage(introduceMayorRupert(mayorRupert));

        let bg = initBodyGuard();
        addParticipant(bg);
        addMessage(introduceBodyguard(bg));

        let mari = initMari();
        addParticipant(mari);
        addMessage(introduceMari(mari));

        addMessage({
            content: (
                <>
                <p>He is taken aback by the question, a little stung.</p>
                <Text color="#9246d9">He feels as though his relevance has been brought into question.</Text>
                <Pause ms={SHORT_PAUSE * 1.33} />
                <p>"I- I- the Burly Bodyguard"</p>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <p>He gathers himself and stands up taller.</p>
                <p>"I'm Mayor Rupert's lead bodyguard"</p>
                </>
            ),
            name: bg.name,
            imgSrc: bg.imgSrc,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Oh, well"</p>
                <p>"That sounds like a real honour" the young lady responds.</p>
                <p>She is grinning widely as she says it.</p>
                <Text color="#9246d9">She does not really think it's an honour.</Text>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"It is an honour" the burly bodyguard responds bitterly.</p>
                <p>His face folds, his frown deepening grotesquely.</p>
                <p>He folds his arms protectively.</p>
                </>
            ),
            name: bg.name,
            imgSrc: bg.imgSrc,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>Mari stands up onto the platform in the centre of the arena and calls out to the crowd.</p>
                <p>"Good people, what do we need this falsehood mayor for? We are organising fine on our own!"</p>
                <p>A number of cheers go up.</p>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <Text color="#9246d9">Others seem unsure.</Text>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc,
            includeContinuePrompt: true
        });
    }, []);

    return (
        <WindupChildren>
            <p>A man dressed in fine clothing approaches, his face is red and puffy with sweat.</p>
            <p>He is accompanied by five other men, dressed in bright uniform.</p>

            <Dialogue>

            </Dialogue>
        </WindupChildren>
    );
}

export default function Agora({followLink} : IStoryFrame): React.ReactElement {

    return (
        <DialogueProvider>
            <AgoraDialogue />
        </DialogueProvider>
    );
}