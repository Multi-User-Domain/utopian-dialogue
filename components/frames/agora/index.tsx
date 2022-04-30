import React, { useEffect, useState } from "react";
import { Text, Button, Center, Container, Image } from "@chakra-ui/react";
import { css } from "@emotion/css";

import { WindupChildren, Pause, Pace, Effect } from "windups";
import { IStoryFrame } from "../../lib/types";
import Dialogue from "../../lib/dialogue";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE, INTUITION_COLOUR, FAST_PACE } from "../../lib/constants";
import { IMessage, DialogueProvider } from "../../../context/dialogueContext";
import RelationshipIndicator from "../../lib/relationshipIndicator";
import {World, PrisonStates, GovernanceStates} from "../../../context/bigCityContext";
import useBigCity from "../../../hooks/useBigCity";
import { performers, PerformerNames, IPerformer } from "../../lib/performers";
import { colourFadeAnimationCss, fadeOutTransition, fadeInTransition } from "../../lib/animations";
import { Relationships, SelfIdentityLabels, Values, TarotCardNames, tarotCards } from "../../lib/relationships";


const SHAKE_TIMEOUT = 500;
const GREENSIGHT_TEXT_COLOUR = "#27b197";

function AgoraDialogue({followLink} : IStoryFrame) : React.ReactElement {

    const { addMessage, dialogueEnded, setDialogueEnded, selectRandomFrom } = useDialogue();
    const { world, setWorldItem } = useBigCity();
    const { playerPerformer, hasRelationshipPair, addRelationship, removeRelationship, buildRelationshipObject, hasRelationshipStrongerThan,
        hasRelationshipWeakerThan } = usePlayer();
    const [ dialogueStarted, setDialogueStarted ] = useState(false);

    const [shakingClasses, setShakingClasses] = useState(null);

    const shakeEffect = (classes: string, timeout=SHAKE_TIMEOUT) => {
        setShakingClasses(classes);

        setTimeout(() => {
            setShakingClasses(null);
        }, timeout);
    }

    useEffect(() => {
        //addMessage(tarotCards[TarotCardNames.COURAGE]);
        //addMessage(tarotCards[TarotCardNames.GREENSIGHT]);

        addMessage({
            content: (
                <>
                <Text fontSize='5xl'>Welcome to Big City Agora</Text>
                <Image src="../../../public/img/Agora.jpeg" />
                </>
            ),
            performer: performers[PerformerNames.NULL_PERFORMER],
            includeContinuePrompt: true,
            excludeSkipPrompt: true
        })

        addMessage({
            content: (
                <>
                <p>"Salutations!" Says a young lady with a beaming smile. "My name is Mari- "</p>
                <Pause ms={SHORT_PAUSE * 0.5} />
                </>
            ),
            performer: performers[PerformerNames.MARI],
        });

        addMessage({
            content: <p>"Do you remember who you are?!"<br/> He is addressing you<Pause ms={SHORT_PAUSE * 0.5} /></p>,
            performer: performers[PerformerNames.DOUGLAS],
            sideEffect: () => {
                addRelationship(PerformerNames.DOUGLAS, buildRelationshipObject(Relationships.NOSTALGIA, 2));
            },
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Of course they don't, Douglas. None of us do"</p>,
            performer: performers[PerformerNames.MARI],
            getResponses: () => doYouRememberResponses(false)
        });
    }, []);

    const doYouRememberResponses = (hasGreensight: boolean) => {
        let choices: IMessage[] = [
            {
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"Really?<Pause ms={SHORT_PAUSE} /> Wow!<Pause ms={SHORT_PAUSE * 0.3}/> Then perhaps there is some hope for all of us"</p>,
                        performer: performers[PerformerNames.DOUGLAS]
                    });

                    addMessage({
                        content: <p>His eyes are sparkling as he says it</p>,
                        performer: performers[PerformerNames.DOUGLAS],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>{selectRandomFrom(["*Mumbles disapprovingly*", "Mari seems disrupted by your statement", "Mari is frowning"])}</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    agoraMeeting();
                },
                sideEffect: () => {
                    addRelationship(PerformerNames.DOUGLAS, buildRelationshipObject(Relationships.HOPE_SURROGATE, 1));
                    addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, -1));
                    addRelationship("self", buildRelationshipObject(SelfIdentityLabels.SELF_KNOWLEDGE_CLAIM, null));
                },
                shorthandContent: <Text>{selectRandomFrom(["I remember who I am", "Actually I do remember"])}</Text>
            },
            {
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: <p>He seems disappointed by this</p>,
                        performer: performers[PerformerNames.DOUGLAS],
                        includeContinuePrompt: true
                    });

                    addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, 1));

                    agoraMeeting();
                },
                shorthandContent: <Text>{selectRandomFrom(["\"No, I don't remember\"", "\"I don't remember who I am\""])}</Text>
            }
        ];

        if(!hasGreensight) choices.push({
            performer: playerPerformer,
            selectFollowup: () => {
                addMessage({
                    content: (
                        <>
                        <p>Douglas looks skeptical</p><Pause ms={SHORT_PAUSE * 0.5} />
                        <p>"Like... remembering who you are?"</p>
                        </>
                    ),
                    performer: performers[PerformerNames.DOUGLAS],
                    getResponses: () => doYouRememberResponses(true)
                })
            },
            sideEffect: () => {
                addRelationship("self", buildRelationshipObject(SelfIdentityLabels.HAS_GREENSIGHT, null));
            },
            shorthandContent: <Text>"I am gifted with the Greensight, I see things that others do not"</Text>
        });

        return choices
    }

    const agoraMeeting = () => {
        addMessage({
            content: <p><em>Your choices are affecting how other characters view you, and how you view them</em></p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        if(hasRelationshipStrongerThan(PerformerNames.MARI, Relationships.TRUST, 0)) {
            addMessage({
                content: <p>Mari addresses you. "We've been meeting here for the last few days, ever since the Great Pop"</p>,
                performer: performers[PerformerNames.MARI],
                includeContinuePrompt: true
            });
            
            addMessage({
                content: <p>"Once we woke up we needed to figure out again how to live, we were all disoriented and without purpose"</p>,
                performer: performers[PerformerNames.MARI],
                includeContinuePrompt: true
            });

            addMessage({
                content: <p>"We call this the Agora. Here we ask the question 'How do we want to live together?' and then we delegate and organise to make the answers reality"</p>,
                performer: performers[PerformerNames.MARI],
                includeContinuePrompt: true,
                getResponses: preMeetingQuestions
            });
        }
        else {
            addMessage({
                content: <p>Douglas address you. "We've been meeting here for the last few days, ever since the Great Pop"</p>,
                performer: performers[PerformerNames.DOUGLAS],
                includeContinuePrompt: true
            });

            addMessage({
                content: <p>"It's a governance of sorts. <Pause ms={SHORT_PAUSE} />Once we woke up we needed to figure out again how to live, so we've been piecing together what life was like<Pace ms={SLOW_PACE * 0.6}>...</Pace> you know, before"</p>,
                performer: performers[PerformerNames.DOUGLAS],
                includeContinuePrompt: true
            });

            addMessage({
                content: <p>"Now that you're here,<Pause ms={SHORT_PAUSE * 0.2}/> maybe we can set about recovering the Old World, and rebuilding it<Pace ms={SLOW_PACE}>...</Pace> <em>exactly</em> as it was!"</p>,
                performer: performers[PerformerNames.DOUGLAS],
                includeContinuePrompt: true,
                getResponses: preMeetingQuestions
            });
        }
    }

    const preMeetingQuestions = (askedQuestions: number[] = []) : IMessage[] => {
        // you can copy this pattern to allow the player to go through a range of dialogue choices

        let choices = [];
        let askedHowMany = askedQuestions.includes(1);

        if(!askedQuestions.includes(0)) {
            choices.push({
                content: <p>"How long has it been since the Great Pop?"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    askedQuestions.push(0);

                    addMessage({
                        content: (
                            <>
                            <p>"What?<Pause ms={SHORT_PAUSE} /> Have you only just woken up?"</p><Pause ms={SHORT_PAUSE * 0.5} />
                            <p>Evidently this surprises her</p>
                            </>
                        ),
                        performer: performers[PerformerNames.ALICIA],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"It's been {world.daysSinceGreatPop} days" Mari answers. "We've been meeting here for {world.daysSinceGreatPop - 1}"</p>,
                        performer: performers[PerformerNames.MARI],
                        getResponses: () => preMeetingQuestions(askedQuestions)
                    });
                }
            });
        }

        if(!askedHowMany) {
            choices.push({
                content: <p>"How many people are here, in attendance?"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    askedQuestions.push(1);

                    addMessage({
                        content: <p>"Around fifty, in total"</p>,
                        performer: performers[PerformerNames.MARI],
                        getResponses: () => preMeetingQuestions(askedQuestions)
                    });
                }
            });
        }

        if(askedHowMany && !askedQuestions.includes(2)) {
            choices.push({
                content: <p>"And how many people, in the city?"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    askedQuestions.push(2);

                    addMessage({
                        content: <p>"A lot more than that"<Pause ms={SHORT_PAUSE} /></p>,
                        performer: performers[PerformerNames.ALICIA]
                    });

                    addMessage({
                        content: <p>Our numbers are growing, little by little"</p>,
                        performer: performers[PerformerNames.MARI],
                        getResponses: () => preMeetingQuestions(askedQuestions)
                    });
                }
            });
        }

        if(!askedQuestions.includes(3)) {
            choices.push({
                content: <p>"Is the city governed here, in the Agora?"</p>,
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    askedQuestions.push(3);

                    addMessage({
                        content: <p>Nobody seems sure how to answer this.</p>,
                        performer: performers[PerformerNames.NULL_PERFORMER],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"Not so much 'governance', as far as I understand the term"</p>,
                        performer: performers[PerformerNames.ALICIA],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"Not in an everday sense" {PerformerNames.MARI} admits.<Pause ms={LONG_PAUSE} /> "But it's becoming known as the central place <Pace ms={SLOW_PACE * 0.33}>to engage in the city politics</Pace>"</p>,
                        performer: performers[PerformerNames.MARI],
                        getResponses: () => preMeetingQuestions(askedQuestions)
                    });
                }
            });
        }

        choices.push({
            content: <p>...</p>,
            performer: playerPerformer,
            selectFollowup: rupertIntroduction,
            shorthandContent: <p>No more questions</p>
        });

        return choices
    }

    const rupertIntroduction = () => {
        addMessage({
            content: (
                <>
                <p>A man dressed in fine clothing is approaching, his face is red and puffy with sweat.</p>
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
                <Pause ms={LONG_PAUSE} />
                <p>"Nevertheless I have all of the necessary <Pause ms={SHORT_PAUSE*0.25}/><em>*ahem*</em> records to prove it"</p><Pause ms={SHORT_PAUSE} />
                <p>He is waving a ledger of papers in his hand.</p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT],
            getResponses: () => {
                const ledgers = <p>"Ledgers<Pace ms={SLOW_PACE}>...</Pace> of property records, debts"</p>;

                return [
                    {
                        content: (
                            <p>It is a thick ledger<Pace ms={SLOW_PACE * 0.33}> of semi-organised documents</Pace><Pause ms={SHORT_PAUSE * 0.75} /> bound in leather. <Pause ms={SHORT_PAUSE * 0.5} />The documents are pertaining to credits and debts owed the local City Mayoral,<Pause ms={SHORT_PAUSE * 0.5} /> and to property records.</p>
                        ),
                        performer: playerPerformer,
                        selectFollowup: () => {
                            addMessage({
                                content: ledgers,
                                performer: playerPerformer
                            });

                            smugRupert(true);
                        },
                        shorthandContent: <p>Take a look at the records</p>,
                    },
                    {
                        content: <></>,
                        performer: performers[PerformerNames.NULL_PERFORMER],
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>Mari snatches the ledger from his hand<Pause ms={SHORT_PAUSE * 0.25} />, and scans them scrupulously<Pause ms={LONG_PAUSE} /></p>
                                    {ledgers}
                                    </>
                                ),
                                performer: performers[PerformerNames.MARI],
                                includeContinuePrompt: true
                            });

                            smugRupert(false);

                        },
                        shorthandContent: <p>[Say nothing]</p>
                    }
                ]
            }
        });
    }

    const smugRupert = (player: boolean) => {
        const subject = player ? "your" : "Mari's";
        const performer = player ? playerPerformer : performers[PerformerNames.MARI];
        const reaction = player ? "Your ribcage is saw from his effort" : "Mari holds her ribcage and frowns deeply";

        addMessage({
            content: <p>"And the most recent ones<Pace ms={SLOW_PACE * 0.33}>...</Pace> Signed and stamped by Yours Truly"<Pause ms={SHORT_PAUSE * 0.25} /> Rupert adds smugly</p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>Douglas is reading the ledgers keenly over {subject} shoulder<Pause ms={SHORT_PAUSE * 1.5} /></p>,
            performer: performers[PerformerNames.DOUGLAS]
        });

        addMessage({
            content: <p>The tall guardsman wrestles the ledger from {subject} grip roughly.<Pause ms={SHORT_PAUSE * 1.5} /></p>,
            performer: performers[PerformerNames.BURLY]
        });

        addMessage({
            content: <p>{reaction}</p>,
            performer: performer,
            includeContinuePrompt: true,
            selectFollowup: smugRupertFollowup
        });
    }

    const smugRupertFollowup = () => {

        addMessage({
            content: <p>"Your gathering here is illegal!" shrieks the tall guardsman,<Pause ms={SHORT_PAUSE * 0.5} /> who is wearing a fiercely bright orange and white blouse.</p>,
            performer: performers[PerformerNames.BURLY],
            getResponses: () => {
                return [
                    {
                        selectFollowup: burlyWho,
                        sideEffect: () => {
                            addRelationship(PerformerNames.BURLY, buildRelationshipObject(Relationships.TRUST, -1));
                        },
                        content: <p>"Who are you?"</p>,
                        includeContinuePrompt: true,
                        performer: playerPerformer
                    },
                    {
                        selectFollowup: () => {
                            addRelationship(PerformerNames.BURLY, buildRelationshipObject(Relationships.TRUST, -2));
                            addRelationship("self", buildRelationshipObject(SelfIdentityLabels.COURAGEOUS, 1));

                            if(hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT)) {
                                addMessage({
                                    content: <Text color={GREENSIGHT_TEXT_COLOUR}>This man's aura has become tense <Pause ms={SHORT_PAUSE * 0.25} />and carries the potential of violence</Text>,
                                    performer: playerPerformer,
                                    includeContinuePrompt: true
                                });
                            }

                            burlyWho();
                        },
                        content: <p>"Illegal? Says who?"</p>,
                        includeContinuePrompt: true,
                        performer: playerPerformer
                    },
                    {
                        selectFollowup: () => {
                            addMessage({
                                content: <p>"Who are you?"</p>,
                                performer: performers[PerformerNames.MARI],
                                includeContinuePrompt: true
                            });

                            burlyWho();
                        },
                        content: <></>,
                        shorthandContent: <p>[Say nothing]</p>,
                        performer: playerPerformer
                    }
                ]
            }
        });
    }

    const burlyWho = () => {
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
                <p>His face folds, his frown a deepening grotesque.</p>
                <p>He folds his arms protectively.</p>
                </>
            ),
            performer: performers[PerformerNames.BURLY],
            includeContinuePrompt: true
        });

        mariQuestionsRupert();
    }

    const mariQuestionsRupert = () => {
        addMessage({
            content: (
                <>
                <p>Mari stands up onto the platform in the centre of the arena and calls out to the crowd.</p>
                <p>"Good people!<Pause ms={LONG_PAUSE} /> What do we need a false mayor for?<Pause ms={SHORT_PAUSE * 1.25} /> and why do we need this ledger of his,<Pause ms={SHORT_PAUSE * 0.5} /> marking our names <Pace ms={SLOW_PACE * 0.25}>with debts and with credits?"</Pace></p>
                <Pause ms={SHORT_PAUSE * 1.5} />
                </>
            ),
            performer: performers[PerformerNames.MARI],
        });

        addMessage({
            content: <p>Some in the Agora cheer.<Pause ms={LONG_PAUSE} /> Others seem unsure</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        discussionAboutDebt();
    }

    const discussionAboutDebt = () => {
        addMessage({
            content: <p><Pace ms={SLOW_PACE * 0.25}>"What <em>is</em> in the ledger?"</Pace> Douglas asks</p>,
            performer: performers[PerformerNames.DOUGLAS],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"<b>Debts</b>". She pronounces the word with enunciated distaste.<Pause ms={SHORT_PAUSE * 1.5} /> "Obligations to pay, forced by the state.<Pause ms={SHORT_PAUSE * 1.5} /> You need to find a way to pay them, <Pace ms={SLOW_PACE * 0.3}>and pay them regularly</Pace><Pause ms={SHORT_PAUSE * 0.5} />, and as long as you have them you are not free"</p>,
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Taxes and currency are how we direct ourselves to a common goal!" {PerformerNames.RUPERT} complains<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"The debts are taken from us,<Pause ms={SHORT_PAUSE * 0.4} /> paid to men like <em>him</em>,<Pause ms={SHORT_PAUSE * 0.5} /> as a way to manipulate our activities into funding their enterprise"</p>,
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"<em>My</em> enterprise?!<Pause ms={SHORT_PAUSE} /> I suppose that you'd prefer that <em>you</em> were mayor, then?"<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"By paying eachother using my <em>currency</em>,<Pause ms={SHORT_PAUSE * 0.1} /> you are able to transfer the debt to me.<Pause ms={SHORT_PAUSE} /> Safe in the knowledge that it is <Pace ms={SLOW_PACE * 0.33}><em>guaranteed</em></Pace> by the vitality of my force"<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.RUPERT]
        });

        addMessage({
            content: <Text color={INTUITION_COLOUR}>Burly is radiating pride when Rupert discusses the vitality of his force.</Text>,
            performer: performers[PerformerNames.BURLY],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"In return, you pay me a portion of that debt back each month,<Pause ms={SHORT_PAUSE * 0.2} /> and respect my order"<Pause ms={LONG_PAUSE} /></p>
                <br/>
                <p>"This forms the basis of our <b>social contract</b><Pause ms={SHORT_PAUSE} /><Pace ms={SLOW_PACE * 0.4}>... </Pace>and ensures that we don't descend into chaos"</p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Our debts could be to eachother,<Pause ms={SHORT_PAUSE * 0.1} /> in principle.<Pause ms={SHORT_PAUSE * 0.2} /> To our <Pause ms={SHORT_PAUSE * 0.1} /><em>shared</em> enterprise"<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.MARI],
            getResponses: () => {
                return [
                    {
                        content: (
                            <>
                            <p>"Without a powerful state, it is a war of all against all"<Pause ms={SHORT_PAUSE} /></p>
                            <p>"We are selfish by nature and will not provide for eachother unless we are to gain in doing so"<Pause ms={LONG_PAUSE} /></p>
                            <p>"Friends, <Pace ms={SLOW_PACE * 0.33}>we <em>need</em> a powerful state,</Pace><Pause ms={SHORT_PAUSE} /> to bind us into the common interest<Pause ms={SHORT_PAUSE * 0.5} />, to serve the collective will"</p>
                            </>
                        ),
                        sideEffect: () => {
                            addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, -1));
                            addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.TRUST, 1));
                        },
                        selectFollowup: () => {
                            addMessage({
                                content: <p>"To serve the collective will,<Pause ms={SHORT_PAUSE * 0.5} /> and <em>me</em><Pause ms={SHORT_PAUSE * 0.25} />, its' arbritor!"<Pause ms={SHORT_PAUSE * 0.25} /> Rupert adds eagerly</p>,
                                performer: performers[PerformerNames.RUPERT],
                                includeContinuePrompt: true
                            });

                            debtChallenge();
                        },
                        performer: playerPerformer,
                        includeContinuePrompt: true,
                        shorthandContent: <p>"Without a powerful state, it is a war of all against all"</p>
                    },
                    {
                        content: (
                            <>
                            <p>"We are motivated by <em>care</em>,<Pause ms={SHORT_PAUSE * 0.5} /> we regularly care for eachother beyond our immediate selves.<Pause ms={LONG_PAUSE} /></p>
                            <p>"There are any number of ways that we can pool resources,<Pause ms={SHORT_PAUSE * 0.5} /> and we really only need <b>trust</b> if we have a reason not to trust the other to whom we are <em>giving</em>"</p>
                            </>
                        ),
                        sideEffect: () => {
                            addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, 1));
                            addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.TRUST, -2));
                        },
                        selectFollowup: () => {
                            addMessage({
                                content: <p>"Sedition!"<Pause ms={SHORT_PAUSE * 0.5} /><Pause ms={SHORT_PAUSE * 3} /></p>,
                                performer: performers[PerformerNames.BURLY]
                            });

                            addMessage({
                                content: <p>"I think that we could organise our society to establish trust in giving"<Pause ms={SHORT_PAUSE} /> Mari agrees pensively<Pause ms={SHORT_PAUSE} /></p>,
                                performer: performers[PerformerNames.MARI]
                            });

                            addMessage({
                                content: (
                                    <>
                                    <p><Pace ms={FAST_PACE}>"Sedition!"</Pace><Pause ms={LONG_PAUSE} /></p>
                                    <p>"I will <Pace ms={SLOW_PACE * 0.4}><em>not</em></Pace> let you subvert my sacred right to distribute wealth!"<Pause ms={LONG_PAUSE} /></p>
                                    </>
                                ),
                                performer: performers[PerformerNames.RUPERT],
                                getResponses: () => [
                                    {
                                        content: (
                                            <>
                                            <Text color={INTUITION_COLOUR}><em>You must <Pace ms={SLOW_PACE}>not</Pace> allow them to take your collective property!</em></Text><Pause ms={SHORT_PAUSE} />
                                            <p>A voice calls from deep within you</p><Pause ms={SHORT_PAUSE} />
                                            <p>You know now what you have to do</p><Pause ms={SHORT_PAUSE} />
                                            </>
                                        ),
                                        performer: playerPerformer,
                                        sideEffect: () => {
                                            addRelationship("self", buildRelationshipObject(SelfIdentityLabels.COURAGEOUS, 1));
                                            addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, 1));
                                        },
                                        getResponses: () => [
                                            {
                                                content: (
                                                    <>
                                                    <p>Deep inside the pool of your soul a primordial force of Resistance wants to make itself known<Pause ms={LONG_PAUSE} /></p>
                                                    <p><Pace ms={SLOW_PACE * 0.6}>"NOOOOOOOO!"</Pace> it roars with your voice, <Pace ms={SLOW_PACE * 0.33}>fading softly into silence</Pace></p>
                                                    </>
                                                ),
                                                includeContinuePrompt: true,
                                                performer: playerPerformer,
                                                selectFollowup: () => {
                                                    addMessage({
                                                        content: (
                                                            <>
                                                            <p>"We'll be eating soup of stone,<Pause ms={SHORT_PAUSE * 0.5} /> til what we grow is what we own.."<Pause ms={SHORT_PAUSE} /></p>
                                                            <p>"But we won't steal from the land what's freely given"<Pause ms={SHORT_PAUSE} /></p>
                                                            <p><Pace ms={SLOW_PACE * 0.33}>"Tear up the deeds to the land</Pace><Pause ms={SHORT_PAUSE * 0.25} />, <Pace ms={FAST_PACE * 0.5}>throw the debts into the furnace,</Pace>"<Pause ms={SHORT_PAUSE} /></p>
                                                            <p>"Debts to <Pace ms={SLOW_PACE * 0.4}><em>God</em></Pace> to the <Pace ms={SLOW_PACE * 0.4}><em>banks</em></Pace> and to the <Pace ms={SLOW_PACE * 0.4}><em>landlord</em></Pace>"<Pause ms={SHORT_PAUSE} /></p>
                                                            </>
                                                        ),
                                                        performer: playerPerformer,
                                                        includeContinuePrompt: true
                                                    });

                                                    addMessage({
                                                        content: (
                                                            <>
                                                            <p>"And even if we're just one pistol<Pause ms={SHORT_PAUSE * 0.25} /> against an army of policemen<Pause ms={SHORT_PAUSE * 0.3} />, I <Pace ms={SLOW_PACE * 0.4}><em>insist</em></Pace> that we are many<Pause ms={SHORT_PAUSE * 0.25} /> and they are few"<Pause ms={SHORT_PAUSE} /></p>
                                                            <p>"If we don't stand up now then we might never and we'll never know again our freedom taken"<Pause ms={SHORT_PAUSE} /></p>
                                                            </>
                                                        ),
                                                        performer: playerPerformer,
                                                        includeContinuePrompt: true
                                                    });

                                                    addMessage({
                                                        content: <p>"ENOUGH!" Rupert shouts and puts you off.<Pause ms={SHORT_PAUSE * 0.5} /> Just as you were gearing up for a second verse</p>,
                                                        performer: performers[PerformerNames.RUPERT],
                                                        includeContinuePrompt: true,
                                                        selectFollowup: debtChallenge
                                                    });
                                                },
                                                shorthandContent: <p>Sing!</p>
                                            }
                                        ],
                                        shorthandContent: <p>{PerformerNames.RUPERT} has to be stopped!</p>
                                    },
                                    {
                                        content: <p>...</p>,
                                        performer: playerPerformer,
                                        selectFollowup: debtChallenge,
                                        shorthandContent: <p>Let it go</p>,
                                        includeContinuePrompt: true
                                    }
                                ]
                            })
                        },
                        performer: playerPerformer,
                        includeContinuePrompt: true,
                        shorthandContent: <p>"We do not need a state to establish trust"</p>
                    }
                ]
            }
        });
    }

    const debtChallenge = () => {
        addMessage({
            content: (
                <>
                <p>"You are all already in debt!"<Pause ms={SHORT_PAUSE} /></p>
                <p>"Just because you've <b>forgotten</b> about it, doesn't mean you don't have to pay it!"<Pause ms={SHORT_PAUSE} /></p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Our very existence is a debt to God" a man agrees.<Pause ms={SHORT_PAUSE * 0.5} /> He is dressed in a priest's robe<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.FRANCIS]
        });

        addMessage({
            content: <p>"And it is repaid in service of the Nation"</p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        //TODO: add some choices to debt discussion

        addMessage({
            content: <p>"Look around you. This was built for you by your ancestors. <Pause ms={SHORT_PAUSE} />You repay your debt to them for building this by respecting their traditions"</p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Did our ancestors build this Agora?"<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.DOUGLAS],
            getResponses: rupertConclusion
        })
    }

    const rupertConclusion = (rupertAsked: boolean = false) => {
        let choices = [
            {
                content: (
                    <>
                    <p>You fill your lungs with air and stand straight.</p><Pause ms={SHORT_PAUSE * 0.5} />
                    <Text color={INTUITION_COLOUR}>You are projecting such a lionesque dominance that everyone is watching you, silent.</Text>
                    <Pause ms={LONG_PAUSE} />
                    <p>"My liege, forgive me to be telling you this but you mistake yourself"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Look at the uniform of these men" making eye contact with each citizen in the crowd in turn.</p><Pause ms={SHORT_PAUSE} />
                    <p>"This is not the uniform worthy of a mayor's troop,<Pause ms={SHORT_PAUSE * 0.25} /> NAE!"</p>
                    </>
                ),
                selectFollowup: crownRupertKing,
                performer: playerPerformer,
                includeContinuePrompt: true,
                shorthandContent: <p>Crown {PerformerNames.RUPERT} King</p>
            },
            {
                content: (
                    <>
                    <p>"This man <b>is</b> an impostor! Worse still he is a leech!"</p><Pause ms={SHORT_PAUSE} />
                    <p>"If you ask me then I say we're better off without him!</p>
                    <Pause ms={SHORT_PAUSE * 1.25} />
                    <p>"All power to the People!<Pause ms={SHORT_PAUSE * 0.25} /> All power to the <em>Polis</em>!"</p>
                    </>
                ),
                selectFollowup: exileRupert,
                performer: playerPerformer,
                includeContinuePrompt: true,
                shorthandContent: <p>Banish the impostor</p>
            }
        ];

        if(hasRelationshipStrongerThan(PerformerNames.RUPERT, Relationships.TRUST, 0) && !rupertAsked) {
            choices.push({
                content: (
                    <>
                    <p>"Your Grace" you propose softly<Pause ms={SHORT_PAUSE} />. Your voice is soft and sweet like a song<Pause ms={SHORT_PAUSE} /></p>
                    <p>"Permit us in your wise benevolence<Pause ms={SHORT_PAUSE * 0.5} /> to recommence our discussions under your supervision?"</p>
                    </>
                ),
                includeContinuePrompt: true,
                performer: playerPerformer,
                selectFollowup: () => {
                    if(hasRelationshipWeakerThan(PerformerNames.BURLY, Relationships.TRUST, -1)) {
                        addMessage({
                            content: <Text color={INTUITION_COLOUR}>Burly does not trust you</Text>,
                            performer: performers[PerformerNames.BURLY],
                            includeContinuePrompt: true
                        });
                    }

                    addMessage({
                        content: <p>"I <em>am</em> benevolent"<Pause ms={SHORT_PAUSE} /> Rupert admits, chewing it over slowly</p>,
                        performer: performers[PerformerNames.RUPERT],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>...<Pause ms={LONG_PAUSE} /> "But I will not permit sedition"</p>,
                        performer: performers[PerformerNames.RUPERT],
                        getResponses: () => rupertConclusion(true)
                    });
                },
                shorthandContent: <p>Appeal to the mayor to permit the agora</p>
            });
        }

        return choices
    }

    const crownRupertKing = () => {
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
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"It is God's will that he rule over us.<Pause ms={SHORT_PAUSE} /> When we excercise our activity to his will, we are also exercising our activity to God's will!"</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>{PerformerNames.RUPERT} is grinning very widely</p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <Pace ms={SLOW_PACE * 0.6}><Text>They seem to be buying it!</Text></Pace><Pause ms={SHORT_PAUSE} />
                <Text color="#FFBF00">It must be the sensational <em>authority</em> that you're projecting.</Text>
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true,
            sideEffect: () => {
                addRelationship("self", buildRelationshipObject(SelfIdentityLabels.AUTHORITY, 1));
            }
        });

        addMessage({
            content: <p>The crowd turns in favour, and the dubious claim of Mayor Rupert becomes the <em>truth</em> of King Rupert.</p>,
            performer: playerPerformer,
            includeContinuePrompt: true,
            sideEffect: () => {
                setWorldItem(World.GOVERNANCE, GovernanceStates.MONARCHY);
                addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.TRUST, 10));
                addRelationship(PerformerNames.BURLY, buildRelationshipObject(Relationships.TRUST, 1));
                setWorldItem("name", "Rupertston");
                setWorldItem(World.RULER, PerformerNames.RUPERT);
            }
        });

        addMessage({
            content: <RelationshipIndicator color="#ff5dcb"><p>King {PerformerNames.RUPERT}'s eyes have started to sparkle whenever he looks at you.</p></RelationshipIndicator>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>Mari's face is a picture of her lost utopia.</p><Pause ms={SHORT_PAUSE} />
                <p>"But..."</p><Pause ms={SHORT_PAUSE * 0.5} />
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
            performer: performers[PerformerNames.ALICIA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>The King and his men are gazing at you in stupified admiration.</p><Pause ms={SHORT_PAUSE} />
                <p>"You did good out there, old sport!"</p><Pause ms={SHORT_PAUSE} />
                <p>"Your ambition is remarkable"</p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>He turns to the crowd and hushes them to silence</p><Pause ms={SHORT_PAUSE * 1.5} />
                <p>"In my grace, I will allow this meeting to continue.<Pause ms={SHORT_PAUSE} /> Henceforth my <em>court</em> is in open session!"<Pause ms={SHORT_PAUSE * 1.25} /></p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT]
        });

        addMessage({
            content: <p>"You there, peasant! <Pause ms={SHORT_PAUSE * 0.4} /> Fetch me a throne!"</p>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>Douglas finds a nearby picnic bench and heaves it to the centre of the ampitheatre</p>,
            performer: performers[PerformerNames.DOUGLAS],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>As Rupert takes a seat Burly eagerly bounds over to his side<Pause ms={LONG_PAUSE * 0.8} /></p>,
            performer: performers[PerformerNames.BURLY]
        });

        addMessage({
            content: <p>The new King beckons you to stand on his left<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.RUPERT],
            getResponses: () => {
                return [
                    {
                        performer: playerPerformer,
                        shorthandContent: <p>[Join Rupert loyally]</p>,
                        selectFollowup: () => introduceLeopald(true)
                    },
                    {
                        performer: playerPerformer,
                        shorthandContent: <p>[Join Rupert reluctantly]</p>,
                        sideEffect: () => addRelationship(PerformerNames.BURLY, buildRelationshipObject(Relationships.TRUST, -1)),
                        selectFollowup: () => introduceLeopald(true)
                    }
                ];
            }
        })
    }

    const exileRupert = () => {
        addMessage({
            content: (
                <>
                <p>Just a few at first, then the crowd, chant in unison:</p><Pause ms={SHORT_PAUSE * 0.25} />
                <p>"Long live the Polis!"</p><Pause ms={SHORT_PAUSE * 0.25} />
                <p>"Long live the Polis!"</p><Pause ms={SHORT_PAUSE * 0.25} />
                </>
            ),
            performer: performers[PerformerNames.ZOE]
        });

        addMessage({
            content: <p>"Long live the Polis!"<Pause ms={SHORT_PAUSE * 0.25} /></p>,
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
                <p>The would-be mayor looks around nervously.</p><Pause ms={SHORT_PAUSE * 0.25} />
                <p>Indignant fury crosses his face.</p><Pause ms={SHORT_PAUSE * 0.25} />
                <p>"You <b><em>need</em></b> me"</p><Pause ms={SHORT_PAUSE * 0.25} />
                <p>The crowd does not hear him through the chanting.</p><Pause ms={LONG_PAUSE * 1.5} />
                <p>His protests become increasingly desparate.</p>
                <p>He throws a sharp look to the his lead guard.</p><Pause ms={SHORT_PAUSE * 0.25} />
                <p>"Burly. <Pace ms={SLOW_PACE}><em>Do something</em></Pace>"</p>
                </>
            ),
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Get 'em, men!"</p>
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
                        selectFollowup: () => rupertIsExiled()
                    },
                    {
                        content: <Text>...</Text>,
                        shorthandContent: <Text>[Say Nothing]</Text>,
                        performer: playerPerformer,
                        includeContinuePrompt: true,
                        selectFollowup: () => rupertIsExiled()
                    }
                ]
            },
            sideEffect: () => {
                setWorldItem(World.GOVERNANCE, GovernanceStates.AGORA);
                addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.TRUST, -10));
                addRelationship(PerformerNames.BURLY, buildRelationshipObject(Relationships.TRUST, -10));
                addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.EXILED, 1));
                addRelationship(PerformerNames.BURLY, buildRelationshipObject(Relationships.EXILED, 1));
            }
        });
    }

    const rupertIsExiled = () => {
        addMessage({
            content: (
                <>
                <p>"Yeeeahh!"</p>
                <Text color={INTUITION_COLOUR}>Mari is elated as she watches the exiled pretenders flee.</Text>
                <Pause ms={SHORT_PAUSE} />
                <p>"Long live the Polis!"</p>
                <Pause ms={SHORT_PAUSE} />
                </>
            ),
            performer: performers[PerformerNames.MARI],
        });

        addMessage({
            content: <Text color={INTUITION_COLOUR}>Rupert is looking over his shoulder as he leaves, his face is a picture.</Text>,
            performer: performers[PerformerNames.RUPERT],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"This is such an <Pause ms={SHORT_PAUSE * 0.25} /><em>exhillarating</em> feeling!"</p>
                <Pause ms={SHORT_PAUSE} />
                <p>"There is no burden of power over us, no burden of tradition behind us" she says with a long <Pace ms={SLOW_PACE * 0.75}>sigh.</Pace></p>
                <Pause ms={SHORT_PAUSE * 0.5} />
                <p>"We are held back only by the capabilities of our language and the limits of our abilities"</p>
                <Pause ms={SHORT_PAUSE} />
                <p>"We are the masters of our own destiny"</p>
                </>
            ),
            performer: performers[PerformerNames.MARI],
            sideEffect: () => {
                removeRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, 0));
                addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, 2));
            },
            includeContinuePrompt: true
        });

        if(hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT)) {
            addMessage({
                content: <Text color={INTUITION_COLOUR}>{PerformerNames.MARI} looks to you as an ally</Text>,
                performer: performers[PerformerNames.MARI],
                includeContinuePrompt: true
            })
        }

        introduceLeopald();
    }

    const introduceLeopald = (rupertKing: boolean = false) => {
        if(rupertKing) {
            addMessage({
                content: <p>"My people! Come to me with your problems.<Pause ms={SHORT_PAUSE * 0.8} /> I will rule on them fairly and <b>absolutely</b>!"</p>,
                performer: performers[PerformerNames.RUPERT],
                includeContinuePrompt: true
            });
        }

        let douglasExtraContent = rupertKing ? "We may be the masters of our own destiny." : "You said that we're the masters of our own destiny.";

        addMessage({
            content: (
                <>
                <p>"Are we ready for this?"</p><Pause ms={SHORT_PAUSE} />
                <p>{PerformerNames.DOUGLAS} gestures around him</p><Pause ms={SHORT_PAUSE} />
                <p>"We <Pause ms={SHORT_PAUSE * 0.3} /><Pace ms={FAST_PACE * 0.5}>- our ancestors - </Pace><Pause ms={SHORT_PAUSE * 0.3} />surely built this city,<Pause ms={SHORT_PAUSE * 0.5} /> and we don't even remember <em>how</em> we did it"</p>
                </>
            ),
            performer: performers[PerformerNames.DOUGLAS],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>{douglasExtraContent} <Pause ms={SHORT_PAUSE} /> But how can we ensure that we are not just masters of our own peril<Pace ms={SLOW_PACE}>...</Pace> if not by following from tradition?"</p>,
            performer: performers[PerformerNames.DOUGLAS],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Yes!" a man shouts, all in a rush.</p><Pause ms={SHORT_PAUSE} />
                <p>"These are my concerns exactly"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"My name is <b>Leopald</b>.<Pause ms={SHORT_PAUSE * 0.9} /> I am a general in the {rupertKing ? "Royal" : ""} <em>army</em>"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Here, now, when all this is so fresh, <em>of course</em> we will all co-operate with eachother but<Pace ms={SLOW_PACE}>...</Pace> a week from now? <Pause ms={SHORT_PAUSE} />A month?"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"It's been a meagre <b>{world.daysSinceGreatPop} days</b> since the Big Pop.<Pause ms={LONG_PAUSE} /> I've flicked through some of the <b>history books</b> I found down by the library"</p>
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
                <p>"I've only flicked through and looked at the pictures but<Pace ms={SLOW_PACE}>...</Pace>"</p><Pause ms={SHORT_PAUSE * 0.8} />
                <p>"I saw a lot of pain and suffering.<Pause ms={SHORT_PAUSE * 0.5} /> Soldiers and wars, famines and plagues.<Pause ms={SHORT_PAUSE * 0.5} /> Most of it was <em>man-made</em>"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        if(hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT)) {
            addMessage({
                content: <p>There is a look of deep concern on Douglas' face.<Pause ms={SHORT_PAUSE} /> He is engrossed by the potential lessons of history</p>,
                performer: performers[PerformerNames.DOUGLAS],
                includeContinuePrompt: true
            });
        }

        addMessage({
            content: (
                <>
                <p>"I think that it's clear that we need to establish a strong <b>state apparatus</b> to help ensure that we do not revert into a state of chaos"</p>
                { rupertKing ? <p>"At its' head, of course, our wise King"</p> : null }
                <Pause ms={SHORT_PAUSE} />
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            getResponses: () => respondingToRupertsInitialQuestion()
        });
    }

    const respondingToRupertsInitialQuestion = (failedAnarchyCheck: boolean = false, askedAboutWorldState: boolean = false) => {
        const choices: IMessage[] = [];

        if(!askedAboutWorldState) {
            choices.push({
                performer: playerPerformer,
                content: <p>"Did the Old World have a state apparatus?"</p>,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"I don't recall" Leopald answers evasively.<Pause ms={LONG_PAUSE} /> "But if they did, it certainly wasn't strong enough!"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>"If the Old World needed to use some force to make things fit into a certain way<Pace ms={SLOW_PACE}>...</Pace> maybe it was necessary?" Douglas suggests<Pause ms={SHORT_PAUSE} /></p>
                            {hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT) ? <Text color={INTUITION_COLOUR}>Douglas' words are said through significant discomfort<Pause ms={SHORT_PAUSE} /></Text> : null}
                            </>
                        ),
                        performer: performers[PerformerNames.DOUGLAS],
                        sideEffect: () => {
                            addRelationship(PerformerNames.DOUGLAS, buildRelationshipObject(Relationships.NOSTALGIA, -1));
                        },
                        getResponses: () => respondingToRupertsInitialQuestion(failedAnarchyCheck, true)
                    });
                }
            });
        }

        choices.push({
            content: (
                <>
                <p>"There are a wide variety of <b>dangerous people</b> who would do us harm"<Pause ms={SHORT_PAUSE} /></p>
                <p>"To an extent we are all potentially dangerous.<Pause ms={SHORT_PAUSE} /> The only way to ensure that we are all civil is to coerce us in line"</p>
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true,
            sideEffect: () => addRelationship("self", buildRelationshipObject(Values.ORDER, 1)),
            selectFollowup: () => {
                if(world[World.RULER] == PerformerNames.RUPERT) {
                    addMessage({
                        content: <p>"To maintain the Kings' peace, some force must be necessary" Rupert agrees with a sympathetic tone.</p>,
                        performer: performers[PerformerNames.RUPERT],
                        includeContinuePrompt: true
                    });
                }

                prisonDilemma();
            },
            shorthandContent: <p>"People must be kept in line, for our own protection"</p>,
        }, {
            includeContinuePrompt: true,
            selectFollowup: () => {
                addMessage({
                    content: <p>"This, surely, is the only justification of force" Leopald agrees.<Pause ms={LONG_PAUSE} /></p>,
                    performer: performers[PerformerNames.LEOPALD]
                });

                if(world[World.RULER] == PerformerNames.RUPERT) {
                    addMessage({
                        content: <p>And the essence of a King's divine right<Pause ms={LONG_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD]
                    });
                }

                addMessage({
                    content: <p>"The State has the power to coerce those who will not bend"</p>,
                    performer: performers[PerformerNames.LEOPALD],
                    includeContinuePrompt: true,
                    sideEffect: () => addRelationship("self", buildRelationshipObject(Values.ORDER, 1))
                });

                prisonDilemma();
            },
            shorthandContent: <p>"A state is necessary, but only to ensure that the People's will is carried out"</p>,
            performer: playerPerformer
        });

        if(!failedAnarchyCheck) {
            choices.push({
                selectFollowup: () => {
                    if(world[World.RULER] == PerformerNames.RUPERT) {
                        addMessage({
                            content: (
                                <>
                                <p>Rupert begins to cough uncontrollably.</p><Pause ms={SHORT_PAUSE * 1.5} />
                                <p>"And what about the <Pace ms={SLOW_PACE * 0.4}><em>tyranny</em></Pace> of <b>sedition</b>?!<Pause ms={SHORT_PAUSE * 0.25} /> No. <Pause ms={SHORT_PAUSE * 0.25} />Unacceptable"</p>
                                </>
                            ),
                            performer: performers[PerformerNames.RUPERT],
                            getResponses: () => respondingToRupertsInitialQuestion(true, askedAboutWorldState)
                        })
                    }
                    else {
                        addMessage({
                            content: <p>{PerformerNames.MARI} is nodding in agreement<Pause ms={SHORT_PAUSE} /></p>,
                            performer: performers[PerformerNames.MARI]
                        });

                        addMessage({
                            content: <p>"But there may be times where we <Pace ms={SLOW_PACE * 0.33}><em>have</em></Pace> to use force, to defend our liberty" a man complains</p>,
                            performer: performers[PerformerNames.ANDREW],
                            includeContinuePrompt: true
                        });

                        addMessage({
                            content: <p> "We can always use force later, if we have to.<Pause ms={SHORT_PAUSE} /> But we cannot un-use force" the priest observes<Pause ms={LONG_PAUSE} /></p>,
                            performer: performers[PerformerNames.FRANCIS]
                        });

                        addMessage({
                            content: <p>"We do not need to <b>institutionalise</b> violence" {PerformerNames.MARI} agrees</p>,
                            performer: performers[PerformerNames.MARI],
                            includeContinuePrompt: true
                        });

                        prisonDilemma();
                    }
                },
                shorthandContent: <p>"People must be free from the State's inherent tyranny!"</p>,
                performer: playerPerformer
            });
        }

        if(world[World.RULER] != PerformerNames.RUPERT) {
            choices.push({
                content: (
                    <>
                    <p>"The violence of the State is detestable!"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Since when was <Pace ms={SLOW_PACE * 0.33}><b>organised violence</b></Pace> a part of 'how we want to live together'?"</p>
                    </>
                ),
                includeContinuePrompt: true,
                selectFollowup: () => prisonDilemma(),
                shorthandContent: <p>"The violence of the State is detestable!"</p>,
                performer: playerPerformer
            });
        }

        choices.push({
            content: <></>,
            includeContinuePrompt: true,
            selectFollowup: () => {
                addMessage({
                    content: <p>"Pish!" {PerformerNames.MARI} complains<Pause ms={LONG_PAUSE} /></p>,
                    performer: performers[PerformerNames.MARI]
                });

                if(!askedAboutWorldState) {
                    addMessage({
                        content: <p>"I read up on some history too, and they <Pace ms={SLOW_PACE * 0.33}><em>had</em></Pace> a State apparatus<Pace ms={SLOW_PACE * 1.5}>...</Pace><Pause ms={LONG_PAUSE} /></p>,
                        performer: performers[PerformerNames.MARI]
                    });
                }

                addMessage({
                    content: <p>"Since when was <Pace ms={SLOW_PACE * 0.33}><b>organised violence</b></Pace> a part of 'how we want to live together'?"</p>,
                    performer: performers[PerformerNames.MARI],
                    includeContinuePrompt: true
                });

                prisonDilemma();
            },
            shorthandContent: <p>[Say Nothing]</p>,
            performer: playerPerformer
        });
        
        return choices
    }

    const prisonDilemma = () => {
        if(!hasRelationshipPair("self", Values.ORDER)) {
            addMessage({
                content: <p>"My dear you're being <b>naïve</b>"</p>,
                performer: performers[PerformerNames.LEOPALD],
                includeContinuePrompt: true
            });
        }

        if(hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT)) {
            addMessage({
                content: <p>"It only takes one <b>murderer</b> to spoil a <b>picnic</b>"</p>,
                performer: performers[PerformerNames.LEOPALD],
                includeContinuePrompt: true
            });

            addMessage({
                content: <Text color={INTUITION_COLOUR}>Leopald introduced himself as a <b>general</b>, you recall.<Pause ms={SHORT_PAUSE} /> He is a military man and sees society through a military lens<Pause ms={LONG_PAUSE} /></Text>,
                performer: playerPerformer,
                getResponses: () => murdererQuestion()
            });
        }
        else {
            addMessage({
                content: <p>"It only takes one <b>murderer</b> to spoil a <b>picnic</b>"<Pause ms={LONG_PAUSE} /></p>,
                performer: performers[PerformerNames.LEOPALD],
                getResponses: () => murdererQuestion()
            });
        }
    }

    const murdererQuestion = () => {
        const followup = () => {
            addMessage({
                content: <p>"Which murderers?".<Pause ms={SHORT_PAUSE * 1.5} /> She is evidently frustrated by the hypotheticals at play</p>,
                performer: performers[PerformerNames.MARI],
                includeContinuePrompt: true
            });

            prisonIntroduction();
        }

        return [
            {
                includeContinuePrompt: true,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"And yet it does happen" Leopald refutes<Pause ms={SHORT_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD]
                    });

                    followup();
                },
                shorthandContent: <p>"I do not believe that it's in our nature to kill one another"</p>,
                performer: playerPerformer
            },
            {
                includeContinuePrompt: true,
                selectFollowup: followup,
                shorthandContent: <p>"Should we not try to prevent murder from happening by targetting its' causes?"</p>,
                performer: playerPerformer
            },
            {
                content: <p>"And what would we do with these 'murderers'"?<Pause ms={SHORT_PAUSE * 1.5} /></p>,
                includeContinuePrompt: true,
                selectFollowup: prisonIntroduction,
                shorthandContent: <p>"And what would we do with these 'murderers'"?</p>,
                performer: playerPerformer
            }
        ]
    }

    const prisonIntroduction = () => {
        addMessage({
            content: (
                <>
                <p>"When I woke I was in a collosal building, called <b>'{world.name} Prison'</b>.<Pause ms={SHORT_PAUSE} /></p>
                <p>"Myself and others, we were dressed the same.<Pause ms={SHORT_PAUSE * 0.75} /> We were armed, and <Pace ms={SLOW_PACE * 0.4}>I think</Pace> that our purpose was to keep people locked inside"</p>
                </>  
            ),
            performer: performers[PerformerNames.CRAIG],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"I was a prisoner there"<Pause ms={SHORT_PAUSE} /></p>
                <p>"<em>Human beings</em> locked into tiny cells"<Pause ms={SHORT_PAUSE} /></p>
                <p>"It makes me feel sick"<Pause ms={SHORT_PAUSE * 0.5} /></p>
                </>  
            ),
            performer: performers[PerformerNames.ANDREW],
            getResponses: () => [
                {
                    shorthandContent: <p>"How did you get out?"</p>,
                    performer: playerPerformer,
                    selectFollowup: () => {
                        addMessage({
                            content: <p>"Some of the guards let us out"</p>,
                            performer: performers[PerformerNames.ANDREW],
                            includeContinuePrompt: true
                        });

                        prisonIntroductionPartTwo();
                    }
                },
                {
                    content: <></>,
                    shorthandContent: <p>[Say Nothing]</p>,
                    performer: playerPerformer,
                    selectFollowup: prisonIntroductionPartTwo
                }
            ]
        });
    }

    const prisonIntroductionPartTwo = () => {
        addMessage({
            content: (
                <>
                <p>A look of anger flashes across his face.<Pause ms={SHORT_PAUSE} /></p>
                <p>"<Pace ms={FAST_PACE}>The prisoners were locked away for the good of society!</Pace><Pause ms={SHORT_PAUSE} /> And for their <Pace ms={SLOW_PACE * 0.4}><em>own</em> good</Pace><Pause ms={SHORT_PAUSE * 0.1} />, too.<Pause ms={SHORT_PAUSE} /></p>
                <p>"You should have been confirmed as <b>rehabilitated</b> before you were allowed to rejoin society"</p>
                </>  
            ),
            performer: performers[PerformerNames.CRAIG],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"I don't see how any of that could have been for my own good."<Pause ms={SHORT_PAUSE} /></p>
                <p>"And I'm <em>not</em> going back in there"<Pause ms={SHORT_PAUSE} /></p>
                <Text color={INTUITION_COLOUR}>There is much distress in his voice</Text>
                </>  
            ),
            performer: performers[PerformerNames.ANDREW],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>Many of the Agora members attempt to relieve the tension, and express sympathy with either view.<Pause ms={SHORT_PAUSE * 2} /></p>,
            performer: performers[PerformerNames.NULL_PERFORMER]
        })

        addMessage({
            content: <p>"Perhaps they were not <Pace ms={SLOW_PACE * 0.4}><em>always</em></Pace> right then, clearly.<Pause ms={SHORT_PAUSE} /> But neither surely were they <Pace ms={SLOW_PACE * 0.4}><em>always</em></Pace> wrong?"</p>,
            performer: performers[PerformerNames.LEOPALD],
            getResponses: prisonResolutionChoices
        });
    }

    const prisonResolutionChoices = () => {
        return [
            {
                shorthandContent: <p>"The prison was primarily a tool of oppression"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"Yes.<Pause ms={SHORT_PAUSE * 0.8} /> The <b>old ways</b> are something to be overcome"</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    prisonAbolition();
                },
                sideEffect: () => {
                    addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, 1));
                    addRelationship(PerformerNames.ANDREW, buildRelationshipObject(Relationships.TRUST, 1));
                    addRelationship("self", buildRelationshipObject(SelfIdentityLabels.REVOLUTIONARY, 2));
                    addRelationship(PerformerNames.DOUGLAS, buildRelationshipObject(Relationships.HOPE_SURROGATE, -1));
                    addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.TRUST, -1));
                }
            },
            {
                shorthandContent: <p>"The prison was not necessary, it was cruel"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: <Text color={INTUITION_COLOUR}><em>Andrew visibly appreciates your solidarity</em></Text>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true
                    });

                    prisonAbolition();
                },
                sideEffect: () => {
                    addRelationship(PerformerNames.ANDREW, buildRelationshipObject(Relationships.TRUST, 2));
                    addRelationship("self", buildRelationshipObject(SelfIdentityLabels.REVOLUTIONARY, 1));
                }
            },
            {
                content: (
                    <>
                    <p>"We do not need a prison.<Pause ms={SHORT_PAUSE * 0.5} /> We can resolve conflicts collectively"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Locking someone up only serves to alienate them from society further.<Pause ms={SHORT_PAUSE * 0.5} /> It's sweeping a problem under the rug, instead of dealing with it"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Before we build this kind of system, we should ask ourselves<Pace ms={SLOW_PACE * 0.4}>...</Pace><Pause ms={SHORT_PAUSE * 0.3} /> what do we want it to achieve?"</p>
                    </>
                ),
                shorthandContent: <p>"We do not need a prison. We can resolve conflicts collectively"</p>,
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    addMessage({
                        content: <p>Andrew is the first to make a suggestion.<Pause ms={SHORT_PAUSE * 1.2} /> "It should be <em>restorative</em> as much as possible<Pause ms={SHORT_PAUSE * 0.5} />, focussed on allowing me to repair the relationships I may have damaged"</p>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"It should be focussed on <Pace ms={SLOW_PACE * 0.33}><em>preventing</em></Pace> the behaviour from happening again"</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>Other suggestions are made by many in the discussion</p>,
                        performer: performers[PerformerNames.ALICIA]
                    });

                    addMessage({
                        content: <p>Douglas has started to take notes</p>,
                        performer: performers[PerformerNames.DOUGLAS],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p><Pace ms={SLOW_PACE * 0.4}>"...</Pace>Decisions will be made collectively and based on consent<Pace ms={SLOW_PACE * 0.4}>...</Pace> with a circle being delegated to <em>implement</em> the process."</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });
                    
                    addMessage({
                        content: <p>This is found to be acceptable by the majority of the agora.<Pause ms={SHORT_PAUSE} /> Andrew and several others volunteered to be a part of this circle<Pause ms={SHORT_PAUSE * 0.8} />, their actions under the supervision and authority of the agora as a whole.</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>Leopald is at first adamently opposed to the suggestions<Pace ms={SLOW_PACE * 0.4}>...</Pace> when all of a sudden he is convinced.</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"Yes, yes<Pace ms={SLOW_PACE * 0.4}>...</Pace> I see the value in what you are saying now, {PerformerNames.MARI}"<Pause ms={SHORT_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD]
                    });

                    addMessage({
                        content: <p>"And the body which you are leading, Andrew, will be responsible for establishing our new<Pace ms={SLOW_PACE * 0.4}>...</Pace> <em>egalitarian</em> infrastructure"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"And naturally, of course, another body will be needed to<Pace ms={SLOW_PACE * 0.4}>...</Pace> <em>enforce</em> our new regime"<Pause ms={SHORT_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD]
                    });

                    addMessage({
                        content: <p>"To deal with those who would oppose us.<Pause ms={SHORT_PAUSE} /> To protect ourselves"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    if(world[World.RULER] == PerformerNames.RUPERT) attemptAbolishPrisonRupertKing();
                    else organisedViolenceDilemma();
                },
                sideEffect: () => {
                    setWorldItem(World.PRISON, PrisonStates.RESTORATIVE)
                }
            },
            {
                content: (
                    <>
                    <p>"The old ways were necessarily cruel<Pace ms={SLOW_PACE * 0.4}>...</Pace> or else prison would not have been an effective detterant"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Clearly at least an <em>element</em> of our nature is sinful"</p><Pause ms={SHORT_PAUSE} />
                    <p>"To shape the society that we wish to live in we must punish wrongdoing and reward goodness"</p>
                    </>
                ),
                includeContinuePrompt: true,
                shorthandContent: <p>"We should replace the prison with something more focussed on <em>reform</em>"</p>,
                performer: playerPerformer,
                selectFollowup: () => {
                    addMessage({
                        content: <Text color={INTUITION_COLOUR}>You feel a little tense about your use of the word cruel</Text>,
                        performer: playerPerformer,
                        sideEffect: () => {
                            addRelationship(PerformerNames.ANDREW, buildRelationshipObject(Relationships.TRUST, -1));
                            addRelationship(PerformerNames.LEOPALD, buildRelationshipObject(Relationships.TRUST, 1));
                        },
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"The old society<Pace ms={SLOW_PACE * 0.4}>...</Pace> used to reward goodness?<Pause ms={SHORT_PAUSE} /> Did you see this in the history books, Leopald?<Pause ms={SHORT_PAUSE * 0.6} /> Could you tell use more?"</p>,
                        performer: performers[PerformerNames.DOUGLAS],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"I<Pace ms={SLOW_PACE * 0.4}>...</Pace> er<Pace ms={SLOW_PACE * 0.4}>...</Pace> I don't know if I could say for definite.<Pause ms={SHORT_PAUSE * 0.6} /> As I say, I just skimmed the pages.<Pause ms={SHORT_PAUSE} /> I believe this was always their aim"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true,
                        sideEffect: () => {
                            addRelationship(PerformerNames.DOUGLAS, buildRelationshipObject(Relationships.HOPE_SURROGATE, 1));
                        }
                    });

                    addMessage({
                        content: <p>"You <em>believe?</em><Pause ms={SHORT_PAUSE} /> So you don't know"</p>,
                        performer: performers[PerformerNames.MARI],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: (
                            <>
                            <p>"What else would their aim be?<Pause ms={SHORT_PAUSE * 0.6} /> It's our aim, isn't it?"</p><Pause ms={SHORT_PAUSE} />
                            <Text color={INTUITION_COLOUR}>He seems a little irritated</Text>
                            </>
                        ),
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"I think that the prison might not <Pace ms={SLOW_PACE * 0.33}><em>always</em></Pace> be necessary, perhaps we can use it sparingly"<Pause ms={LONG_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD]
                    });

                    addMessage({
                        content: <p>"But it can be a powerful tool, in order to shape <em>our citizens</em> to be the way we want them to be"<Pause ms={LONG_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"Naturally<Pace ms={SLOW_PACE * 0.4}>...</Pace> it will require enforcement - such that we form a <b>state</b><Pause ms={SHORT_PAUSE} />, capable of pursuing - and protecting - our <b>utopian vision</b>"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    if(world[World.RULER] == PerformerNames.RUPERT) attemptAbolishPrisonRupertKing();
                    else organisedViolenceDilemma();
                },
                sideEffect: () => {
                    setWorldItem(World.PRISON, PrisonStates.REFORM);
                }
            },
            {
                content: <p>"Within each of us is a <b>beast</b>.<Pause ms={LONG_PAUSE} /> We are <b>selfish</b><Pause ms={SHORT_PAUSE * 0.4} />, <b>sinful</b> beings always seeking to maximise our own gain<Pause ms={SHORT_PAUSE * 0.4} />, and we have a great proclivity to violence"</p>,
                shorthandContent: <p>"The prison was absolutely necessary, it is a <em>deterrant</em>"</p>,
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    addMessage({
                        content: <p>"We <em>must</em> use the prison, to ensure <b>order</b>.<Pause ms={SHORT_PAUSE * 0.5} /> Without it would be chaos"</p>,
                        performer: playerPerformer,
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>Leopald is nodding emphatically<Pause ms={LONG_PAUSE} /></p>,
                        performer: performers[PerformerNames.LEOPALD]
                    });

                    addMessage({
                        content: <p>Andrew and Mari are significantly less pleased</p>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true,
                        sideEffect: () => {
                            addRelationship(PerformerNames.ANDREW, buildRelationshipObject(Relationships.TRUST, -1));
                            addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, -3));
                        }
                    });

                    addMessage({
                        content: <p><Pace ms={SLOW_PACE * 0.4}>.....</Pace>Your arguments sway the agora.<Pause ms={SHORT_PAUSE} /> The prison is here to stay!</p>,
                        performer: performers[PerformerNames.ANDREW],
                        includeContinuePrompt: true
                    });

                    addMessage({
                        content: <p>"And this, of course<Pause ms={SHORT_PAUSE * 0.2} />, implies that we must create a <b>strong state</b> capable of maintaining order"</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true,
                        selectFollowup: organisedViolenceDilemma
                    });
                },
                sideEffect: () => {
                    setWorldItem(World.PRISON, PrisonStates.DETERRANT);
                    addRelationship(PerformerNames.LEOPALD, buildRelationshipObject(Relationships.TRUST, 1));
                    addRelationship("self", buildRelationshipObject(Values.ORDER, 2));
                }
            }
        ];
    }

    const prisonAbolition = () => {
        addMessage({
            content: <p>"We should try to resolve all of our issues face-to-face"<Pause ms={LONG_PAUSE} /></p>,
            performer: playerPerformer
        });

        addMessage({
            content: (
                <>
                <p>"We should focus on restorative justice<Pause ms={SHORT_PAUSE * 0.3} />, and on solving the issues which cause transgressions"<Pause ms={LONG_PAUSE * 0.8} /></p>
                <p>"If it comes to it<Pause ms={SHORT_PAUSE * 0.3} />, we can discuss transgressions and punishments collectively to find solutions"</p>
                </>
            ),
            performer: playerPerformer,
            sideEffect: () => {
                addRelationship("self", buildRelationshipObject(SelfIdentityLabels.REVOLUTIONARY, 2));
            },
            includeContinuePrompt: true
        });

        if(world[World.RULER] == PerformerNames.RUPERT) attemptAbolishPrisonRupertKing();
        else prisonAbolitionResolved();
    }

    const attemptAbolishPrisonRupertKing = () => {
        addMessage({
            content: <p>"The prison will <em>not</em> be abolished.<Pause ms={SHORT_PAUSE * 0.5} /> Or reformed, for that matter. Your king has thus spoken"<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.RUPERT],
            getResponses: () => [
                {
                    content: (
                        <>
                        <p>You bow low and make exaggerated apologies for your myopic imprudence.<Pause ms={SHORT_PAUSE} /></p>
                        <p>Rupert appreciates this greatly and he tips his head as a token of his forgiveness.</p>
                        </>
                    ),
                    performer: playerPerformer,
                    shorthandContent: <p>[Accept the King's decision]</p>,
                    sideEffect: () => {
                        //~ rupert_trusting += 1
                        addRelationship(PerformerNames.RUPERT, buildRelationshipObject(Relationships.TRUST, 1));
                        //~ player_loyal_to_rupert = true
                    },
                    selectFollowup: () => {
                        addMessage({
                            content: <p>"My liege" Leopald begins<Pause ms={SHORT_PAUSE * 0.6} />, kneeling and bowing his head in reverance.<Pause ms={SHORT_PAUSE * 1.75} /></p>,
                            performer: performers[PerformerNames.LEOPALD]
                        });

                        addMessage({
                            content: <p><em>He is mimicking my action</em>, you realise</p>,
                            performer: playerPerformer,
                            includeContinuePrompt: true
                        });

                        leopaldImprisonDissidents();
                    }
                },
                //TODO: turning Rupert into a cat? Trying to say no and failing?
            ]
        });
    }

    const prisonAbolitionResolved = () => {
        addMessage({
            content: <p>Leopald eyes each of you coldly<Pause ms={SHORT_PAUSE * 0.3} />, but he does not speak for a long while.<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.LEOPALD]
        });

        addMessage({
            content: <p>The others are anticipating what he might say.</p>,
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true,
            selectFollowup: leopaldInsistsOnStatehood
        });
    }

    const leopaldInsistsOnStatehood = () => {
        addMessage({
            content: <p>"My comrades and peers<Pause ms={SHORT_PAUSE * 0.3} />, I share in your vision of creating a utopian society.<Pause ms={SHORT_PAUSE * 0.4} /> Really I do"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"I felt that a prison apparatus would be necessary it is true<Pause ms={SHORT_PAUSE * 0.5} />, necessary to protect our vision from those who would do it ill"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"But there is a greater threat to us than the sin of individuals<Pace ms={SLOW_PACE * 0.6}>...</Pace> and that is the threat of <b>armed gangs</b>"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"What is the worth of all we will build<Pause ms={SHORT_PAUSE * 0.5} />, if someone decided to <em>take</em> it from us?"<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.LEOPALD]
        });

        addMessage({
            content: <p>"Naturally<Pace ms={SLOW_PACE * 0.4}>...</Pace> - and to protect ourselves<Pause ms={SHORT_PAUSE * 0.5} /> - it is imperative that we form our own armed group<Pause ms={SHORT_PAUSE * 0.5} /> - a <b>state</b><Pause ms={SHORT_PAUSE * 0.3} /> - staffed by our trustworthy Utopianists. <Pause ms={SHORT_PAUSE} />Capable of protecting our vision"</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true,
            sideEffect: () => setWorldItem(World.PRISON, PrisonStates.ABOLISHED),
            selectFollowup: organisedViolenceDilemma
        });
    }

    const leopaldImprisonDissidents = () => {
        
    }

    const organisedViolenceDilemma = () => {
        addMessage({
            content: <p>"What say you?!"<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.LEOPALD],
            getResponses: () => {
                let choices = [];

                console.log("Debugging - here you should be seeing AGORA with the appropriate choice of governance");
                console.log(world[World.GOVERNANCE]);

                if(world[World.GOVERNANCE] == GovernanceStates.AGORA) {
                    choices.push({
                        content: (
                            <>
                            <p>"There are times when violence is necessary<Pause ms={SHORT_PAUSE * 0.7} />, for example in self-defence it is justified"</p>
                            </>
                        ),
                        performer: playerPerformer,
                        shorthandContent: <p>"Violence is justifiable out of necessity, but organised violence would hamper the freedom of our agora"</p>,
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>"But this simple fact does not mean that we will abandon our dreams of a direct democracy without tyranny"<Pause ms={SHORT_PAUSE * 1.5} /></p>
                                    <p>"The agora is the <em>only</em> state apparatus that we need"</p>
                                    </>
                                ),
                                performer: playerPerformer,
                                includeContinuePrompt: true
                            });

                            coupDilemma();
                        }
                    });
                }

                choices.push({
                    sideEffect: () => setWorldItem(World.ARMOURY_DESTROYED, true),
                    shorthandContent: <p>"We must destroy the armoury, lest it become a <b>threat</b> to our nonviolent utopia!"</p>,
                    performer: playerPerformer,
                    selectFollowup: coupDilemma
                });

                choices.push({
                    content: <p>"I believe that Leopald is right in the need of an established state<Pause ms={SHORT_PAUSE * 0.5} />, to protect us from the threat of <b>mob rule</b>"</p>,
                    shorthandContent: <p>Violence is exclusively the right of an estbalished state which will be kept in check by representation</p>,
                    performer: playerPerformer,
                    selectFollowup: () => {
                        
                        addMessage({
                            content: <p>"What makes this 'state' any different from any other armed mob?!"</p>,
                            performer: performers[PerformerNames.MARI],
                            includeContinuePrompt: true,
                            sideEffect: () => addRelationship(PerformerNames.MARI, buildRelationshipObject(Relationships.TRUST, -1))
                        });

                        addMessage({
                            content: <p>"<b>Representation</b>"<Pause ms={LONG_PAUSE} /></p>,
                            performer: playerPerformer
                        });

                        addMessage({
                            content: <p>"The armed group will be <b>organised</b><Pause ms={SHORT_PAUSE * 0.75} />, and structured on discipline and <b>self-restraint</b>.<Pause ms={SHORT_PAUSE} /> We will vote from those among us who will represent us in the leadership positions of this organisation<Pause ms={SHORT_PAUSE} />, and in so doing we'll keep it in check"</p>,
                            performer: playerPerformer,
                            includeContinuePrompt: true
                        });

                        addMessage({
                            content: <p>As the majority think over your proposition<Pause ms={SHORT_PAUSE * 0.75} />, it seems to be becoming popular.</p>,
                            performer: playerPerformer,
                            includeContinuePrompt: true,
                            sideEffect: () => {
                                setWorldItem(World.GOVERNANCE, GovernanceStates.REPRESENTATIVE_DEMOCRACY);
                                setWorldItem(World.RULER, null);
                            }
                        });

                        addMessage({
                            content: <p>It soon surfaces that Leopald in particular is not content.</p>,
                            performer: performers[PerformerNames.LEOPALD],
                            includeContinuePrompt: true
                        });

                        coupDilemma();
                    }
                });

                choices.push({
                    content: (
                        <>
                        <p>"There will be no <b>armed minority</b><Pause ms={SHORT_PAUSE * 0.5} />, because instead we will arm the <b>majority</b>!</p><Pause ms={LONG_PAUSE} />
                        <p>"There will never be another <b>coup</b><Pause ms={SHORT_PAUSE * 0.5} />, because we will always <b>outgun</b> them!"</p>
                        </>
                    ),
                    shorthandContent: <p>"Let us instead empty the armoury to arm the mob!"</p>,
                    performer: playerPerformer,
                    includeContinuePrompt: true,
                    selectFollowup: () => {

                        addMessage({
                            content: <p>"Hurrah!" Andrew cheers<Pause ms={LONG_PAUSE} /></p>,
                            performer: performers[PerformerNames.ANDREW]
                        });
    
                        addMessage({
                            content: <p>"Long live the People! May their aim be ever true!"</p>,
                            performer: performers[PerformerNames.AXEL],
                            includeContinuePrompt: true
                        });

                        addMessage({
                            content: (
                                <>
                                <p>Some it is clear are emphatically in agreement with your aims.</p><Pause ms={LONG_PAUSE} />
                                <p>Most of the others seem less sure<Pause ms={SHORT_PAUSE * 0.5} />, but you are betting that your armed 'mob' will carry enough to carry the day</p>
                                </>
                            ),
                            performer: performers[PerformerNames.ANDREW],
                            includeContinuePrompt: true
                        });

                        coupDilemma();
                    }
                })

                return choices
            }
        });
    }

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
            content: <p>You notice a rustling in the bushes<Pause ms={LONG_PAUSE * 1.5} /></p>,
            performer: performers[PerformerNames.ARSENE]
        });

        addMessage({
            content: (
                <Container color="red">
                    <p>"The utopia we wish to build must be built on virtue <Pace ms={SLOW_PACE * 0.6}><em>and</em></Pace> terror, in equal measure"</p><Pause ms={SHORT_PAUSE} />
                    <p>"Will you stand in our way, and fall by the sword of virtue, or repent,<Pause ms={SHORT_PAUSE * 0.75} /> and live?!"<Pause ms={LONG_PAUSE * 0.5} /></p>
                </Container>
            ),
            performer: performers[PerformerNames.LEOPALD],
            getResponses: () => [
                {
                    content: <p>So then.. you are surrounded<Pause ms={SHORT_PAUSE * 0.75} /></p>,
                    shorthandContent: <p>You believe Leopald has an armed force in waiting</p>,
                    performer: performers[PerformerNames.ARSENE],
                    getResponses: leopaldHasYouSurrounded
                },
                {
                    content: (
                        <>
                        <p>You scoff.<Pause ms={SHORT_PAUSE * 0.5} /> "Oh yeah?!"</p><Pause ms={SHORT_PAUSE} />
                        <p>"I don't believe you could find <Pace ms={SLOW_PACE * 0.4}><b>ONE</b></Pace> fool to follow you Leopald<Pause ms={SHORT_PAUSE * 0.25} />, let alone a dozen!"</p>
                        </>
                    ),
                    shorthandContent: <p>You are sure that Leopald is bluffing</p>,
                    performer: playerPerformer,
                    includeContinuePrompt: true,
                    selectFollowup: () => {
                        addMessage({
                            content: <p>Leopald is looking at you from behind a poker face</p>,
                            performer: performers[PerformerNames.LEOPALD],
                            includeContinuePrompt: true
                        });

                        addMessage({
                            content: <p>"{PerformerNames.ARSENE}". His voice is raised</p>,
                            performer: performers[PerformerNames.LEOPALD],
                            includeContinuePrompt: true
                        });

                        addMessage({
                            content: <p>A man steps out from beyond the bush<Pause ms={SHORT_PAUSE * 0.5} />, he is carrying a carbine rifle.<Pause ms={SHORT_PAUSE} /></p>,
                            performer: performers[PerformerNames.ARSENE]
                        });

                        addMessage({
                            content: <p>You feel a lump in the back of your throat.<Pause ms={LONG_PAUSE} /></p>,
                            performer: playerPerformer,
                            getResponses: () => [{
                                content: <p>"What does <b>one man</b> prove?!<Pause ms={SHORT_PAUSE * 0.75} /> Even with a rifle.<Pause ms={LONG_PAUSE} /> I could take him"</p>,
                                shorthandContent: <p>One man.. well that doesn't prove anything</p>,
                                performer: playerPerformer,
                                includeContinuePrompt: true,
                                selectFollowup: () => {
                                    if(hasRelationshipPair(PerformerNames.BURLY, Relationships.MINION)) {
                                        addMessage({
                                            content: <p>"You could take him boss"</p>,
                                            performer: performers[PerformerNames.BURLY],
                                            includeContinuePrompt: true
                                        });

                                        addMessage({
                                            content: <p>"Yeah<Pause ms={SHORT_PAUSE * 0.5} />, I could take him."</p>,
                                            performer: playerPerformer,
                                            includeContinuePrompt: true
                                        });
                                    }

                                    addMessage({
                                        content: <p>"Would you like to try?" the gruesome looking man asks.<Pause ms={SHORT_PAUSE} /> Something about the way he says it is quite intense</p>,
                                        performer: performers[PerformerNames.ARSENE],
                                        includeContinuePrompt: true
                                    });

                                    playerSilent();
                                }
                            },
                            {
                                content: <Text color={INTUITION_COLOUR}><em>OK, he might be telling the truth</em></Text>,
                                shorthandContent: <p>OK, he might be telling the truth</p>,
                                performer: playerPerformer,
                                getResponses: leopaldHasYouSurrounded
                            }]
                        });
                    }
                }
            ]
        });
    }

    const leopaldHasYouSurrounded = () => {
        let choices: IMessage[] = [
            {
                content: (
                    <>
                    <p>You are willing with great ferocity to speak<Pause ms={SHORT_PAUSE * 0.5} />, the energy builds and builds until finally the words burst from your lips<Pace ms={SLOW_PACE}>...</Pace></p>
                    <p>"Have mercy!"</p>
                    </>
                ),
                shorthandContent: <p>There's only one thing for it (PANIC)</p>,
                performer: playerPerformer,
                sideEffect: () => addRelationship("self", buildRelationshipObject(SelfIdentityLabels.COURAGEOUS, -3)),
                selectFollowup: playerSilent
            }
        ];

        if (hasRelationshipStrongerThan("self", SelfIdentityLabels.COURAGEOUS, 0)) {
            choices.push({
                content: (
                    <>
                    <p><Text color={INTUITION_COLOUR}><em>"I'm not scared!"</em></Text> you tell yourself convincingly.<Pause ms={LONG_PAUSE} /></p>
                    <p>"I'm not scared of you!"</p>
                    </>
                ),
                shorthandContent: <p>You're not scared!</p>,
                performer: playerPerformer,
                includeContinuePrompt: true,
                selectFollowup: () => {
                    addMessage({
                        content: <p>Leopald is looking at you with a sort of gleeful look of a toddler<Pause ms={SHORT_PAUSE * 0.5} />, he is thoroughly enjoying your defiance and it has taken him by surprise</p>,
                        performer: performers[PerformerNames.LEOPALD],
                        includeContinuePrompt: true
                    });

                    playerSilent();
                }
            });
        }

        choices.push({
            shorthandContent: <p>Your face goes a ghostly white. You remain still as stone</p>,
            performer: playerPerformer,
            selectFollowup: playerSilent
        });
        
        choices.push({
            shorthandContent: <p>You remain silent, stoicly</p>,
            performer: playerPerformer,
            sideEffect: () => addRelationship("self", buildRelationshipObject(SelfIdentityLabels.COURAGEOUS, 1)),
            selectFollowup: playerSilent
        });

        return choices;
    }
    
    const playerSilent = () => {
        addMessage({
            content: <p>{PerformerNames.MARI} has turned on her heels and ran away.<Pause ms={SHORT_PAUSE} /> {PerformerNames.LEOPALD} laughs smugly as she runs<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.MARI]
        });

        addMessage({
            content: <p>He licks his lips{hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT) ? <Text color={INTUITION_COLOUR}>He has been eager for this moment<Pause ms={SHORT_PAUSE * 0.6} />, he is revelling in it</Text> : null}</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>{PerformerNames.LEOPALD}'s co-conspirators have begun to step out from the line of bushes.<Pause ms={SHORT_PAUSE} /> You count seven in total<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.ELENI]
        });

        addMessage({
            content: <p><em>A coup, with seven soldiers?!</em> you wonder</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>Leopald glances at you nervously, as if reading your mind</p><Pause ms={SHORT_PAUSE} />
                <p>"There are many more of us!" he announces.<Pause ms={SHORT_PAUSE} /> "Those of you who comply will be amply rewarded.<Pause ms={SHORT_PAUSE} /> Resist and you will be crushed"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>He looks about the faces in the crumbling Agora</p><Pause ms={SHORT_PAUSE} />
                <p>"We will be reinstating the police force<Pause ms={SHORT_PAUSE * 0.5} />, and returning them to their former prestige"</p>
                {hasRelationshipWeakerThan(PerformerNames.DOUGLAS, Relationships.HOPE_SURROGATE, 0) ? <p><Pause ms={SHORT_PAUSE} />"We will be restoring the order and rationality of the <Pace ms={SLOW_PACE * 0.4}><em>Old World</em></Pace>"</p> : null}
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>He turns to face you now.<Pause ms={SHORT_PAUSE} /> "{playerPerformer.name}<Pause ms={SHORT_PAUSE * 0.2} />, you are under arrest<Pause ms={SHORT_PAUSE * 0.2} />, for your crimes against the Big City Republic"</p><Pause ms={SHORT_PAUSE} />
                <p>"Round up the other <b>troublemakers</b> and throw them in the prison" he commands the soldiers</p><Pause ms={SHORT_PAUSE * 1.3} />
                <p>"We'll decide what to do with them later"</p>
                </>
            ),
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>A soldier grabs you by your arm and roughly jerks you in front of him, his rifle to your back.</p>,
            performer: performers[PerformerNames.ARSENE],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>Another ties your wrists together.</p><Pause ms={SHORT_PAUSE} />
                <p>They drive you from the agora and through the park, to the gates.</p><Pause ms={LONG_PAUSE} />
                </>
            ),
            performer: performers[PerformerNames.ELENI]
        });
        
        addMessage({
            content: <p>Andrew is taken prisoner as well<Pause ms={SHORT_PAUSE * 0.5} />, you are dimly aware</p>,
            performer: performers[PerformerNames.ANDREW],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>By the gates there are two more armed guards.<Pause ms={SHORT_PAUSE} /> They watch on nervously as a crowd is gathering outside. {hasRelationshipPair("self", SelfIdentityLabels.HAS_GREENSIGHT) ? <Text color={INTUITION_COLOUR}><Pause ms={LONG_PAUSE} />It seems that word has been spreading</Text> : null }</p>,
            performer: performers[PerformerNames.HEINRICH],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Disperse!" he shouts into a crowd that does not hear him.</p><Pause ms={SHORT_PAUSE * 1.2} />
                <p>"Disperse!"</p>
                </>
            ),
            performer: performers[PerformerNames.ARSENE],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>A troop approaches over the horizon, making a lot of noise.<Pause ms={SHORT_PAUSE * 1.2} /> You cannot see how many there are, maybe three dozen<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.ZOE]
        });

        addMessage({
            content: <p>They are calling people onto the street to join them<Pause ms={SHORT_PAUSE} />, and they're full of energy</p>,
            performer: performers[PerformerNames.ZOE],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>You spot {PerformerNames.MARI} at the head of the crowd.<Pause ms={SHORT_PAUSE} /> <Text color={INTUITION_COLOUR}><em>She must be spreading the word</em></Text><Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.MARI],
            getResponses: () => {
                const callout = <p>"{PerformerNames.MARI}!" you call out, but {PerformerNames.ARSENE} <em>SLAMS</em><Effect fn={() => shakeEffect("shake-hard shake-constant")} /><Pause ms={SHAKE_TIMEOUT * 0.5} /> the butt of his rifle into your stomach and you keel over in pain.</p>

                return [
                    {
                        content: callout,
                        performer: playerPerformer,
                        selectFollowup: battle,
                        shorthandContent: <Text>[Call for help]</Text>
                    },
                    {
                        content: callout,
                        performer: playerPerformer,
                        selectFollowup: battle,
                        shorthandContent: <Text>[Shout a warning]</Text>
                    },
                    {
                        content: <></>,
                        performer: playerPerformer,
                        selectFollowup: battle,
                        shorthandContent: <Text>[Say nothing]</Text>
                    }
                ];
            }
        });
    }

    const battle = () => {
        let mariCallsTo = hasRelationshipStrongerThan(PerformerNames.MARI, Relationships.TRUST, 0) ? playerPerformer.name : PerformerNames.ANDREW;

        addMessage({
            content: <p>"{mariCallsTo}!" she calls, rushing forward to help.<Pause ms={SHORT_PAUSE} /> Where she treads the crowd follows, despite the danger.<Pause ms={SHORT_PAUSE * 0.4} /> {PerformerNames.LEOPALD} and his followers have caught up, rifles pointed into the crowd.</p>,
            performer: performers[PerformerNames.MARI],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>They will not fire. <Pause ms={SHORT_PAUSE * 0.75} />That would be madness.</p>,
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            containerCss: fadeOutTransition(1 + (playerPerformer.name.length * 0.5)),
            content: <p><b>BOOM!</b><Effect fn={() => shakeEffect("shake-horizontal shake-constant")} /><Pause ms={SHORT_PAUSE * 0.33} /> a rifle sounds.<Pause ms={SHORT_PAUSE} /> The echo rings through your body into a terrible abyss.</p>,
            performer: performers[PerformerNames.LEOPALD],
            includeContinuePrompt: true
        });

        addMessage({
            containerCss: fadeInTransition(1 + (playerPerformer.name.length * 0.1)),
            content: (
                <>
                <p>"{playerPerformer.name}?"</p><Pause ms={SHORT_PAUSE * 0.33} />
                <p>"{playerPerformer.name}?"</p><Pause ms={SHORT_PAUSE * 0.33} />
                <p>"Are you alright?"</p>
                <p>You flutter back into consciousness, and the world seems to flutter with you.</p><Pause ms={SHORT_PAUSE * 0.2} />
                <p>Andrew is stood over you. He is holding a rifle.<Pause ms={SHORT_PAUSE * 0.33} /> There is blood across his chest</p>
                </>
            ),
            performer: performers[PerformerNames.ANDREW],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>You look about you, dizzy.<Pause ms={SHORT_PAUSE * 0.2} /> There are bodies strewn everywhere.<Pause ms={SHORT_PAUSE * 0.33} /></p>
                <p>You see Leopalds first, and his guards.</p><Pause ms={SHORT_PAUSE * 0.33} />
                <p>You see other faces, some you recognise dimly, others the faces of complete strangers.</p>
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>You see Mari, her face pale and her eyes icy. The life has left them.<Pause ms={SHORT_PAUSE * 1.75} /></p>,
            performer: performers[PerformerNames.MARI]
        });

        addMessage({
            content: <p>You cannot hear what Andrew is saying.</p>,
            performer: performers[PerformerNames.ANDREW],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>All the death you around you is making a racket, and you are being bounced back and forth.<Pause ms={SHORT_PAUSE} /></p>,
            performer: playerPerformer
        });

        addMessage({
            content: (
                <>
                <p>Someone is helping you to your feet and guiding you away, back to the Agora.<Pause ms={SHORT_PAUSE} /></p>
                <p>The birds are chirping.<Pause ms={SHORT_PAUSE * 0.2} /> It's so peaceful here</p>
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            containerCss: fadeInTransition(1 + (playerPerformer.name.length * 0.3)),
            content: <p>"When you are recovered enough there will be a meeting in the Agora to discuss what happened"</p>,
            performer: performers[PerformerNames.ANDREW],
            includeContinuePrompt: true
        });

        theEnd();
    }

    const theEnd = () => {
        addMessage({
            content: <p>The End</p>,
            performer: performers[PerformerNames.NULL_PERFORMER],
            includeContinuePrompt: true
        });

        setDialogueEnded(true);
    }

    let content = null;

    /*const introText = (
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
    );*/
    const introText = null;

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

        /*switch(world[World.GOVERNANCE]){
            case GovernanceStates.MONARCHY:
                topContent = <p>{PerformerNames.RUPERT} leads his procession out of the park, followed by tens of his newly loyal subjects. Others are wandering around the old arena aimlessly. The agora is dead.</p>;
                break;
            case GovernanceStates.MILITARY_CONSULATE:
                break;
        }*/

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