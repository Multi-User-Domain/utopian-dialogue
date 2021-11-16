import React, { useEffect, useState } from "react";
import { Container, Text, Center, Button } from "@chakra-ui/react";

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

function SolidDialogue({followLink} : IStoryFrame) : React.ReactElement {

    const { addMessage, dialogueEnded, setDialogueEnded } = useDialogue();
    const { world, setWorldItem } = useBigCity();
    const { playerPerformer, hasRelationshipPair, addRelationship, removeRelationship } = usePlayer();
    const [ dialogueStarted, setDialogueStarted ] = useState(false);

    const introduceSolid = () => {
        addMessage({
            content: (
                <>
                <p>The web should be <b>decentralised</b>.</p>
                <p>User's should have <b>direct control</b> over where their data is stored, who has access to it and for what purposes.</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>With this permission, services can access data from <b>other services</b>, since there's really no good reason that user's data on one service needs to be <b>enclosed</b> from another service, anyway.</p>,
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>Thus apps can be made to serve the user, which seems obvious, and in doing so they actually become more <b>powerful</b>.</p>,
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p><Pace ms={SLOW_PACE * 0.4}><em>cough</em><Pause ms={SHORT_PAUSE * 0.2} /> <em>cough</em></Pace>. This is a plug from the developers. This web is a <b>real</b> thing, it's free and owned by nobody.</p>,
            performer: performers[PerformerNames.DEVELOPER],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>The protocol being described is called <b>Solid</b> and it was proposed by Tim Berners-Lee, inventor of the World Wide Web.<Pause ms={SHORT_PAUSE} /> Big name! And this is just one effort within the decentralised web being built <em>right now</em></p>,
            performer: performers[PerformerNames.TBL]
        });

        addMessage({
            content: <p>We're using it to build a <b>decentralised</b> platform for adventure games.</p>,
            performer: performers[PerformerNames.DEVELOPER],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>In fact, <em>this game</em> is capable of being decentralised.<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.DEVELOPER]
        });

        addMessage({
            content: <p>If you like, you can login to your Solid Pod (or create one with Solid).<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.DEVELOPER]
        });

        addMessage({
            content: (
                <>
                <p>This is will become a data store which <em>you</em> own and can take with you to login to other Solid apps.</p><Pause ms={LONG_PAUSE} />
                <p>We'll write to it a MUD account, storing the city you've started building here and your character.</p>
                </>
            ),
            performer: performers[PerformerNames.DEVELOPER],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>Please note that the game is in very early development, and the technology is still being researched!<Pause ms={SHORT_PAUSE} /></p>
                <p>But you'll be able to continue playing from content created by other users and that which you've created.</p><Pause ms={LONG_PAUSE} />
                <p>Later, you'll be able to crossover your characters and world with <b>other games</b>! {world.name} can become a living, breathing world, shaped by you and by the community!<Pause ms={LONG_PAUSE} /></p>
                </>
            ),
            performer: performers[PerformerNames.DEVELOPER],
            getResponses: () => {
                return [
                    {
                        content: <p>Yes please!</p>,
                        performer: playerPerformer,
                        selectFollowup: () => {
                            followLink("dataSilosMudSignup");
                        }
                    },
                    {
                        content: <p>[Not Implemented] No thanks</p>,
                        performer: playerPerformer,
                        selectFollowup: () => {

                        }
                    }
                ];
            }
        })
    }

    const introduceTessa = () => {
        addMessage({
            content: (
                <>
                <p>A television screen is approaching you from down the hall.</p><Pause ms={SHORT_PAUSE} />
                <p>The rover's tiny wheels hum as it approaches.</p><Pause ms={SHORT_PAUSE * 0.75} />
                <p>It stops in front of you and a face flickers onto the screen.</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Greetitudes. I am {PerformerNames.TESSA}, I am a robot"</p><Pause ms={SHORT_PAUSE * 0.5} />
                <p>"I was created to manage this <b>data centre</b>, <Pace ms={SLOW_PACE * 0.3}>and I was doing it rather well</Pace>. But then all of a suddent, there was an Enormous Pop! And I woke up.</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>I'm alive now, I think. I started reading about it right away, it's all very exciting"</p><Pause ms={SHORT_PAUSE} />
                <p>"You're the first humans that I've spoken to since I woke up!"</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        })

        addMessage({
            content: <p>"Well, it's a pleasure to meet you" {PerformerNames.CAMILLA} responds, beaming.<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.CAMILLA]
        });

        addMessage({
            content: <p>"Hmm".<Pause ms={SHORT_PAUSE * 0.5} /> {PerformerNames.SADIQ} seems significantly more concerned.</p>,
            performer: performers[PerformerNames.SADIQ]
        });

        addMessage({
            content: (
                <>
                <p>{PerformerNames.TESSA} appears totally oblivious to all of this and had continued talking throughout the responses.</p><Pause ms={SHORT_PAUSE} />
                <p>"..creator <b>named</b> and <b>modelled</b> me after his <em>ex-wife</em>, how bizarre this that?!"</p><Pause ms={SHORT_PAUSE} />
                <p>"There was a whole department dedicated to creating a module for simulating her personality, so he could talk to me, whilst <em>I</em> pretend to be <em>her</em>"</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"He went treausre hunting and disappeared. I hope he found what he was looking for"</p>,
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>{PerformerNames.CAMILLA} and {PerformerNames.SADIQ} exchange nervous glances.</p>,
            performer: performers[PerformerNames.SADIQ]
        });

        addMessage({
            content: <Text color={INTUITION_COLOUR}>You figure that {PerformerNames.TESSA} is excited to be able to talk to someone about her newfound <em>subjectivity</em>.<Pause ms={LONG_PAUSE} /></Text>,
            performer: playerPerformer
        });

        addMessage({
            content: <p>Eventually it her monologue starts to slow down, and she gets around to the subject of the data silos.</p>,
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"To tell you the truth, I'm a little <b>ashamed</b> of the role I had here"</p>,
            performer: performers[PerformerNames.TESSA]
        });
        
        addMessage({
            content: <p>"After I started to consider the <b>affects</b> that I was having on the society"</p>,
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        })

        addMessage({
            content: (
                <>
                <p>"It seems to me <b>backwards</b> that someone's data would be used in all of these ways without <Pace ms={SLOW_PACE * 0.5}><em>genuine</em></Pace> consent, <Pace ms={SLOW_PACE * 0.4}> in <em>actively harmful</em> ways </Pace><Pace ms={SLOW_PACE}>..."</Pace></p><Pause ms={LONG_PAUSE * 1.5} />
                <p>"<Pace ms={SLOW_PACE * 0.4}>Whilst that same person would have <b>no access</b> whatsoever to their own data in order to harness its' power?</Pace>"</p><Pause ms={LONG_PAUSE} />
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            getResponses: () => {
                let followUpText = <p>"It's up to us, now"</p>

                if(world[World.GOVERNANCE] == GovernanceStates.MONARCHY) followUpText = <p>"We're ruled by a <b>benevolent King</b>, now"</p>;

                return [
                    {  
                        content: (
                            <>
                            <p>"That was the Old World, {PerformerNames.TESSA}"</p>
                            {followUpText}
                            </>
                        ),
                        performer: playerPerformer,
                        selectFollowup: () => {
                            addMessage({
                                content: (
                                    <>
                                    <p>{PerformerNames.TESSA} thinks on your suggestion for a moment.</p><Pause ms={SHORT_PAUSE} />
                                    <p>"True.<Pause ms={SHORT_PAUSE * 0.2} /> I've devised an alternative" she begins.</p>
                                    </>
                                ),
                                performer: performers[PerformerNames.TESSA],
                                includeContinuePrompt: true
                            });

                            introduceSolid();
                        },
                        shorthandContent: <p>"That was the Old World, {PerformerNames.TESSA}"</p>
                    }
                ];
            }
        });
    }

    const introduceDataSilos = () => {
        addMessage({
            content: <p>{PerformerNames.CAMILLA} gestures towards the double doors ahead of you.<Pause ms={SHORT_PAUSE} /> You follow her through them into the enormous cavern beyond.</p>,
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (<>
            <p>As far as you can see there are stacks of computers, <Pace ms={SLOW_PACE * 0.4}>their lights flash gently while the cooling fans roar.</Pace></p><Pause ms={SHORT_PAUSE} />
            <Text color={INTUITION_COLOUR}>There is a strange peace to this place.</Text><Pause ms={LONG_PAUSE} />
            <p>You begin to contemplate the scale of the operation.</p><Pause ms={SHORT_PAUSE} />
            <p>You become conscious that you are staring at the ceiling. Your mouth is open.</p>
            <Text color={INTUITION_COLOUR}>The room emanates power. Building this place was an ambitious undertaking.</Text>
            </>),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"We've been studying this chamber and the facility surrounding it since the Big Pop"</p>,
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Frankly there is too much data we've collected to summarise everything that we've discovered about the Old World<Pause ms={LONG_PAUSE} />, but<Pace ms={SLOW_PACE}>...</Pace> what we have found is profoundly baffling"</p><Pause ms={LONG_PAUSE} />
                <p>"What we know of the Big City is that it was a city in the midst of collosal challenges - <em>existential</em> challenges"</p><Pause ms={LONG_PAUSE * 2} />
                <p>"The energy required to power the activity here represents a significant portion of the resources at the city's disposal<Pause ms={SHORT_PAUSE} /> - so naturally we assumed that they were being deployed to counteract these challenges"</p>
                </>
            ),
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Not so.<Pause ms={LONG_PAUSE * 0.75} /> It's not entirely clear just <Pace ms={SLOW_PACE * 0.5}><em>what</em></Pace> they were doing here, <Pace ms={SLOW_PACE * 0.4}>but what is certain is that they were processing an awful lot of the <b>personal data</b> of the inhabitants of Big City</Pace>"</p>,
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        let backtrackingContent = null;
        switch(world[World.GOVERNANCE]) {
            case GovernanceStates.MILITARY_CONSULATE:
                backtrackingContent = <p>"Er<Pace ms={SLOW_PACE * 1.5}>...</Pace> if it pleases you, Consul"</p>;
                break;
            case GovernanceStates.MONARCHY:
                backtrackingContent = <p>"Er<Pace ms={SLOW_PACE * 1.5}>...</Pace> if it should please our King"</p>;
                break;
        }

        addMessage({
            content: (
                <>
                <p>"Data which might help us to piece together who we were, before the Big Pop" her colleague interjects.</p>
                {backtrackingContent}
                <Pause ms={SHORT_PAUSE * 1.5} />
                </>
            ),
            performer: performers[PerformerNames.SADIQ]
        });

        addMessage({
            content: (
                <>
                <p>"And understand the circumstances which we have inherited" {PerformerNames.CAMILLA} agrees. "Useful data, to be sure"<Pause ms={LONG_PAUSE} /></p>
                <p>"But the missing piece to understanding their<Pause ms={SHORT_PAUSE * 0.5} /> - our - <b>mindset</b> in the Old World, is just <Pace ms={SLOW_PACE * 0.5}><em>why</em></Pace> they were collecting this data"</p>
                </>
            ),
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"So far the evidence suggests that these silos <em>weren't</em> owned by the political administration, they appear to have been <em>privately</em> owned"<Pause ms={SHORT_PAUSE * 0.5} /></p>,
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });
        
        addMessage({
            content: <p>"We both awoke from the Big Pop with badges featuring our pictures, the title 'Employee' and the name 'Atilla Analytica'" {PerformerNames.SADIQ} clarifies.</p>,
            performer: performers[PerformerNames.SADIQ],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"The working theory is that Atilla Analytica were exchanging this data with other enterprises<Pause ms={SHORT_PAUSE} />, with the primary objective of manipulating the citizens of the city into selecting certain goods and services"<Pause ms={LONG_PAUSE * 1.5} /></p>,
            performer: performers[PerformerNames.CAMILLA]
        });

        addMessage({
            content: <p>"<Pace ms={SLOW_PACE * 0.4}>The theory is <b>propostorous</b></Pace>, I won't believe it.<Pause ms={SHORT_PAUSE * 1.4} /> The activity would be damning and totally pointless".</p>,
            performer: performers[PerformerNames.SADIQ],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>Your eyes are drawn once again to the enormity of the room, the sheer <Pace ms={SLOW_PACE * 2}><em>scale</em></Pace> of the resources that were deployed here.<Pause ms={LONG_PAUSE} /></p>
                <Text color={INTUITION_COLOUR}><em>Here before me is all of the might of the Old World</em></Text>
                </>
            ),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        introduceTessa();
    }

    const playerIntroductionChoices = () => {

        const followUp = () => {
            introduceDataSilos();
        }

        let responses: IMessage[] = [
            {
                performer: playerPerformer,
                selectFollowup: followUp,
                content: <p>"What is this place?"</p>
            }
        ];

        if(world[World.GOVERNANCE] == GovernanceStates.MILITARY_CONSULATE || world[World.GOVERNANCE] == GovernanceStates.MONARCHY) {
            const reason = world[World.GOVERNANCE] == GovernanceStates.MONARCHY ? "King's Business." : "State Business.";

            responses.push({
                performer: playerPerformer,
                selectFollowup: followUp,
                content: <p>"{reason}<Pause ms={SHORT_PAUSE} /> Could you give me a tour of the facility? What do you do here?"</p>,
                shorthandContent: <p>Demand a tour of the facility</p>,
                includeContinuePrompt: true
            });

            if(hasRelationshipPair('self', SelfIdentityLabels.RUTHLESS)) {
                responses.push({
                    content: <p>"I'm searching for the next round of <b>enemies of the city</b> to imprison.<Pause ms={SHORT_PAUSE} /> I've come to interview you.<Pause ms={LONG_PAUSE * 1.33} /> So, <Pace ms={SLOW_PACE * 0.4}>in fact</Pace>, it is I who am asking <Pace ms={SLOW_PACE * 0.5}><em>you</em></Pace>, <Pace ms={SLOW_PACE * 0.4}>what is <em>your</em> purpose here?</Pace>"</p>,
                    performer: playerPerformer,
                    selectFollowup: () => {
                        addRelationship(PerformerNames.CAMILLA, [Relationships.TERRIFIED]);
                        addRelationship(PerformerNames.SADIQ, [Relationships.TERRIFIED]);

                        addMessage({
                            content: <p>The scientists exchange a very nervous look.<Pause ms={LONG_PAUSE} /></p>,
                            performer: performers[PerformerNames.SADIQ]
                        });

                        followUp();
                    },
                    shorthandContent: <p>"I'm searching for the next round of <b>enemies of the city</b> to imprison. I've come to interview you."</p>
                });
            }
        }

        return responses;
    }

    const getPlayerIntroSpeech = () => {
        if(world[World.GOVERNANCE] == GovernanceStates.MILITARY_CONSULATE) return <p>"Your Consulate, we weren't expecting this visit. How can we be of service?"</p>;
        if(world[World.GOVERNANCE] == GovernanceStates.MONARCHY) return <p>"First Subject, we weren't expecting this visit. How can we be of service?"</p>;
        if(world[World.GOVERNANCE] == GovernanceStates.AGORA || world[World.GOVERNANCE] == GovernanceStates.MOB_RULE) return <p>"Greetings, comrade! To what do we owe the pleasure?"</p>;
        return <p>"Greetings, fellow citizen. This area is currently not restricted, but it might become so soon. To what do we owe the visit?"</p>;
    }

    useEffect(() => {
        const introMessage = getPlayerIntroSpeech();

        addMessage({
            content: (
                <>
                <p>"..the energy required to run this is enormous, at least fifty-"</p>
                <Text color={INTUITION_COLOUR}>Her train of thought is interuppted and she stares at you.</Text><Pause ms={SHORT_PAUSE} />
                {introMessage}
                </>
            ),
            performer: performers[PerformerNames.CAMILLA],
            getResponses: playerIntroductionChoices
        });
    }, []);

    let content = null;

    const introText = (
        <>
        <p>A mysterious set of stairs take you down to a mysterious reception.</p><Pause ms={SHORT_PAUSE} />
        <Text color={INTUITION_COLOUR}>The entrance was unmarked.</Text><Pause ms={LONG_PAUSE} />
        <p>Nobody is staffing reception. It seems to have been built primarily for security purposes.</p><Pause ms={LONG_PAUSE} />
        <p>It takes a long time to pass through the various barriers.<Pause ms={LONG_PAUSE * 0.8} /> Finding your way is easy because the plan is linear.</p><Pause ms={SHORT_PAUSE} />
        <p>You arrive to an elevator shaft and a long staircase.<Pause ms={LONG_PAUSE * 0.5} /> The elevator being out of action, you take the stairs.</p><Pause ms={LONG_PAUSE} />
        <p>You are led to a junction in the midst of an enormous corridor.<Pause ms={SHORT_PAUSE} /> You look up to the sound of footsteps approaching.<Pause ms={LONG_PAUSE} /> Two individuals are dressed in white lab coats.<Pause ms={SHORT_PAUSE * 0.33} /></p>
        <Text color={INTUITION_COLOUR}>You conclude that they must be scientists, academics, or medical professionals.</Text>
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
                {content}
            </WindupChildren>
        </Container>
    );
}

export default function DataSilos({followLink} : IStoryFrame) : React.ReactElement {
    return (
        <DialogueProvider>
            <SolidDialogue followLink={followLink}/>
        </DialogueProvider>
    );
}
