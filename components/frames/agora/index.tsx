import React, { useEffect, useState } from "react";
import { Text, Button, Center, Container } from "@chakra-ui/react";
import { css } from "@emotion/css";

import { WindupChildren, Pause, Pace, Effect } from "windups";
import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE, INTUITION_COLOUR } from "../../lib/constants";
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";
import RelationshipIndicator from "../../lib/relationshipIndicator";
import {World, PrisonStates, GovernanceStates} from "../../../context/bigCityContext";
import useBigCity from "../../../hooks/useBigCity";
import { performers, PerformerNames, IPerformer } from "../../lib/performers";
import { colourFadeAnimationCss, fadeOutTransition, fadeInTransition } from "../../lib/animations";
import { Relationships, SelfIdentityLabels } from "../../lib/relationships";

const SHAKE_TIMEOUT = 500;

function AgoraDialogue({followLink} : IStoryFrame) : React.ReactElement {

    const { addMessage, dialogueEnded, setDialogueEnded } = useDialogue();
    const { world, setWorldItem } = useBigCity();
    const { playerPerformer, hasRelationshipPair, addRelationship, removeRelationship } = usePlayer();
    const [ dialogueStarted, setDialogueStarted ] = useState(false);

    const [shakingClasses, setShakingClasses] = useState(null);

    const shakeEffect = (classes: string, timeout=SHAKE_TIMEOUT) => {
        setShakingClasses(classes);

        setTimeout(() => {
            setShakingClasses(null);
        }, timeout);
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

    // a dream in which you are facing off with yourself
    const interrogationDream = () => {
        addMessage({
            content: <p>The world is fading to black.</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>In your dream you are sat at a table in a polished, hostile room.</p><Pause ms={SHORT_PAUSE} />
                <Text color={INTUITION_COLOUR}>It is the inside of a police interrogation room. It is from the old prison.</Text><Pause ms={SHORT_PAUSE} />
                <p>Opposite you sits your identical self.</p><Pause ms={SHORT_PAUSE} />
                <p>Identical and yet somehow...</p><Pause ms={SHORT_PAUSE} />
                <p>This is your enemy. They must die. It's them or it's you.</p><Pause ms={SHORT_PAUSE} />
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Do it now!"</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });
    }

    // Leopald reveals that he is armed and makes a coup attempt
    const coupDilemma = () => {
        
        addMessage({
            content: (
                <Container className={colourFadeAnimationCss("black", "red", 5)}>
                    <p>"I already left for the <b>arsenal</b> this morning" {PerformerNames.LEOPALD} reveals..</p><Pause ms={SHORT_PAUSE} />
                    <p>"I went with some <Pace ms={SLOW_PACE * 0.4}><b>likeminded individuals</b></Pace>, and we armed ourselves <Pace ms={SLOW_PACE * 0.4}>to the </Pace><Pace ms={SLOW_PACE * 0.35}>teeth</Pace>. <Pause ms={SHORT_PAUSE} />These proud defenders of liberty are lurking in the <b>shrub</b> with our guns, awaiting my word"</p>
                </Container>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <Container color="red">
                    <p>"The utopia we wish to build must be built on virtue <Pace ms={SLOW_PACE * 0.6}><em>and</em></Pace> terror, in equal measure"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Will you stand in our way, and fall by the sword of virtue, or repent,<Pause ms={SHORT_PAUSE * 0.75} /> and live?!"</p>
                </Container>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>You are stunned into silence, your words fail you.</p>
                <p>{PerformerNames.LEOPALD}'s men have you surrounded.</p>
                </>
            ),
            performer: playerPerformer
        });

        addMessage({
            content: <p>The others are silent, too.</p>,
            performer: performers[PerformerNames.ANDREW]
        });
        
        addMessage({
            content: <p>{PerformerNames.MARI} has turned on her heels and ran away. The brigands laugh at her as she runs.</p>,
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"What do you want us to do with them, boss?"</p>,
            performer: performers[PerformerNames.ARSENE],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>{PerformerNames.LEOPALD} licks his lips. <Pause ms={SHORT_PAUSE * 0.75} /></p>
                <Text color={INTUITION_COLOUR}>He is hungry for this.</Text>
                <p>"{playerPerformer.name}, you are under arrest, for your crimes against the Big City Republic"</p>
                <p>"Round up the other leaders, throw them in the prison.<Pause ms={SHORT_PAUSE} /> We'll decide what to do with them later"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>{PerformerNames.ARSENE} grabs you by your arm and roughly jerks you in front of him, his rifle to your back.<Pause ms={SHORT_PAUSE} /> They drive you from the agora and through the park, to the gates.<Pause ms={SHORT_PAUSE} /> By the gates there are more armed guards. They watch on nervously as a crowd is gathering to see what is going on.</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Disperse!" {PerformerNames.ARSENE} shouts into a crowd that does not hear him.</p><Pause ms={SHORT_PAUSE} />
                <p>"Disperse!"</p>
                </>
            ),
            performer: performers[PerformerNames.ARSENE],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>A troop approaches over the horizon. They are different from the other workers, they are organised and calling people onto the street to join them.<Pause ms={SHORT_PAUSE} /> At the head of the crowd you spot {PerformerNames.MARI}, she is leading them forward.</p>,
            performer: playerPerformer,
            getResponses: () => {
                const callout = <p>"{PerformerNames.MARI}!" you call out, but {PerformerNames.ARSENE} <em>SLAMS</em><Effect fn={() => shakeEffect("shake-hard shake-constant")} /><Pause ms={SHAKE_TIMEOUT * 0.5} /> the butt of his rifle into your stomach and you keel over in pain.</p>

                const followup = () => {
                    addMessage({
                        content: <p>"{playerPerformer.name}!" {PerformerNames.MARI} calls to you, rushing forward to help you.<Pause ms={SHORT_PAUSE} /> Where she treads the crowd follows, despite the danger. {PerformerNames.LEOPALD} and his followers have caught up, rifles pointed into the crowd.</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>They will not fire. <Pause ms={SHORT_PAUSE * 0.75} />That would be madness.</p>,
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p><b>BOOM!</b><Effect fn={() => shakeEffect("shake-horizontal shake-constant")} /><Pause ms={SHORT_PAUSE * 0.33} /> {PerformerNames.LEOPALD}'s rifle sounds. The echo rings through your body into a terrible abyss.</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        containerCss: fadeOutTransition(1 + (playerPerformer.name.length * 0.1)),
                        content: <p><Pace ms={SLOW_PACE * 0.5}>"{playerPerformer.name}...</Pace><Pace ms={SLOW_PACE}> I .."</Pace></p>,
                        performer: performers[PerformerNames.MARI],
                        sideEffect: () => {
                            addRelationship(PerformerNames.MARI, [Relationships.DEAD])
                        },
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>You are tumbling down into {PerformerNames.MARI}'s eyes, swirling down into the faded light of life that was behind them. <Pace ms={SLOW_PACE * 0.25}>Chasing it, further down and down into the dark.</Pace></p>
                            <p>There is a battle raging around you, you are dimly aware.</p>
                            </>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    interrogationDream();

                    addMessage({
                        containerCss: fadeInTransition(1 + (playerPerformer.name.length * 0.1)),
                        content: <p>"{playerPerformer.name}? Are you alright?"</p>,
                        performer: performers[PerformerNames.AXEL]
                    });
            
                    addMessage({
                        content: <p>"We thought we'd lost you for a moment"</p>,
                        performer: performers[PerformerNames.AXEL],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>It takes you a long while to come to. After some time has passed, discussions inevitably turn to what happened.</p>,
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    })

                    followLink("death");
                }

                return [
                    {
                        content: callout,
                        performer: playerPerformer,
                        selectFollowup: followup,
                        shorthandContent: <Text>[Call out for aid]</Text>
                    },
                    {
                        content: callout,
                        performer: playerPerformer,
                        selectFollowup: followup,
                        shorthandContent: <Text>[Call out in warning]</Text>
                    },
                    {
                        content: <></>,
                        performer: playerPerformer,
                        selectFollowup: followup,
                        shorthandContent: <Text>[Say nothing]</Text>
                    }
                ];
            }
        });

    }

    const useOfForce: () => IMessage[] = () => {
        // there are some default choices, always available
        let choices = [
            {
                content: (
                    <>
                    <p>"There are times when violence is necessary, for example in self-defence it is justified"</p>
                    <p>"But this simple fact does not mean that we will abandon our dreams of direct democracy"</p>
                    <p>"The agora is the <em>only</em> state apparatus that we need"</p>
                    </>
                ),
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    coupDilemma();
                },
                shorthandContent: <Text>Violence is justifiable out of necessity, but it will not replace direct democracy</Text>
            },
            {
                content: <p>"We must destroy the armoury, lest it become a <b>threat</b> to our nonviolent utopia!"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    setWorldItem(World.ARMOURY_DESTROYED, true);

                    addMessage({
                        content: <RelationshipIndicator color="#F8350B">The armoury will be destroyed.</RelationshipIndicator>,
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    coupDilemma();
                },
                shorthandContent: <Text>"The armoury must be destroyed!"</Text>
            },
            {
                content: <p>"I believe that {PerformerNames.LEOPALD} is right in the need of an established state, to protect us from the threat of <b>mob rule</b>"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    setWorldItem(World.GOVERNANCE, GovernanceStates.REPRESENTATIVE_DEMOCRACY);

                    addMessage({
                        content: <p>"But what makes this 'state' any different from any other armed mob?"</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>"<Pace ms={SLOW_PACE * 0.5}><b>Representation</b></Pace>", you begin.</p>
                            <p>"The armed group will be <b>organised</b>, and structured on discipline and <b>self-restraint</b>.<Pause ms={SHORT_PAUSE} /> We will vote from those among us who will represent us in the leadership positions of this organisation, and in so doing we will keep it in check"</p>
                            </>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>As the majority think over your proposition, it becomes clear that {PerformerNames.LEOPALD} in particular is not content.</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    coupDilemma();
                },
                shorthandContent: <Text>Violence is exclusively the right of an estbalished state which will be kept in check by representation</Text>
            },
            {
                content: (
                    <>
                    <p>"There will be no <b>armed minority</b>, because instead we will arm the <b>majority</b>!<Pause ms={SHORT_PAUSE} /> There will be no <b>coup</b>, because we will <b>outgun</b> them!"</p>
                    <Pause ms={SHORT_PAUSE} /><p>"Long live the Mob!"</p>
                    </>
                ),
                performer: playerPerformer,
                selectFollowup: () => {
                    addRelationship(PerformerNames.AXEL, [Relationships.COMRADE]);
                    setWorldItem(World.GOVERNANCE, GovernanceStates.MOB_RULE);
                    addMessage({
                        content: <p>"Hurrah!" {PerformerNames.AXEL} cheers. He is emphatically in agreement with your aims.<Pause ms={SHORT_PAUSE} /> The others seem less sure.</p>,
                        performer: performers[PerformerNames.AXEL]
                    });

                    addMessage({
                        content: <RelationshipIndicator color="#F8350B">The mob will be armed.</RelationshipIndicator>,
                        performer: performers[PerformerNames.AXEL],
                        includeContinuePrompt: true
                    });

                    coupDilemma();
                },
                shorthandContent: <Text>"Let us instead empty the armoury to arm the mob!"</Text>
            }
        ];

        const telepathicCommunication = css`
            color: #9932CC;
            font-style: italic;
        `;

        // there is a bonus choice available provided the prison has not been abolished
        if(world[World.PRISON] != PrisonStates.ABOLISHED) {
            choices.push({
                content: (
                    <Container className={telepathicCommunication}>
                        <p><Pace ms={SLOW_PACE * 3}>'Pssst'</Pace></p><Pause ms={SHORT_PAUSE} />
                        <p><Pace ms={SLOW_PACE}>'PSSSSST!'</Pace></p><Pause ms={LONG_PAUSE * 0.75} />
                    </Container>
                ),
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    addMessage({
                        content: <p>Slowly but surely<Pace ms={SLOW_PACE}>...</Pace> {PerformerNames.LEOPALD} comes to the realisation that it's your voice inside his head and not his.</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p className={telepathicCommunication}>'Oh<Pace ms={SLOW_PACE}>..</Pace> Er<Pace ms={SLOW_PACE}>..</Pace> me?'</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <Container className={telepathicCommunication}>
                                <p>'Who else would I mean? I'm talking inside of your head'<Pause ms={LONG_PAUSE} /></p>
                                <p>'This lot are suckers. What do you say we plot a good old-fashioned coup d'état?'</p>
                            </Container>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p><span className={telepathicCommunication}>'I didn't have you pegged as a <b>player of the Game</b>'</span> {PerformerNames.LEOPALD} responds to you cooly</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <Container className={telepathicCommunication}>
                                <p>'I'm one step ahead of you, boss, actually I already had one planned for today'</p>
                                <Pause ms={LONG_PAUSE * 0.75} />
                                <p>'I left for the <b>arsenal</b> with a few <b>likeminded individuals</b>, and we armed ourselves to the teeth. My goons are lurking in the <b>shrub</b> with our guns, ready to strike'</p>
                                <Pause ms={SHORT_PAUSE} />
                                <p>'I figure since you're already inside of my head I might as well tell you'</p>
                                <Pause ms={SHORT_PAUSE * 0.5} />
                                <p>'Besides, these people listen to you, I had you down as my <em>greatest threat</em>, so I'm glad you're in. Are you gonna give them the good news, or shall I?'</p>
                            </Container>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <Container className={colourFadeAnimationCss("black", "red", 5)}>
                                <p>"Listen up, you maggots!" You declare in unveiled contempt</p><Pause ms={SHORT_PAUSE} />
                                <p>"{PerformerNames.LEOPALD} and I, we're of one mind, two peas in an iron pod"</p><Pause ms={SHORT_PAUSE} />
                                <p>"And that pod,<Pause ms={SHORT_PAUSE} /> is Justice"</p>
                            </Container>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <Container color="red">
                                <p>"The utopia we wish to build must be built on virtue <em>and</em> terror, in equal measure"</p><Pause ms={SHORT_PAUSE} />
                                <p>"Virtue, without which terror is fatal; terror, without which virtue is powerless!"</p>
                            </Container>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <Container color="red">
                                <p>"It is true that we've robbed the armoury, and it's true that you're <b>surrounded</b> now by our goons"</p>
                                <p>"It has been said that terror is the principle of <b>tyranny</b>, and yes, the swords that gleam now in the hands of the <b>heroes of liberty</b> do ressemble the swords of the henchmen of tyranny. <Pause ms={SHORT_PAUSE} /> The government of the utopia is liberty's despotism against tyranny. Is force made only to protect crime? And is the thunderbolt not destined to strike the heads of the proud?"</p>
                            </Container>
                        ),
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>By your signal, {PerformerNames.LEOPALD}'s co-conspirators emerge from the bushes, armed with rifles and swords.</p>,
                        performer: performers[PerformerNames.ARSENE]
                    });

                    addMessage({
                        content: <p>The agora does not react, stunned into silence by your sudden and effective betrayal</p>,
                        performer: performers[PerformerNames.ALICIA],
                        includeContinuePrompt: true
                    });

                    if(hasRelationshipPair(PerformerNames.MARI, Relationships.COMRADE)) {
                        addMessage({
                            content: (
                                <>
                                <p>{PerformerNames.MARI} has tears in her eyes.</p>
                                <p>"<Pace ms={SLOW_PACE * 2}>I trusted you</Pace>"</p>
                                </>
                            ),
                            performer: performers[PerformerNames.MARI],
                            sideEffect: () => {
                                removeRelationship(PerformerNames.MARI, [Relationships.COMRADE]);
                                addRelationship(PerformerNames.MARI, [Relationships.BETRAYAL]);
                            },
                            includeContinuePrompt: true
                        });
                    }

                    addMessage({
                        content: <p>As the crowd is cleared from the agora you waste no time in rounding up the most vocal utopians for imprisonment.</p>,
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <RelationshipIndicator color="#F8350B">{PerformerNames.MARI} is imprisoned!</RelationshipIndicator>,
                        performer: performers[PerformerNames.MARI],
                        sideEffect: () => {
                            addRelationship(PerformerNames.MARI, [Relationships.IMPRISONED]);
                        }
                    });

                    addMessage({
                        content: (
                            <>
                            <RelationshipIndicator color="#F8350B">{PerformerNames.ANDREW} is imprisoned!</RelationshipIndicator>
                            </>
                        ),
                        performer: performers[PerformerNames.ANDREW],
                        sideEffect: () => {
                            addRelationship(PerformerNames.ANDREW, [Relationships.IMPRISONED]);
                        }
                    });

                    addMessage({
                        content: <RelationshipIndicator color="#F8350B">{PerformerNames.ALICIA} is imprisoned!</RelationshipIndicator>,
                        performer: performers[PerformerNames.ALICIA],
                        sideEffect: () => {
                            addRelationship(PerformerNames.ALICIA, [Relationships.IMPRISONED]);
                        }
                    });

                    addMessage({
                        content: (
                            <>                        
                            <RelationshipIndicator color="#F8350B">Big City is now a {GovernanceStates.MILITARY_CONSULATE}!</RelationshipIndicator>
                            <RelationshipIndicator color="#800080">You are now considered to be <b>ruthless</b></RelationshipIndicator>
                            </>
                        ),
                        performer: playerPerformer,
                        sideEffect: () => {
                            setWorldItem(World.GOVERNANCE, GovernanceStates.MILITARY_CONSULATE);
                            addRelationship('self', [SelfIdentityLabels.RUTHLESS]);
                            addRelationship(PerformerNames.LEOPALD, [Relationships.CO_RULER]);
                        },
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <RelationshipIndicator color="#800080">{PerformerNames.LEOPALD} is delighted with you.</RelationshipIndicator>,
                        performer: performers[PerformerNames.LEOPALD]
                    });

                    
                },
                shorthandContent: <Text>[Telepathically] "You and I {PerformerNames.LEOPALD}, let's take this town"</Text>
            });
        }

        return choices;
    }

    const prisonDecision: () => IMessage[] = () => {
        // the question which provokes this function: "How should we punish people who break the rules?"

        return [
            {
                content: (
                    <>
                    <p>"The prison was not necessary, it was cruel"</p>
                    { hasRelationshipPair('self', SelfIdentityLabels.REVOLUTIONARY) ? <p>"It was a tool of oppression!"</p> : null}
                    </>
                ),
                performer: playerPerformer,
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

                    // Leopald suggests that a state apparatus will be necessary
                    addMessage({
                        content: (
                            <>
                            <p>{PerformerNames.LEOPALD} eyes each of you coldly, but he does not speak for a long while.</p>
                            <p>The others are anticipating what he might say.</p>
                            </>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <Pause ms={SHORT_PAUSE} />
                            <p>"My comrades and peers, I share in your vision of creating a utopian society, really I do"</p>
                            <p>"I felt that a prison apparatus would be necessary it is true, necessary to protect our vision from those who would do it ill"</p>
                            <Pause ms={LONG_PAUSE * 0.75} />
                            <p>"But there is a greater threat to us than the sin of individuals - and that is the threat of <b>armed gangs</b>"</p>
                            <p>"What is the worth of all we will build, if someone decided to <em>take</em> it from us?"</p>
                            <Pause ms={LONG_PAUSE} />
                            <p>"Naturally - and to protect ourselves - it is imperative that we form our own armed group - a <b>state</b> - staffed by our trustworthy Utopianists, and capable of protecting our vision"</p>
                            <Pause ms={SHORT_PAUSE} />
                            </>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        getResponses: () => useOfForce()
                    });
                },
                sideEffect: () => {
                    addRelationship(PerformerNames.ANDREW, [Relationships.KIND]);
                    setWorldItem(World.PRISON, PrisonStates.ABOLISHED);
                },
                shorthandContent: <Text>"We do not need a prison. We can resolve conflicts collectively"</Text>,
            },
            {
                content: (
                    <>
                    <p>"Locking someone up only serves to alienate them from society further"</p>
                    <p>"It's sweeping a problem under the rug, instead of dealing with it"</p>
                    <p>"Before we build this kind of system, we should ask ourselves - what do we want it to achieve?"</p>
                    </>
                ),
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"It should be <em>restorative</em> as much as possible, focussed on allowing me to repair the relationships I damaged"</p>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"It should be focussed on <em>preventing</em> the behaviour from happening again"</p>,
                        performer: performers[PerformerNames.MARI]
                    });

                    addMessage({
                        content: <p>Other suggestions are made by many in the discussion. Alicia has started to take notes.</p>,
                        performer: performers[PerformerNames.ALICIA],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"... Decisions will be made collectively and based on consent, with a circle being delegated to <em>implement</em> the process."</p>,
                        performer: performers[PerformerNames.MARI]
                    })

                    addMessage({
                        content: <p>This is found to be acceptable by the majority of the agora. Andrew and several others volunteered to be a part of this circle, their actions under the supervision and authority of the agora as a whole.</p>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>Leopald is at first adamently opposed to the suggestions, when all of a sudden he is convinced.</p><Pause ms={SHORT_PAUSE} />
                            <p>"Yes, yes... I see the value in what you are saying now, Mari"</p>
                            <p>"And the body which you are leading, Andrew, will be responsible for establishing our new...<Pause ms={SHORT_PAUSE * 0.75} /> <em>egalitarian</em> infrastructure"</p>
                            </>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>"And naturally another body will be needed,<Pause ms={SHORT_PAUSE * 0.5} /> to <em>enforce</em> our new regime"</p><Pause ms={SHORT_PAUSE} />
                            <p>"To deal with those who would oppose us.<Pause ms={SHORT_PAUSE * 0.25} /> To protect ourselves"</p>
                            <Pause ms={SHORT_PAUSE} />
                            </>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        getResponses: () => useOfForce()
                    });
                },
                sideEffect: () => {
                    addRelationship(PerformerNames.ANDREW, [Relationships.KIND]);
                    setWorldItem(World.PRISON, PrisonStates.ABOLISHED);
                },
                shorthandContent: <Text>"We should replace the prison with something more focussed on <em>reform</em>"</Text>
            },
            {
                content: (<>
                    <p>"The old ways were necessarily cruel"</p>
                    <p>"Or else it would not have been an effective detterant"</p>
                </>),
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: (
                            <>
                            <p>"Clearly at least an <em>element</em> of our nature is sinful"</p>
                            <p>"To shape the society that we wish to live in we must punish wrongdoing and reward goodness"</p><Pause ms={LONG_PAUSE * 0.5} />
                            </>
                        ),
                        performer: playerPerformer
                    });

                    addMessage({
                        content: <p>"The old society...<Pause ms={SHORT_PAUSE * 0.25} /> used to reward goodness? Did you see this in the history books, {PerformerNames.LEOPALD}? Could you tell use more?"</p>,
                        performer: performers[PerformerNames.ZOE],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"I.. er.. I don't know if I could say for definite. As I say, I just skimmed the pages.<Pause ms={SHORT_PAUSE * 0.75} /> I believe this was always their aim"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"You <em>believe?</em><Pause ms={SHORT_PAUSE * 0.5} /> So you don't know"</p>,
                        performer: performers[PerformerNames.MARI]
                    });

                    addMessage({
                        content: <p>"What else would their aim be? It's our aim, isn't it?"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    // Leopald suggests that a state apparatus will be necessary
                    addMessage({
                        content: (
                            <>
                            <p>"I think that the prison might not <em>always</em> be necessary, perhaps we can use it sparingly"</p>
                            <p>"But it can be a powerful tool, in order to shape <em>our citizens</em> to be the way we want them to be"</p>
                            <Pause ms={LONG_PAUSE} />
                            <p>"Naturally.. it will require enforcement, it requires us to form a <b>state</b>, capable of pursuing - and protecting - our <b>utopian vision</b>"</p>
                            <Pause ms={SHORT_PAUSE} />
                            </>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        getResponses: () => useOfForce()
                    });
                },
                includeContinuePrompt: true,
                shorthandContent: <Text>"The prison was absolutely necessary, it is a <em>deterrant</em>"</Text>,
                sideEffect: () => {
                    setWorldItem(World.PRISON, PrisonStates.DETERRANT);
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
                <Text color={INTUITION_COLOUR}>His muscles are tense and his arms are arched.</Text>
                <Text color={INTUITION_COLOUR}>He feels a pain at the knowledge of what happened to him.</Text>
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
                <Text color={INTUITION_COLOUR}>The statement is intended to relieve the tension.</Text>
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
                <Text color={INTUITION_COLOUR}>Mari is elated as she watches the exiled pretenders flee.</Text>
                <Pause ms={SHORT_PAUSE} />
                <p>"Long live the Polis!"</p>
                <Text color={INTUITION_COLOUR}>Rupert is looking over his shoulder as he leaves, his face is a picture.</Text>
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
                                    addRelationship(PerformerNames.MARI, [Relationships.COMRADE]);
                                    addRelationship('self', [SelfIdentityLabels.REVOLUTIONARY]);
                                },
                                includeContinuePrompt: true
                            });

                            addMessage({
                                content: <p>"{playerPerformer.name}, my dear, I think you're being <b>naïve</b>."<Pause ms={SHORT_PAUSE} /></p>,
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
                <Text color={INTUITION_COLOUR}>He feels as though his relevance has been brought into question.</Text>
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
                <Text color={INTUITION_COLOUR}>She is grinning widely as she says it.</Text>
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
                <Text color={INTUITION_COLOUR}>Others seem unsure.</Text>
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
                            <Text color={INTUITION_COLOUR}>You are projecting such a lionesque dominance that everyone is watching you, silent.</Text>
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
                                        <Text color={INTUITION_COLOUR}><em>They're buying it!</em></Text>
                                    </Pace>
                                    <Text color="#FFBF00">It must be the sensational <em>authority</em> that you're projecting.</Text>
                                    <p>The crowd turns in favour, and the dubious claim of Mayor Rupert becomes the <em>truth</em> of King Rupert.</p>
                                    <RelationshipIndicator color="#3cb371"><p>Big City is now an <b>Absolute Monarchy</b>.</p></RelationshipIndicator>
                                    <RelationshipIndicator color="#3cb371"><p>{PerformerNames.RUPERT} is now King!</p></RelationshipIndicator>
                                    </>
                                ),
                                performer: playerPerformer,
                                sideEffect: () => {
                                    addRelationship(PerformerNames.RUPERT, [Relationships.GRATITUDE]);
                                    addRelationship(PerformerNames.RUPERT, [Relationships.KING]);
                                    setWorldItem(World.GOVERNANCE, GovernanceStates.MONARCHY);
                                    setWorldItem(World.RULER, PerformerNames.RUPERT);
                                    setWorldItem("name", "Rupertston");
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
                                    <Text color={INTUITION_COLOUR}>He stands straighter as he says it. He likes the sound of it, <em>Your Grace</em>.</Text>
                                    <Pause ms={SHORT_PAUSE} />
                                    <p>"You can find me at the <b>Palace</b>" he says with a wink.</p>
                                    <p>"In fact, I think we shall hold court there. My people! Come to me with your problems and I will rule on them fairly and <b>absolutely</b>!"</p>
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
                        msgId: "agoramaker",
                        content: (
                            <>
                            <p>"This man <b>is</b> an impostor! Worse still he is a leech!"</p>
                            <p>"We can organise just fine without him!"</p>
                            <Pause ms={SHORT_PAUSE * 1.25} />
                            <p>"All power to the People!"</p>
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
                                    <p>"Burly. <Pace ms={SLOW_PACE}><em>Do something</em></Pace>"</p>
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
                                                <Text color={INTUITION_COLOUR}>You can hear the wound from here.</Text>
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
                                    setWorldItem(World.GOVERNANCE, GovernanceStates.AGORA);
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

    else if(dialogueEnded) {

        let topContent = <p>You leave the park behind.</p>;

        switch(world[World.GOVERNANCE]){
            case GovernanceStates.MONARCHY:
                topContent = <p>{PerformerNames.RUPERT} leads his procession out of the park, followed by tens of his newly loyal subjects. Others are wandering around the old arena aimlessly. The agora is dead.</p>;
                break;
            case GovernanceStates.MILITARY_CONSULATE:
                break;
        }

        content = (
            <>
                {topContent}
                <Button onClick={() => followLink("map")}>Continue</Button>
            </>
        );   
    }

    else content = (
        <Dialogue>
        </Dialogue>
    );

    return (
        <Container className={shakingClasses ? shakingClasses : ""}>
            <WindupChildren>
                {content}
            </WindupChildren>
        </Container>
    );
}

export default function Agora({followLink} : IStoryFrame): React.ReactElement {

    return (
        <DialogueProvider>
            <AgoraDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}