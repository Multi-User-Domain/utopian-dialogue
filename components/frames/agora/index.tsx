import React, { useEffect, useState } from "react";
import {
    Text,
    Button,
    Center
} from "@chakra-ui/react";

import { WindupChildren, Pause, Pace } from "windups";
import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE } from "../../lib/constants";
import { IDialogueParticipant, IMessage, DialogueProvider } from "../../../context/dialogueContext";
import RelationshipIndicator from "../../lib/relationshipIndicator";
import {World} from "../../../context/bigCityContext";
import useBigCity from "../../../hooks/useBigCity";

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
        return null;
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

    const { addParticipant, addMessage, dialogueEnded, setDialogueEnded } = useDialogue();
    const { setWorldItem } = useBigCity();
    const { name, image, addOutgoingRelationship, addIncomingRelationship } = usePlayer();
    const [ dialogueStarted, setDialogueStarted ] = useState(false);

    const introduceMayorRupert = (mayorRupert) => {
        addMessage({
            content: (
                <>
                <p>A man dressed in fine clothing approaches, his face is red and puffy with sweat.</p>
                <p>He is leading a procession of five other men, dressed in bright uniform.</p>
                <Pause ms={LONG_PAUSE} />
                <p>"And just <Pause ms={SHORT_PAUSE *0.25}/><b>what</b> is the meaning of all this <em>nonsense</em>?!"</p>
                </>
            ),
            name: mayorRupert.name,
            imgSrc: mayorRupert.imgSrc,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>He calls out to the audience, his arms waving theatrically:</p>
                <p>"Good citizens of <b>Rupertston</b>, I am your leader!"</p>
                <Pause ms={SHORT_PAUSE * 0.75} />
                <p>"I understand that The Great Pop seems to have affected our memories but nevertheless!<Pause ms={SHORT_PAUSE * 0.25} /> <em>I am your mayor!</em>"</p>
                <Pause ms={SHORT_PAUSE * 1.25} />
                <p>"Nevertheless I have all of the necessary <Pause ms={SHORT_PAUSE*0.25}/><em>*ahem*</em> records to prove it"</p>
                </>
            ),
            name: mayorRupert.name,
            imgSrc: mayorRupert.imgSrc,
            includeContinuePrompt: true
        });
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

    // if you choose to expel Rupert and his cronies, the agora dialogue will continue
    const agoraMeeting = (mari: IDialogueParticipant) => {
        addMessage({
            content: (
                <>
                <p>"Yeeeahh!"</p>
                <Text color="#9246d9">Mari is elated as she watches the pretenders flee.</Text>
                <Pause ms={SHORT_PAUSE} />
                <p>"Long live the Polis!"</p>
                <Text color="#9246d9">Rupert is looking over his shoulder as he leaves, his face is a picture.</Text>
                <Pause ms={SHORT_PAUSE} />
                <p>"This is such an <Pause ms={SHORT_PAUSE * 0.25} /><em>exhillarating</em> feeling!"</p>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"There is no burden of power over us, no burden of tradition behind us" she says with a long <Pace ms={SLOW_PACE * 2}><em>sigh.</em></Pace></p>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <p>"We are held back only by the capabilities of our language and the limits of our abilities"</p>
                <p>"We are the masters of our own destiny"</p>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Where do we start?"</p>,
            name: null,
            imgSrc: "../../../public/img/guard2.webp"
        });

        addMessage({
            content: (
                <>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <p>"That is for us all to decide together<Pace ms={SLOW_PACE * 2}>...</Pace>"</p>
                <p>"So, how do we want to live together?"</p>
                </>
            ),
            name: mari.name,
            imgSrc: mari.imgSrc,
            getResponses: () => {
                return [
                    {
                        content: (
                            <>
                            <p>"Are we ready for this?"</p>
                            <Pause ms={SHORT_PAUSE * 0.5} />
                            <p>You gesture around you.</p>
                            <p>"We - our ancestors - surely built this city, but we don't remember <em>how</em> we did it"</p>
                            <Pause ms={SHORT_PAUSE} />
                            <p>"You said that we are masters of our own destiny. <Pause ms={SHORT_PAUSE * 0.75} /> But how can we ensure that we are not just masters of our own peril?"</p>
                            </>
                        ),
                        name: name,
                        imgSrc: image,
                        includeContinuePrompt: true,
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>"Yes!" he shouts, all in a rush.</p>
                                    <p>"These are my concerns exactly"</p>
                                    </>
                                ),
                                name: "Leopald",
                                imgSrc: "../../../public/img/leopald.webp",
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"Here, now, when all this is so fresh, <em>of course</em> we will all co-operate with eachother but<Pace ms={SLOW_PACE * 1.25}>...</Pace> a week from now? <Pause ms={SHORT_PAUSE} />A month?</p>
                                    <p>"We can learn of our history, we still have the books"</p>
                                    <Pause ms={LONG_PAUSE} />
                                    </>
                                ),
                                name: "Leopald",
                                imgSrc: "../../../public/img/leopald.webp",
                                includeContinuePrompt: true
                            });
                        },
                        shorthandContent: <Text>"I'm not sure we're ready for this"</Text>
                    },
                    {
                        content: (
                            <>
                            <p>"We are <b>so</b> ready for this."</p>
                            <p>"All power to the agora!"</p>
                            </>
                        ),
                        name: name,
                        imgSrc: image,
                        includeContinuePrompt: true,
                        selectFollowup: () => {
                            addMessage({
                                content: <RelationshipIndicator color="#ff5dcb"><p>You are developing the reputation of a revolutionary leader. People look up to you.</p></RelationshipIndicator>,
                                name: mari.name,
                                imgSrc: mari.imgSrc,
                                sideEffect: () => {
                                    addIncomingRelationship('mari', ['camaradery']);
                                    addOutgoingRelationship('self', ['revolutionary']);
                                    setWorldItem(World.GOVERNANCE, 'agora');
                                }
                            });
                        },
                        shorthandContent: <Text>"We are so ready for this! All power to our Agora!"</Text>
                    },
                    {
                        content: (
                            <>
                            <p>"We are <b>so</b> ready for this."</p>
                            </>
                        ),
                        name: name,
                        imgSrc: image,
                        includeContinuePrompt: true,
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>"Here, now, when all this is so fresh, <em>of course</em> we will all co-operate with eachother but<Pace ms={SLOW_PACE * 1.25}>...</Pace> a week from now? <Pause ms={SHORT_PAUSE} />A month?</p>
                                    <p>"We can learn of our history, we still have the books"</p>
                                    <Pause ms={LONG_PAUSE} />
                                    </>
                                ),
                                name: "Leopald",
                                imgSrc: "../../../public/img/leopald.webp",
                                includeContinuePrompt: true
                            });
                        },
                        shorthandContent: <Text>[Say Nothing]</Text>
                    }
                ];
            }
        });
    }

    useEffect(() => {
        let mayorRupert = initMayorRupert();
        addParticipant(mayorRupert);
        introduceMayorRupert(mayorRupert);

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
                                    <Pace ms={SLOW_PACE * 2}>
                                        <Text color="#9246d9"><em>They're buying it!</em></Text>
                                    </Pace>
                                    <Text color="#FFBF00">It must be the sensational <em>authority</em> that you're projecting.</Text>
                                    <p>The crowd turns in favour, and the dubious claim of Mayor Rupert becomes the <em>truth</em> of King Rupert.</p>
                                    <RelationshipIndicator color="#3cb371"><p>Big City is now an <b>Absolute Monarchy</b>.</p></RelationshipIndicator>
                                    <RelationshipIndicator color="#3cb371"><p>Rupert is now King!</p></RelationshipIndicator>
                                    </>
                                ),
                                name: name,
                                imgSrc: image,
                                sideEffect: () => {
                                    addIncomingRelationship('rupert', ['extreme gratitude']);
                                    addOutgoingRelationship('rupert', ['king']);
                                    setWorldItem(World.GOVERNANCE, 'absolute monarchy');
                                    setWorldItem(World.RULER, mayorRupert.name);
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
                                    </>
                                ),
                                name: null,
                                imgSrc: "../../../public/img/anonymous_citizen.webp"
                            });

                            addMessage({
                                content: <p>"Long live the King!"</p>,
                                name: null,
                                imgSrc: "../../../public/img/anonymous_citizen2.webp"
                            })

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
                                content: <p>"Where's that, boss?"</p>,
                                name: bg.name,
                                imgSrc: bg.imgSrc,
                                includeContinuePrompt: true
                            });
                            
                            addMessage({
                                content: (
                                    <>
                                    <p>"Burly, what have we discussed about speaking before you're spoken to?"</p>
                                    <p>"And it's <em>Your Grace</em>, now."</p>
                                    <Text color="#9246d9">He stands straighter as he says it. He likes the sound of it, <em>Your Grace</em>.</Text>
                                    <Pause ms={SHORT_PAUSE} />
                                    <p>"You can find me at the <b>Palace</b>" he says with a wink.</p>
                                    </>
                                ),
                                name: mayorRupert.name,
                                imgSrc: mayorRupert.imgSrc,
                                includeContinuePrompt: true,
                                sideEffect: () => setDialogueEnded(true)
                            });
                        },
                        shorthandContent: <Text>"Mayor?! No, this man was no mayor... he is our <b>King!</b>"</Text>,
                        name: name,
                        imgSrc: image,

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
                                content: <p>"Long live the Polis!"</p>,
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
                                            includeContinuePrompt: true,
                                            selectFollowup: () => agoraMeeting(mari)
                                        },
                                        {
                                            content: <Text>...</Text>,
                                            shorthandContent: <Text>[Say Nothing]</Text>,
                                            name: name,
                                            imgSrc: image,
                                            includeContinuePrompt: true,
                                            selectFollowup: () => agoraMeeting(mari)
                                        }
                                    ]
                                },
                                sideEffect: () => {
                                    setWorldItem(World.GOVERNANCE, 'agora');
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

    let content = null;

    const introText = (
        <>
        <p>You follow the path which leads downhill, taking care on the slope.</p>
        <p>You come upon a large circular clearing enclosed by the remains of ancient stonework steps, steep and incomplete.</p>
        <Pause ms={LONG_PAUSE} />
        <p>There is a crowd of people here, in between the ruins.</p>
        <p>They are talking as a group with some energy.</p>
        <Pause ms={SHORT_PAUSE} />
        <p>It becomes apparent that you are not the only one who does not remember.</p>
        <p>In fact, nobody does.</p>
        <Pause ms={LONG_PAUSE} />
        <p>The others have been awake for longer, they are discussing what they are supposed to do next.</p>
        </>
    );

    if(!dialogueStarted) content = (
        <>
        {introText}
        <Center marginTop={10}>
            <Button onClick={() => setDialogueStarted(true)}>Continue</Button>
        </Center>
        </>
    );

    else if(dialogueEnded) content = (
        <p>Dialogue ended.</p>
    );

    else content = (
        <Dialogue>
        </Dialogue>
    );

    return (
        <WindupChildren>
            {content}
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