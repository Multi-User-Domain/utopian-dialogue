import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";

import { WindupChildren, Pause, Pace, Effect } from "windups";
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

function DeathDialogue({followLink} : IStoryFrame) : React.ReactElement {

    const { addMessage, dialogueEnded, setDialogueEnded } = useDialogue();
    const { world, setWorldItem } = useBigCity();
    const { playerPerformer, hasRelationshipPair, addRelationship, removeRelationship } = usePlayer();

    // why do I suffer?
    const sufferingResponses = (actorQuestions: IPerformer, witness: IPerformer) => {
        return [];
    }
    const sufferingDialogue = (actorQuestions: IPerformer, witness: IPerformer) => {
        addMessage({
            content: (
                <>
                <p>A man whom you had not noticed approaches from the back.</p>
                <p>It is plain to see that he is suffering a great emotional pain.</p>
                </>
            ),
            performer: performers[PerformerNames.TYLER],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Ever since I woke from the Big Pop I've felt something inside is deeply <em>wrong</em>" he says shyly.</p>
                <p>"I don't understand where this pain comes from"<Pause ms={SHORT_PAUSE} /></p>
                <p>"If I knew why I felt this way, perhaps it would go away. I want for nothing more than it to go away"</p>
                </>
            ),
            performer: performers[PerformerNames.TYLER],
            getResponses: () => sufferingResponses(actorQuestions, witness)
        });
    }

    // why do I die?
    const deathResponses = (atHolyBuilding: boolean, witness: IPerformer, includeExtraOption: boolean=true) => {
        const actorQuestions = atHolyBuilding ? performers[PerformerNames.FRANCIS] : performers[PerformerNames.ZOE];
        const deityContent = world[World.RELIGION] == ReligiousIdeals.DEITY ? "Our Creator would not create us in order to simply cast us aside." : "";

        let responses: IMessage[] = [
            {
                content: (
                    <>
                    <p>"If all things were complete and unchanging, there would be no death, but there would be no life either"</p>
                    <p>"Without death, life cannot exist"</p>
                    <p>"The unconditional acceptance of death is the way in which we can live to the fullest, to life's most exhiliarating and uninhibited state"</p>
                    <p>"It is not death which challenges us, but our fear of it"</p>
                    </>
                ),
                includeContinuePrompt: true,
                performer: playerPerformer,
                selectFollowup: () => {
                    sufferingDialogue(actorQuestions, witness);
                },
                shorthandContent: <p>"Death is a vital part of life. Without death, life would not exist"</p>
            },
            {
                content: (
                    <>
                    <p>"Death is a fact of life, we can see this"<Pause ms={SHORT_PAUSE} /></p>
                    <p>"But frankly, {witness.name}, any attempt that we make to explain it is just misdirection - an attempt to avoid this simple truth"</p>
                    <p>"Everything that we <em>know</em> indicates that after we die we are gone, that death will come for us all and there is no soothing rationalisation that can protect us from this fact"</p>
                    </>
                ),
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"And therefore, I suppose, there is no purpose to living" {actorQuestions.name} adds thoughtfully.</p>,
                        performer: actorQuestions,
                        includeContinuePrompt: true
                    })

                    addMessage({
                        content: (
                            <>
                            <p>{witness.name} appears ill at ease with these statements.<Pause ms={SHORT_PAUSE} /></p>
                            <p>"But if there is no purpose to life, then surely there is no reason to live?"</p>
                            </>
                        ),
                        performer: witness,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <Pause ms={SHORT_PAUSE} />
                            <p>"It may seem that way at first but...</p><Pause ms={SHORT_PAUSE * 1.1} />
                            <p>"Surely there is no reason to stop living, either? It is only when we have not yet accepted Nihilism that we feel it a great burden"</p>
                            </>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });
                    sufferingDialogue(actorQuestions, witness);
                },
                shorthandContent: <p>"There is no purpose or meaning in death, it's just something that will happen to us"</p>
            },
            {
                content: (
                    <>
                    </>
                ),
                performer: playerPerformer,
                selectFollowup: () => {

                },
                shorthandContent: <p>"[Not Implemented] It is possible to overcome death, and through salvation to achieve eternal life"</p>
            }
        ];

        // TODO: remove this??
        if(includeExtraOption) {
            responses.push({
                content: <p>"Something must come after Death, there must be something eternal within us. {deityContent}"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: (
                            <>
                            </>
                        ),
                        performer: actorQuestions,
                        getResponses: () => deathResponses(atHolyBuilding, witness, false)
                    });
                },
                shorthandContent: <p>"[Not Fully Implemented] Something must come after Death, there must be something eternal within us"</p>
            });
        }

        return responses;
    }

    // this introduction will be played if this dialogue is being initiated after the death of Mari
    const discussMariDeath = () => {
        addMessage({
            content: (
                <>
                <p>There are a number of dead, on either side of the conflict.</p>
                <p>It was a traumatic event. After discussion passes through some sharing of this trauma and the practicalities of what to do with the bodies, it becomes more philosophical about what death is.</p>
                <p>Since the Great Pop passed you are all rediscovering that you are mortal.</p>
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"What is death? Why do we have to die?"</p>,
            performer: performers[PerformerNames.ALICIA],
            getResponses: () => deathResponses(false, performers[PerformerNames.ALICIA])
        });
    }

    // an alternative introduction will be played if the dialogue has been initiated at the Holy Building
    const discussWitnessedDeath = () => {
        const witness = hasRelationshipPair(PerformerNames.ALICIA, Relationships.IMPRISONED) ? performers[PerformerNames.GUILLAME] : performers[PerformerNames.ALICIA];

        addMessage({
            content: <p>"On South Street by the River, earlier today, we saw a man die. One moment he was, and the next moment he was not. It all happened so quickly"</p>,
            performer: witness,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"The man wasn't old, and it came from nowhere. None of us knew what to do. It took us some time to figure out even what it was that had happened. That at some moment this could happen, will happen, to all of us"</p>,
            performer: witness,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"I don't understand it. Why do we have to die?"</p>,
            performer: witness,
            getResponses: () => deathResponses(true, witness)
        })
    }

    useEffect(() => {
        if(hasRelationshipPair(PerformerNames.MARI, Relationships.DEAD)) discussMariDeath();
        else discussWitnessedDeath();
    }, []);

    return (
        <Container>
            <WindupChildren>
                <Dialogue>

                </Dialogue>
            </WindupChildren>
        </Container>
    );
}

export default function Death({followLink} : IStoryFrame) : React.ReactElement {
    return (
        <DialogueProvider>
            <DeathDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}
