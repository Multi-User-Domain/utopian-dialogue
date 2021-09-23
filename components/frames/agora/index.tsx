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
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";
import RelationshipIndicator from "../../lib/relationshipIndicator";
import {World} from "../../../context/bigCityContext";
import useBigCity from "../../../hooks/useBigCity";
import { performers, PerformerNames, IPerformer } from "../../lib/performers";

function AgoraDialogue() : React.ReactElement {

    const { addParticipant, addMessage, dialogueEnded, setDialogueEnded } = useDialogue();
    const { setWorldItem } = useBigCity();
    const { name, image, hasOutgoingRelationshipPair, addOutgoingRelationship, addIncomingRelationship } = usePlayer();
    const [ dialogueStarted, setDialogueStarted ] = useState(false);

    const playerPerformer: IPerformer = {
        name: name,
        imgSrc: image
    }

    const introduceMayorRupert = () => {
        addMessage({
            content: (
                <>
                <p>A man dressed in fine clothing approaches, his face is red and puffy with sweat.</p>
                <p>He is leading a procession of five other men, dressed in bright uniform.</p>
                <Pause ms={LONG_PAUSE} />
                <p>"And just <Pause ms={SHORT_PAUSE *0.25}/><b>what</b> is the meaning of all this <em>nonsense</em>?!"</p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT],
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
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });
    }

    const introduceBodyguard = () => {
        addMessage({
            content: (
                <>
                <p>"Yeah! Your gathering here is illegal!" Says the tallest of the guardsmen, in a fiercely bright orange and white blouse.</p>
                </>
            ),
            performer: performers[PerformerNames.BURLY],
            includeContinuePrompt: true
        });
    }

    const introduceMari = () => {
        addMessage({
            content: (
                <>
                <p>"Who are you?"</p>
                </>
            ),
            performer: performers[PerformerNames.MARI],
        });
    }

    const prisonDecision: () => IMessage[] = () => {
        // the question which provokes this function: "How should we punish people who break the rules?"

        return [
            {
                content: (
                    <>
                    <p>"The prison was not necessary, it was cruel"</p>
                    { hasOutgoingRelationshipPair('self', 'revolutionary') ? <p>"It was a tool of oppression!"</p> : null}
                    </>
                ),
                performer: playerPerformer,
                shorthandContent: <Text>"We do not need a prison. We can resolve conflicts collectively"</Text>,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"Yes. The <b>old ways</b> are something to be overcome"</p>,
                        performer: performers[PerformerNames.MARI],
                    });

                    addMessage({
                        content: <RelationshipIndicator color="#ff5dcb"><p>Andrew seems relieved. He looks on you fondly.</p></RelationshipIndicator>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>"We will try to resolve all of our issues face-to-face" You begin.</p>
                            <p>"We should focus on restorative justice, and on solving the issues which cause transgressions"</p>
                            <p>"If it comes to it, we can discuss transgressions and punishments collectively to find solutions"</p>
                            <RelationshipIndicator color="#ff5dcb"><p>Big City Prison has been abolished!</p></RelationshipIndicator>
                            </>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });
                },
                sideEffect: () => {
                    addIncomingRelationship('andrew', ['kind']);
                    setWorldItem(World.PRISON, "abolished");
                }
            },
            {
                content: <></>,
                performer: playerPerformer,
                shorthandContent: <Text>"[Not yet implemented] We could replace the prison with something more focussed on <em>reform</em>"</Text>,
                selectFollowup: () => {

                }
            },
            {
                content: <></>,
                performer: playerPerformer,
                shorthandContent: <Text>"[Not yet implemented] The prison was absolutely necessary, it is a <em>deterrant</em>"</Text>,
                selectFollowup: () => {

                }
            },
        ];
    }

    //a dilemna involving what to do with prison and people who break the rules
    const prisonDilemma = () => {
        addMessage({
            content: <p>"There's this collossal building in the city centre, called '<b>Big City Prison</b>'.<Pause ms={LONG_PAUSE * 0.8} /> From the inside, we figured out that they were locking <em>people</em> up in there. People locked into tiny cells. It makes me feel sick<Pause ms={LONG_PAUSE * 0.7} />"</p>,
            performer: performers[PerformerNames.ALICIA],
            
        });

        addMessage({
            content: (
                <>
                <p>"Have you considered that they might have <em>had to</em> lock those people up? For their own good and for the good of society?"</p>
                <Pause ms={SHORT_PAUSE * 1.5} />
                <p>"Perhaps our nature is inherently dangerous, something that we must control."</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"<b>I <em>woke up</em> in one of those cells</b>"</p>
                <Pause ms={SHORT_PAUSE} />
                <Text color="#9246d9">His muscles are tense and his arms are arched.</Text>
                <Text color="#9246d9">He feels a pain at the knowledge of what happened to him.</Text>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <p>"I'm not a bad man and I don't see how that could have been for my own good"</p>
                </>
            ),
            performer: performers[PerformerNames.ANDREW],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Perhaps they were not <em>always</em> right then, clearly. But neither surely were they <em>always</em> wrong?"</p>
                <Text color="#9246d9">The statement is intended to relieve the tension.</Text>
                </>
            ),
            performer: performers[PerformerNames.ZOE],
            getResponses: () => {return prisonDecision();}
        });
    }

    const leopaldTalksOfHistory = () => {
        addMessage({
            content: (
                <>
                <p>"Here, now, when all this is so fresh, <em>of course</em> we will all co-operate with eachother but<Pace ms={SLOW_PACE * 1.25}>...</Pace> a week from now? <Pause ms={SHORT_PAUSE} />A month?</p>
                <p>"We can learn of our history, we still have the books"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"It's been <b>two days</b> since the Big Pop. I've flicked through some of the <b>history books</b> I found down by the library"</p>
                <Pause ms={LONG_PAUSE * 0.75} />
                <p>"Do you know what I saw?"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"I've only flicked through and looked at the pictures but..."</p>
                <p>"I saw a lot of pain and suffering. Soldiers and wars, famines and plagues. Most of it was <em>man-made</em>"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });
    }

    const stateDecision = () => {
        addMessage({
            content: <p>"I think that we need to establish some <b>state apparatus</b> to help ensure that we do not revert into a state of chaos"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Pish!"</p>
                <p>"How is this man any different than Rupert? I don't think you can coerce anyone to be free!"</p>
                <p>"Since when was <b>organised violence</b> a part of 'how we want to live together'?"</p>
                </>
            ),
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Everyone <em>here</em> wants to build utopia, but that doesn't mean that <em>everyone</em> does. Some people are just bad. We <em>need</em> an armed minority, to keep us safe"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        prisonDilemma();
    }

    // if you choose to expel Rupert and his cronies, the agora dialogue will continue
    const agoraMeeting = () => {
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
            performer: performers[PerformerNames.MARI],
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
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Where do we start?"</p>,
            performer: performers[PerformerNames.AXEL]
        });

        addMessage({
            content: (
                <>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <p>"That is for us all to decide together<Pace ms={SLOW_PACE * 2}>...</Pace>"</p>
                <p>"So, how do we want to live together?"</p>
                </>
            ),
            performer: performers[PerformerNames.MARI],
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
                        performer: playerPerformer,
                        includeContinuePrompt: true,
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>"Yes!" he shouts, all in a rush.</p>
                                    <p>"These are my concerns exactly"</p>
                                    </>
                                ),
                                performer: performers[PerformerNames.LEOPALD],
                                includeContinuePrompt: true
                            });

                            leopaldTalksOfHistory();
                            stateDecision();
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
                        performer: playerPerformer,
                        includeContinuePrompt: true,
                        selectFollowup: () => {
                            addMessage({
                                content: <RelationshipIndicator color="#ff5dcb"><p>You are developing the reputation of a revolutionary leader. People look up to you.</p></RelationshipIndicator>,
                                performer: performers[PerformerNames.MARI],
                                sideEffect: () => {
                                    addIncomingRelationship('mari', ['camaradery']);
                                    addOutgoingRelationship('self', ['revolutionary']);
                                },
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"{name}, my dear, I think you're being <b>naïve</b>."<Pause ms={SHORT_PAUSE} /></p>,
                                performer: performers[PerformerNames.LEOPALD],
                            });

                            leopaldTalksOfHistory();
                            stateDecision();
                        },
                        shorthandContent: <Text>"We are so ready for this! All power to our Agora!"</Text>
                    },
                    {
                        content: (
                            <>
                            </>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true,
                        selectFollowup: () => {
                            leopaldTalksOfHistory();
                            stateDecision();
                        },
                        shorthandContent: <Text>[Say Nothing]</Text>
                    }
                ];
            }
        });
    }

    useEffect(() => {
        introduceMayorRupert();
        introduceBodyguard();
        introduceMari();

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
            performer: performers[PerformerNames.BURLY],
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
            performer: performers[PerformerNames.MARI],
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
            performer: performers[PerformerNames.BURLY],
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
            performer: performers[PerformerNames.MARI],
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
                                performer: performers[PerformerNames.BURLY],
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
                                performer: playerPerformer,
                                sideEffect: () => {
                                    addIncomingRelationship('rupert', ['extreme gratitude']);
                                    addOutgoingRelationship('rupert', ['king']);
                                    setWorldItem(World.GOVERNANCE, 'absolute monarchy');
                                    setWorldItem(World.RULER, PerformerNames.RUPERT);
                                }
                            });

                            addMessage({
                                content: <RelationshipIndicator color="#ff5dcb"><p>King Rupert eyes have started to sparkle whenever he looks at you.</p></RelationshipIndicator>,
                                performer: performers[PerformerNames.RUPERT],
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
                                performer: performers[PerformerNames.MARI]
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"Long live the King!"</p>
                                    <p>"Long live the King!"</p>
                                    </>
                                ),
                                performer: performers[PerformerNames.ZOE]
                            });

                            addMessage({
                                content: <p>"Long live the King!"</p>,
                                performer: performers[PerformerNames.ALICIA]
                            })

                            addMessage({
                                content: (
                                    <>
                                    <p>The King and his men are gazing at you in stupified admiration.</p>
                                    <p>"You did good out there, old sport!"</p>
                                    <p>"Your ambition is remarkable"</p>
                                    </>
                                ),
                                performer: performers[PerformerNames.RUPERT],
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"Your stature, Olympian!"</p>,
                                performer: performers[PerformerNames.BURLY]
                            });

                            addMessage({
                                content: <p>"Your words, honey!"</p>,
                                performer: performers[PerformerNames.AXEL],
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"Anytime you need <b>Anything</b>, you will know where to find me"</p>,
                                performer: performers[PerformerNames.RUPERT],
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"Where's that, boss?"</p>,
                                performer: performers[PerformerNames.BURLY],
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
                                performer: performers[PerformerNames.RUPERT],
                                includeContinuePrompt: true,
                                sideEffect: () => setDialogueEnded(true)
                            });
                        },
                        shorthandContent: <Text>"Mayor?! No, this man was no mayor... he is our <b>King!</b>"</Text>,
                        performer: playerPerformer

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
                                performer: performers[PerformerNames.ZOE]
                            });
                            
                            addMessage({
                                content: <p>"Long live the Polis!"</p>,
                                performer: performers[PerformerNames.ALICIA]
                            })

                            addMessage({
                                content: <p>"Long live the Polis!"</p>,
                                performer: performers[PerformerNames.MARI],
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
                                performer: performers[PerformerNames.RUPERT],
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
                                performer: performers[PerformerNames.BURLY]
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p>"Long live the Polis!"</p>
                                    </>
                                ),
                                performer: performers[PerformerNames.AXEL],
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>Burly and the would-be mayor beat a slow retreat from the crowd.</p>,
                                performer: performers[PerformerNames.RUPERT],
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
                                            performer: playerPerformer,
                                            includeContinuePrompt: true,
                                            selectFollowup: () => agoraMeeting()
                                        },
                                        {
                                            content: <Text>...</Text>,
                                            shorthandContent: <Text>[Say Nothing]</Text>,
                                            performer: playerPerformer,
                                            includeContinuePrompt: true,
                                            selectFollowup: () => agoraMeeting()
                                        }
                                    ]
                                },
                                sideEffect: () => {
                                    setWorldItem(World.GOVERNANCE, 'agora');
                                }
                            });
                        },
                        shorthandContent: <Text>Side with Mari</Text>,
                        performer: playerPerformer
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
    //const introText = null;

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