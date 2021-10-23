import React, { useEffect, useState } from "react";
import { Text, Button, Center, Container } from "@chakra-ui/react";

import { WindupChildren, Pause } from "windups";
import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE, INTUITION_COLOUR } from "../../lib/constants";
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";
import RelationshipIndicator from "../../lib/relationshipIndicator";
import {World, GovernanceStates, ReligiousIdeals} from "../../../context/bigCityContext";
import useBigCity from "../../../hooks/useBigCity";
import { performers, PerformerNames, IPerformer } from "../../lib/performers";
import { Relationships, SelfIdentityLabels } from "../../lib/relationships";

function HolyBuildingDialogue({followLink} : IStoryFrame) : React.ReactElement {

    const { addMessage, dialogueEnded, setDialogueEnded } = useDialogue();
    const { world, setWorldItem } = useBigCity();
    const { playerPerformer, hasRelationshipPair, addRelationship, removeRelationship } = usePlayer();
    const [ dialogueStarted, setDialogueStarted ] = useState(false);

    // a method which returns different description of God depending on the Governance system in place
    const characteriseGod = () => {
        switch(world[World.GOVERNANCE]) {
            case GovernanceStates.AGORA:
                return (
                    <>
                    <p>"We are united by the Force that made us, the divine being which gave us life"</p>
                    <p>"We must have a deep respect for the life we share in common, we are siblings born of one Mother"</p>
                    </>
                );
            case GovernanceStates.MILITARY_CONSULATE:
            case GovernanceStates.MONARCHY:
                return (
                    <>
                    <p>"We are united by our shared reverance to our Lord"</p>
                    <p>"As a sculptor brings new form to clay, He made us, as an Architect it is His Will which directs us"</p>
                    <p>"His realm is the Spiritual Realm which he rules over, just as {world[World.GOVERNANCE] == GovernanceStates.MILITARY_CONSULATE ? "your Consuls" : "our wise Monarch"} rule over the temporal realm, and this is according to his Will"</p>
                    </>
                );
            case GovernanceStates.MOB_RULE:
            case GovernanceStates.REPRESENTATIVE_DEMOCRACY:
                return (
                    <>
                    <p>"We are united by our shared reverance to our Creator"</p>
                    <p>"Like a Great Architect He built this world, and like a loving father He gave us free will"</p>
                    <p>"Let our collective will - the Will of the People - guide us to His green pastures and let us bask in the glory of His Light"</p>
                    </>
                );
        }
    }

    // making the choice - What unifies our citizenship, what makes our city great?
    const introducePlayer = () => {
        addMessage({
            content: <p>"You there! Yes you, come closer"</p>,
            performer: performers[PerformerNames.FRANCIS],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>He steps down from the box, and reaches into a large sack next to him, pulling out another, identical box. This he places beside his.</p>
                <p>"Take a stand on this" he beckons. "Now everyone, I want you to listen to what this person has to say. What is your name?"</p>
                </>
            ),
            performer: performers[PerformerNames.FRANCIS],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"{playerPerformer.name}..."</p>,
            performer: playerPerformer
        });

        addMessage({
            content: <p>"We, the confused, the forgotten, are gathered here today because we look for <b>answers</b>!<Pause ms={SHORT_PAUSE * 0.75} /> And by gosh {playerPerformer.name}, I think you have them."</p>,
            performer: performers[PerformerNames.FRANCIS],
            includeContinuePrompt: true
        });

        // Francis asks what it is that unites everyone as citizens, who we are in common
        // Heroic stance of socially and environmentally involved body politic
        // Self-creation
        // What is God?
        // Who am I?

        let greatestGoodChoices: IMessage[] = [
            {
                content: characteriseGod(),
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    setWorldItem(World.RELIGION, ReligiousIdeals.DEITY);
                },
                shorthandContent: <p>"Our reverance to our Creator"</p>
            },
            {
                content: (
                    <>
                    <p>"Our relationship to ourselves, our relationship to eachother!"</p>
                    <p>"We do not live <em>in</em> a Polis, we are the Polis!"</p>
                    <p>"We do not live <em>in</em> the natural world, we are the natural world, and our relationships can reflect that!"</p>
                    </>
                ),
                selectFollowup: () => {
                    setWorldItem(World.RELIGION, ReligiousIdeals.SPIRITUAL_MONISM);
                },
                performer: playerPerformer,
                shorthandContent: <p>"Our embededness within nature"</p>
            },
            {
                content: (
                    <>
                    </>
                ),
                selectFollowup: () => {
                    setWorldItem(World.RELIGION, ReligiousIdeals.POLIS);
                },
                performer: playerPerformer,
                shorthandContent: <p>[Not Implemented] "The traditions and arts of our city"</p>
            },
            {
                content: (
                    <>
                    </>
                ),
                selectFollowup: () => {
                    setWorldItem(World.RELIGION, ReligiousIdeals.UBERMENSCH);
                },
                performer: playerPerformer,
                shorthandContent: <p>[Not Implemented] "The perfectly sculpted individual - the ideal citizen"</p>
            }
        ]

        if(world[World.GOVERNANCE] == GovernanceStates.MILITARY_CONSULATE) {
            greatestGoodChoices.push({
                content: (
                    <>
                    </>
                ),
                performer: playerPerformer,
                shorthandContent: <p>[Not Implemented] "There is no greater good than the state, the {GovernanceStates.MILITARY_CONSULATE}"</p>
            });
        }
        else if(world[World.GOVERNANCE] == GovernanceStates.MONARCHY) {
            greatestGoodChoices.push({
                content: (
                    <>
                    </>
                ),
                performer: playerPerformer,
                shorthandContent: <p>[Not Implemented] "There is no greater good than the head of state, our Monarch"</p>
            });
        }

        addMessage({
            content: <p>"We wish to know <b>who we are</b>, what is it that unites us, as citizens of {world.name}?"</p>,
            performer: performers[PerformerNames.FRANCIS]
        });

        addMessage({
            content: <p>The small crowd are looking up at you, waiting eagerly for your answer.</p>,
            performer: performers[PerformerNames.AXEL],
            getResponses: () => { return greatestGoodChoices; }
        })
    }

    useEffect(() => {
        introducePlayer();
    }, []);

    let content = null;

    const introText = (
        <>
        <p>This incredible stone goliath sits atop a hill. <Pause ms={SHORT_PAUSE} />From the bottom the steepness of the hill only makes its towering stature and its fanstastical spires all the more impressive.</p>
        <Pause ms={LONG_PAUSE} />
        <p>It takes a long while to reach the foot of the building, where the stone stairway approaching its massive oak doors are framed by ancient statues of famous men.</p>
        <Pause ms={SHORT_PAUSE} />
        <Text color={INTUITION_COLOUR}>The hedges have all been cropped into cubes.</Text>
        <Pause ms={SHORT_PAUSE} />
        <p>There is a small crowd gathered around a preacher, who is stood on a wooden box.</p>
        <p>He notices you as you approach.</p>
        </>
    );
    //const introText = null;

    if(!dialogueStarted) content = (
        <>
        {introText}
        <Center marginTop={10}>
            <Button onClick={() => setDialogueStarted(true)}>Continue</Button>
        </Center>
        </>
    );

    else content = (
        <Dialogue>
        </Dialogue>
    );

    return (
        <Container>
            <WindupChildren>
                { content }
            </WindupChildren>
        </Container>
    );
}

export default function HolyBuilding({followLink} : IStoryFrame) : React.ReactElement {
    return (
        <DialogueProvider>
            <HolyBuildingDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}
