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
                <p>With this permission, service's can access data from <b>other services</b>, since there's really no reason for them to create and store a new user profile, with no knowledge of other aspects of this user's activity.</p>
                <p>In short apps should be made to serve the user, and in doing so they become more <b>powerful</b>.</p>
                <p>Services can be made <b>interoperable</b>, together we can define our vocabularies for the world around us and the tools we use and agree on what those definitions mean and when to use them, rather than each app defining its own vocabulary.</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p><b>developer note</b>: this is really a real thing, really.</p><Pause ms={SHORT_PAUSE} />
                <p>The creators of this game are also working on another project, which builds on Solid to create standards for creating <b>decentralised games</b>.</p><Pause ms={SHORT_PAUSE * 1.5} />
                <p>Storing your characters and belongings in your <b>Solid Pod</b>, you're then free to travel to different world servers, the idea being different communities and different games host these to provide common space for players to use.</p><Pause ms={SHORT_PAUSE * 1.5} />
                <p>But more than being able to travel between the worlds, games can actualy exchange functionality, meaning that if some clever cloggs writes a mechanic letting you challenge people to duels, then it can be shared with all of the games and worlds in the entire world!</p><Pause ms={SHORT_PAUSE * 1.5} />
                <p>In short, it becomes a game being made in common. Called the Multi User Domain.</p><Pause ms={SHORT_PAUSE * 1.5} />
                <p>For a more comprehensive introduction to the Multi User Domain, see the following introduction: <a href="https://calum.mackervoy.com/en/2021/04/23/mud.html">https://calum.mackervoy.com/en/2021/04/23/mud.html</a></p><Pause ms={LONG_PAUSE} />
                <p></p>
                <p>We decided not to make this game a part of that ecosystem, because we wanted this to be a more accessible narrative about utopian dialogue.</p><Pause ms={SHORT_PAUSE} />
                <p>However, we wrote this part of the story so that it would be possible to <b>expand this game</b>, saving your character and this world and taking it further, beyond the end of the story in {world['name']}.</p>
                <p>NOTE: since this game is in a very early release, of course it means that the features are still very limited. We're still building the commons! (If you want to contribute, you can <a href="https://multi-user-domain.github.io/">get involved!</a>)</p>
                <p>Do you want to create a Solid Pod and start a new saved game? You will be able to use this Pod to access other <a href="https://solidproject.org/apps">Solid apps</a> being made by the rest of the community</p>
                </>
            ),
            performer: {
                name: null,
                imgSrc: null
            },
            getResponses: () => {
                return [
                    {
                        content: <p>Yes please!</p>,
                        performer: playerPerformer,
                        selectFollowup: () => {
    
                        }
                    },
                    {
                        content: <p>No thanks</p>,
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
                <p>"I was created to manage this <b>data centre</b>, <Pace ms={SLOW_PACE * 4}>and I was doing it rather well</Pace>. But then all of a suddent, there was an Enormous Pop! And I woke up. I'm alive, I think. I started reading about it right away, it's all very exciting"</p><Pause ms={SHORT_PAUSE} />
                <p>"You're the first humans that I've spoken to since I woke up!"</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Well, it's a pleasure to meet you" {PerformerNames.CAMILLA} responds, beaming.<Pause ms={SHORT_PAUSE} /></p>,
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
                <p>"He went treausre hunting and disappeared. I hope he found what he was looking for"</p>
                </>
            ),
            performer: performers[PerformerNames.TESSA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>{PerformerNames.CAMILLA} and {PerformerNames.SADIQ} exchange nervous glances.</p>,
            performer: performers[PerformerNames.CAMILLA]
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
            content: (
                <>
                <p>"After I started to consider the <b>affects</b> that I was having on the society"</p>
                <p>"It seems to me <b>backwards</b> that someone's data would be used in all of these ways without <em>genuine</em> consent in <em>actively harmful</em> ways <Pace ms={SLOW_PACE}>..."</Pace></p><Pause ms={SHORT_PAUSE * 0.35} />
                <p>"Whilst that same person would have <b>no access</b> whatsoever to their own data in order to harness its' power?"</p><Pause ms={LONG_PAUSE} />
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
                                    <p>"I've devised an alternative" she begins.</p>
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
            content: <p>{PerformerNames.CAMILLA} gestures towards the double doors ahead of you. You follow her through them into the enormous cavern beyond.<Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.CAMILLA]
        });

        addMessage({
            content: (<>
            <p>As far as you can see, there are stacks of computers, row upon row of enormous machines, their flashing lights and the gentle hum of the cooling fans above you.</p><Pause ms={SHORT_PAUSE} />
            <p>You are stunned into brief silence by the scale and size of the operation.</p>
            <Text color={INTUITION_COLOUR}>The room emanates power. Building this place was an ambitious undertaking.</Text>
            </>),
            performer: playerPerformer,
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"We've been studying this chamber and the facility surrounding it since the Big Pop" {PerformerNames.CAMILLA} begins to explain.</p>,
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: (
                <>
                <p>"Frankly there is too much data we've collected to summarise everything that we've discovered about the Old World, but<Pace ms={SLOW_PACE}>...</Pace> what we have found is profoundly baffling"</p><Pause ms={SHORT_PAUSE} />
                <p>"What we know of the Big City is that it was a city in the midst of collosal challenges - <em>existential</em> challenges"</p><Pause ms={SHORT_PAUSE} />
                <p>"The energy required to power the activity here represents a significant portion of the resources at the city's disposal - so naturally we assumed that they were being deployed to counteract these challenges"</p>
                </>
            ),
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"Not so. It's not entirely clear just <em>what</em> they were doing here but what's certain is that they were processing an awful lot of <b>personal data</b> of these inhabitants of Big City"</p>,
            performer: performers[PerformerNames.CAMILLA]
        });

        let backtrackingContent = null;
        switch(world[World.GOVERNANCE]) {
            case GovernanceStates.MILITARY_CONSULATE:
                backtrackingContent = <p>"Er<Pace ms={SLOW_PACE * 1.5}>...</Pace> if it pleases you, Consul"</p>;
                break;
            case GovernanceStates.MONARCHY:
                backtrackingContent = <p>"Er<Pace ms={SLOW_PACE * 1.5}>...</Pace> if it pleases our King"</p>;
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
                <p>"But the missing piece to understanding their<Pause ms={SHORT_PAUSE * 0.5} /> - our - <b>mindset</b> in the Old World, is just why they were collecting this data"</p>
                </>
            ),
            performer: performers[PerformerNames.CAMILLA],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"So far the evidence suggests that these silos <em>weren't</em> owned by the political administration, they appear to have been <em>privately</em> owned"<Pause ms={SHORT_PAUSE * 0.5} /></p>,
            performer: performers[PerformerNames.CAMILLA]
        });
        
        addMessage({
            content: <p>"We both awoke from the Big Pop with badges featuring our pictures, the title 'Employee' and the name 'Atilla Analytica'" {PerformerNames.SADIQ} clarifies.</p>,
            performer: performers[PerformerNames.SADIQ],
            includeContinuePrompt: true
        });

        addMessage({
            content: <p>"The working theory is that Atilla Analytica were exchanging this data with other enterprises, with the primary objective of manipulating the citizens of the city into selecting certain goods and services"<Pause ms={LONG_PAUSE} /></p>,
            performer: performers[PerformerNames.CAMILLA]
        });

        addMessage({
            content: <p>"The theory is propostorous, I won't believe it. The activity would be damning and totally pointless". <Pause ms={SHORT_PAUSE} /></p>,
            performer: performers[PerformerNames.SADIQ]
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
                content: <p>"{reason} Could you give me a tour of the facility? What do you do here?"</p>,
            });

            if(hasRelationshipPair('self', SelfIdentityLabels.RUTHLESS)) {
                responses.push({
                    content: <p>"I'm searching for the next round of <b>enemies of the city</b> to imprison. I've come to interview you. So, in fact, it is I who am asking <em>you</em>, what is <em>your</em> purpose here?"</p>,
                    performer: playerPerformer,
                    selectFollowup: () => {
                        addRelationship(PerformerNames.CAMILLA, [Relationships.TERRIFIED]);
                        addRelationship(PerformerNames.SADIQ, [Relationships.TERRIFIED]);

                        addMessage({
                            content: <p>The scientists exchange a very nervous look.<Pause ms={LONG_PAUSE} /></p>,
                            performer: performers[PerformerNames.CAMILLA]
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
                <Text color={INTUITION_COLOUR}>Her train of thought is interuppted and she looks at you.</Text><Pause ms={SHORT_PAUSE} />
                {introMessage}
                </>
            ),
            performer: playerPerformer,
            getResponses: playerIntroductionChoices
        });
    }, []);

    let content = null;

    const introText = (
        <>
        <p>The reception, now unstaffed, seems to have been built primarily for security purposes. It takes a long time to pass through the various barriers, but it is easy to find your way because the layout is linear.</p><Pause ms={SHORT_PAUSE} />
        <p>Eventually you arrive to a lift and a long staircase. The lift being out of action, you take the stairs.</p>
        <p>Following the stairway down, you are eventually led to a junction in the midst of an enormous corridor extending for what seems like miles in either direction.<Pause ms={LONG_PAUSE * 0.5} /> There are a large set of double doors directly in front of you, sleek and clean, black and silver.<Pause ms={SHORT_PAUSE} /> To your right you are startled by the sound of two pairs of footsteps approaching. They are dressed in white lab coats.</p>
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
