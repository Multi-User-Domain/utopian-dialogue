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
import DialogueMessage from "../../lib/dialogueMessage";

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
                <Pause ms={SHORT_PAUSE * 0.75} />
                <p>"That sounds like a real honour" the young lady responds.</p>
                <Text color="#9246d9">She is grinning widely as she says it.</Text>
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
                <p>"Good people, what do we need a false mayor for? We are organising fine on our own!"</p>
                <p>A number of cheers go up.</p>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <Text color="#9246d9">Others seem unsure.</Text>
                <p>The crowd is mumbling.</p>
                <p>Now is your chance to speak.</p>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc,
            getResponses: () => {
                return [
                    {
                        msgId: "kingmaker",
                        content: (
                            <>
                            <p>You fill your lungs with air and stand straight.</p>
                            <Text color="#9246d9">You are projecting such a lionesque dominance that everyone is watching you, silent.</Text>
                            <Pause ms={LONG_PAUSE} />
                            <p>"My liege, forgive me to be telling you this but you mistake yourself"</p>
                            <p>"Look at the uniform of these men" making eye contact with each citizen in the crowd in turn.</p>
                            <p>"This is not the uniform worthy of a mayor's troop, NAE!"</p>
                            <Pause ms={SHORT_PAUSE} />
                            </>
                        ),
                        selectFollowup: () => {
                            addMessage({
                                content: <p>The burly man makes a motion to interrupt you but he is silenced by his boss.</p>,
                                name: bg.name,
                                imgSrc: bg.imgSrc,
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"This man... was KING!"</p>
                                    <Pause ms={SHORT_PAUSE * 1.25} />
                                    <p>There is a collective gasp.</p>
                                    <Pace ms={SLOW_PACE}>
                                        <Text color="#9246d9"><em>They're buying it!</em></Text>
                                    </Pace>
                                    <Text color="#FCF55F">It must be the sensational <em>authority</em> that you're projecting.</Text>
                                    <p>The crowd turns in favour, and the dubious claim of Mayor Rupert becomes the <em>truth</em> of King Rupert.</p>
                                    <RelationshipIndicator color="#3cb371"><p>Rupert is now King!</p></RelationshipIndicator>
                                    </>
                                ),
                                name: name,
                                imgSrc: image,
                                sideEffect: () => {
                                    addIncomingRelationship('rupert', ['extreme gratitude']);
                                    addOutgoingRelationship('rupert', ['king']);
                                }
                            });

                            addMessage({
                                content: <RelationshipIndicator color="#ff5dcb"><p>King Rupert eyes have started to sparkle whenever he looks at you.</p></RelationshipIndicator>,
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>Mari's face is a picture of her lost utopia.</p>
                                    <p>"But..."</p>
                                    <p>The cheers of the crowd drown her out</p>
                                    </>
                                ),
                                name: mari.name,
                                imgSrc: mari.imgSrc
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"Long live the King!"</p>
                                    <p>"Long live the King!"</p>
                                    <p>"Long live the King!"</p>
                                    <p>"Long live the King!"</p>
                                    </>
                                ),
                                name: null,
                                imgSrc: "../../../public/img/anonymous_citizen.webp"
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>The King and his men are gazing at you in stupified admiration.</p>
                                    <p>"You did good out there, old sport!"</p>
                                    <p>"Your ambition is remarkable"</p>
                                    </>
                                ),
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"Your stature, Olympian!"</p>,
                                name: bg.name,
                                imgSrc: bg.imgSrc
                            });

                            addMessage({
                                content: <p>"Your words, honey!"</p>,
                                name: null,
                                imgSrc: "../../../public/img/guard2.webp",
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"Anytime you need <b>Anything</b>, you will know where to find me"</p>,
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"Where's that, boss"</p>,
                                name: bg.name,
                                imgSrc: bg.imgSrc,
                                includeContinuePrompt: true
                            });
                            
                            addMessage({
                                content: (
                                    <>
                                    <p>"Burly, what have we discussed about speaking before you're spoken to?"</p>
                                    <p>"And it's <em>Your Grace</em>, now."</p>
                                    <p>He stands straighter as he says it. He likes the sound of it, <em>Your Grace</em>.</p>
                                    <Pause ms={SHORT_PAUSE} />
                                    <p>"You can find me at the <b>Palace</b>" he says with a wink.</p>
                                    </>
                                ),
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                includeContinuePrompt: true
                            });
                        },
                        shorthandContent: <Text>"Mayor?! No, this man was no mayor... he was our <b>King!</b>"</Text>,
                        name: name,
                        imgSrc: image
                    },
                    {
                        msgId: "communism",
                        content: (
                            <>
                            <p>"This man <b>is</b> an impostor! Worse still he is a leech!"</p>
                            <p>"We can organise just fine without him!"</p>
                            <Pause ms={SHORT_PAUSE * 1.25} />
                            <p>"All power to the Working Class!"</p>
                            </>
                        ),
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>Just a few at first, then the crowd, chant in unison:</p>
                                    <p>"Long live the Polis!"</p>
                                    <p>"Long live the Polis!"</p>
                                    </>
                                ),
                                name: null,
                                imgSrc: "../../../public/img/anonymous_citizen.webp"
                            });
                            
                            addMessage({
                                content: <p>"Long live the Polis!</p>,
                                name: null,
                                imgSrc: "../../../public/img/anonymous_citizen2.webp"
                            })

                            addMessage({
                                content: <p>"Long live the Polis!"</p>,
                                name: mari.name,
                                imgSrc: mari.imgSrc,
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>The would-be mayor looks around nervously.</p>
                                    <p>Indignant fury crosses his face.</p>
                                    <p>"You <b><em>need</em></b> me"</p>
                                    <p>The crowd does not hear him through the chanting.</p>
                                    <Pause ms={LONG_PAUSE * 1.5} />
                                    <p>His protests become increasingly desparate.</p>
                                    <p>He throws a sharp look to the his lead guard.</p>
                                    <p>"Burly. <Pace ms={SLOW_PACE * 1.5}><em>Do something</em></Pace>"</p>
                                    </>
                                ),
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"Get 'em men!"</p>
                                    <p>He lifts a proud fist into the air to accompany the command.</p>
                                    <Pause ms={LONG_PAUSE} />
                                    <p>Nothing happens.</p>
                                    <Pause ms={SHORT_PAUSE} />
                                    <p>Burly looks about him, most of his men have gone.</p>
                                    <p>Those who remain are chanting with the others.</p>
                                    </>
                                ),
                                name: bg.name,
                                imgSrc: bg.imgSrc
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"Long live the Polis!"</p>
                                    </>
                                ),
                                name: null,
                                imgSrc: "../../../public/img/guard2.webp",
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>Burly and the would-be mayor beat a slow retreat from the crowd.</p>,
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                getResponses: () => {
                                    return [
                                        {
                                            content: (
                                                <>
                                                <p>"Yeah you better run! And your outfits are terrible!"</p>
                                                <Pause ms={SHORT_PAUSE * 1.25} />
                                                <Text color="#9246d9">You can hear the wound from here.</Text>
                                                </>
                                            ),
                                            shorthandContent: <Text>Mock them as they leave</Text>,
                                            name: name,
                                            imgSrc: image,
                                            selectFollowup: () => {},
                                            includeContinuePrompt: true
                                        },
                                        null
                                    ]
                                }
                            });
                        },
                        shorthandContent: <Text>Side with Mari</Text>,
                        name: name,
                        imgSrc: image
                    }
                ]
            }
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