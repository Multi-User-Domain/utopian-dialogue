import React, { useState, useContext } from "react";
import {
    Button,
    Center,
    Container,
    Text,
    Input
} from "@chakra-ui/react";

import { WindupChildren, Pause, Effect, Pace } from "windups";
import { IStoryFrame } from "../../lib/types";
import InvestigationFrame from "../../lib/investigationFrame";
import GameFeedback from "../../lib/gameFeedback";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE } from "../../lib/constants";
import usePlayer from "../../../hooks/usePlayer";

function PinAttempt({pace, midPause}: {pace: number, midPause: number}) : React.ReactElement {
    const [pinFin, setPinFin] = useState(false);

    return (
        <Container textWeight={pinFin ? "bold" : null} color={pinFin ? "red" : null}>
            <Center>
                <WindupChildren>
                    <Pace ms={pace}><Text>* * <Pause ms={midPause}/>* *</Text></Pace>
                    <Effect fn={() => setPinFin(true)} />
                </WindupChildren>
            </Center>
        </Container>
    );
}

function LibraryCard({callback}: {callback: () => void}) : React.ReactElement {
    const { name, setName } = usePlayer();
    const [ displayContinue, setDisplayContinue ] = useState(true);

    const submit = () => {
        if(name.length == 0) setName("Mysterio");
        setDisplayContinue(false);
    }

    let continueButton = displayContinue ? (
    <Center><Button onClick={() => submit()}>Continue</Button></Center>
    ) : (
        <WindupChildren>
            <p>There is an address, but you recognise none of it. The address ends "BIG CITY", like the library's name.</p>
            <p>You look around. Stretching to the horizon there are buildings, and parks, and high rise flats.</p>
            <p>This must be Big City.</p>
            <p>There is an image. (CHOOSE AN IMAGE)</p>
            <p>You feel your face. It feels like the face in the photo.</p>
            <p>This must be me.</p>
            <Effect fn={() => callback()}></Effect>
        </WindupChildren>
    );

    return (
        <Container>
            <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Text>{name}</Text>
            {continueButton}
        </Container>
    );
}

function WhoAmIOptions({followLink} : IStoryFrame) : React.ReactElement {

    const [walletDone, setWalletDone] = useState(false);

    let continueContent = walletDone ? <Center marginTop="10px"><Button onClick={() => followLink("whereAmI")}>Where Am I?</Button></Center> : null;

    return (
        <Container>
            <InvestigationFrame title="Keys">
                <p>A set of keys and a circular RFID fob attached by a keyring.</p>
                <GameFeedback theme="success" text="Mysterious Keys added to inventory."/>
            </InvestigationFrame>
            <InvestigationFrame title="Mobile Phone">
                <p>You don’t remember the passcode. There is still some battery, around 10%.</p>
                <p>You try some combinations of passcodes, the first things that come to your head.</p>
                
                <Pause ms={SHORT_PAUSE} />
                <PinAttempt pace={SLOW_PACE} midPause={0} />
                <Pause ms={SHORT_PAUSE} />
                <PinAttempt pace={SLOW_PACE*0.5} midPause={SHORT_PAUSE*0.5} />
                <Pause ms={SHORT_PAUSE} />
                <PinAttempt pace={SLOW_PACE*0.75} midPause={0} />
                <Pause ms={SHORT_PAUSE} />
                <PinAttempt pace={SLOW_PACE*0.25} midPause={0} />
                <Pause ms={LONG_PAUSE} />
                <PinAttempt pace={SLOW_PACE*0.25} midPause={0} />
                <Pause ms={SHORT_PAUSE} />
                <p>You give up.</p>
                <Pause ms={SHORT_PAUSE} />
                <p>The device returns to the lock screen. There is a background. TODO</p>
                <GameFeedback theme="success" text="Mobile Phone added to inventory."/>
            </InvestigationFrame>
            <InvestigationFrame title="Wallet">
                <p>The small leather wallet is not designed for storing paper notes but a set of cards.</p>
                <p>There is only one card in the wallet, it reads "Big City Library Card".</p>
                <p>There is a name.</p>
                <LibraryCard callback={() => {setWalletDone(true)}} />
            </InvestigationFrame>
            <InvestigationFrame title="Deck of Cards">
                <p>The deck cover is unmarked. You open the packet.</p>
                <Pause ms={SHORT_PAUSE} />
                <p>It's vaguely like a tarot deck.</p>
                <p>There are many cards, with images and sometimes with text.</p>
                <p>You sense great power in these cards.</p>
                <GameFeedback theme="success" text="Deck of Cards added to inventory." />
            </InvestigationFrame>
            {continueContent}
        </Container>
    );
}

export default function WhoAmIFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <WindupChildren>
            <p>You sit up, your torso is sore.</p>
            <p>Your back muscles complain as you claw your way into a seating position.</p>
            <p>Your mouth is dry.</p>
            <Text fontStyle="italic">How long was I out?</Text>
            <br/>
            <p>You are lying on the grass.</p>
            <p>In your lap there is a set of keys and a mobile phone. Beside you there is a thin leather wallet and a deck of cards.</p>
            <WhoAmIOptions followLink={followLink}/>
        </WindupChildren>
    );
}
