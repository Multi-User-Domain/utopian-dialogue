import React, { useState, useContext } from "react";
import {
    Button,
    Center,
    Container,
    Text,
    Input,
    Image
} from "@chakra-ui/react";

import { WindupChildren, Pause, Effect, Pace } from "windups";
import { IStoryFrame } from "../../lib/types";
import InvestigationFrame from "../../lib/investigationFrame";
import GameFeedback from "../../lib/gameFeedback";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE } from "../../lib/constants";
import usePlayer from "../../../hooks/usePlayer";
import GridSelect from "../../lib/gridSelect";

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
    const { playerPerformer, setName, setImage } = usePlayer();
    const [ nameInput, setNameInput ] = useState("");
    const [ displayContinue, setDisplayContinue ] = useState([true, true]);

    const faceChoices = [
        {imgSrc: "../../../public/img/playerProfile/3.webp"},
        {imgSrc: "../../../public/img/playerProfile/4.webp"},
        {imgSrc: "../../../public/img/playerProfile/5.webp"},
        {imgSrc: "../../../public/img/playerProfile/6.webp"},
        {imgSrc: "../../../public/img/playerProfile/7.webp"},
        {imgSrc: "../../../public/img/playerProfile/8.webp"},
        {imgSrc: "../../../public/img/playerProfile/9.webp"},
        {imgSrc: "../../../public/img/playerProfile/10.webp"},
        {imgSrc: "../../../public/img/playerProfile/11.webp"},
        {imgSrc: "../../../public/img/playerProfile/12.webp"},
        {imgSrc: "../../../public/img/playerProfile/13.webp"},
        {imgSrc: "../../../public/img/playerProfile/14.webp"},
        {imgSrc: "../../../public/img/playerProfile/15.webp"},
        {imgSrc: "../../../public/img/playerProfile/16.webp"},
        {imgSrc: "../../../public/img/playerProfile/17.webp"},
        {imgSrc: "../../../public/img/playerProfile/18.webp"},
    ];

    const submitName = () => {
        if(playerPerformer.name.length == 0) setName("Mysterious");
        setDisplayContinue([false, true]);
    }

    const submitImg = (i: number) => {
        setImage(faceChoices[i].imgSrc);
        setDisplayContinue([false, false]);
    }

    let nameEnteredContent = (
        <>
        <p>There is an address, but you recognise none of it. The address ends "BIG CITY", like the library's name.</p>
        <p>You look around. Stretching to the horizon there are buildings, and parks, and high rise flats.</p>
        <p>This must be Big City.</p>
        <p>There is an image.</p>
        </>
    );

    let continueButton = displayContinue[0] ? (
    <Center><Button onClick={() => submitName()}>Continue</Button></Center>
    ) : displayContinue[1] ? (
        <WindupChildren>
            {nameEnteredContent}
            <GridSelect gridComponents={faceChoices} onSelect={submitImg} itemsPerRow={3} gap={5}/>
        </WindupChildren>
    ) :
    (
        <>
        {nameEnteredContent}
        <WindupChildren>
            <Image src={playerPerformer.imgSrc} />
            <p>You feel your face. It feels like the face in the photo.</p>
            <p>This must be me.</p>
            <GameFeedback theme="success" text="Library Card added to inventory."/>
            <Effect fn={() => callback()}></Effect>
        </WindupChildren>
        </>
    );

    return (
        <Container>
            <Input
                label="Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
            <Text>{nameInput}</Text>
            {continueButton}
        </Container>
    );
}

function WhoAmIOptions({followLink} : IStoryFrame) : React.ReactElement {

    const [walletDone, setWalletDone] = useState(false);

    let continueContent = walletDone ? <Center marginTop="10px"><Button onClick={() => followLink("whereAmI")}>Where Am I?</Button></Center> : null;

    return (
        <Container>
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
                <p>The device returns to the lock screen.</p>
                <GameFeedback theme="success" text="Mobile Phone added to inventory."/>
            </InvestigationFrame>
            <InvestigationFrame title="Wallet">
                <p>The small leather wallet is not designed for storing paper notes but a set of cards.</p>
                <p>There is only one card in the wallet, it reads "Big City Library Card".</p>
                <p>There is a name.</p>
                <LibraryCard callback={() => {setWalletDone(true)}} />
            </InvestigationFrame>
            {continueContent}
        </Container>
    );
}

export default function WhoAmIFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <WindupChildren>
            <p>You sit up, your torso is sore.</p>
            <p>Your muscles complain as you claw your way into a seating position.</p>
            <p>Your mouth is dry.</p>
            <Text fontStyle="italic">How long was I out?</Text>
            <InvestigationFrame title="Continue">
                <p>You are lying on the grass.</p>
                <p>In your lap there is a mobile phone. Beside you there is a thin leather wallet.</p>
                <WhoAmIOptions followLink={followLink}/>
            </InvestigationFrame>
        </WindupChildren>
    );
}
