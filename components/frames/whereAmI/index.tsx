import React from "react";
import {
    Button,
    Center,
    Text
} from "@chakra-ui/react";

import { WindupChildren, Pause } from "windups";
import { IStoryFrame } from "../../lib/types";
import InvestigationFrame from "../../lib/investigationFrame";
import { LONG_PAUSE } from "../../lib/constants";

function ContinueB(): React.ReactElement {
    return (
        <InvestigationFrame title="Go back to sleep">
            <p>You lie down again and rest your eyes. Before long you are asleep.</p>
            <p>You dream of a city, you are walking busy streets as people go about their daily business.</p>
            <p>The streets are made of cobblestone, they are aligned with trees but not with pavements.</p>
            <p>To your right there are some large apartment blocks, to your left there is a river.</p>
            <p>The sky looks peculiar, there are clouds but they are formed strangely.</p>
            <p><Text fontStyle="italic">It's a reflection of the city below</Text> you realise with a shock. The clouds shift restlessly, twisting and reforming as the time passes.</p>
            <Pause ms={LONG_PAUSE} />
            <p>You wake up again. You feel groggy.</p>
            <InvestigationFrame title="Go back to sleep">
                <p>Your body refuses.</p>
            </InvestigationFrame>
        </InvestigationFrame>
    );
}

function ContinueA({followLink} : IStoryFrame): React.ReactElement {
    return (
        <InvestigationFrame title="But I just slept?">
            <p>Indeed.</p>
            <p>Strange.</p>
            <ContinueB />
            <Center marginTop="10px"><Button onClick={() => followLink("agora")}>Find the Exit</Button></Center>
        </InvestigationFrame>
    );
}

function AttemptToGetUp({followLink}: IStoryFrame) : React.ReactElement {
    return (
        <>
        <p>Slowly, you struggle to your feet. Your legs are none too happy about it, and your back aches.</p>
        <p>You stretch.</p>
        <p>You feel tired.</p>
        <ContinueA followLink={followLink} />
        </>
    );
}

export default function WhereAmIFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <>
        <WindupChildren>
            <p>You are sat atop a hill, an enclove within a park.</p>
            <p>Beside you is lush green grass, clover and tiny flowers.</p>
            <p>There are some bees, gliding from flower to flower and collecting pollen.</p>
            <p>You are enclosed behind you by larger plants, bushes and trees.</p>
            <p>Downhill there is a fence, beyond which the park continues.</p>
            <p>In the distance the horizon stretches and there is a view over a great city.</p>
        </WindupChildren>
        <InvestigationFrame title="Look over the city's buildings">
        <p>Highrises, and older appartment blocks, are the most dominant feature.</p>
        <p>Central to your vision there is a break in the buildings, it must be a large square. A monument cuts through the middle in the form of a large column.</p>
        <p>Beyond and atop a hill an impressive goliath of a building watches over the vallies below, complete with spectacular spirals and adorned with statues.</p>
        <p>To the East there are other great buildings, one a goliath square fortress, another with columns and another still, thin but tall to an impossible height. The buildings stretch to the horizon and you cannot see beyond them.</p>
        <p>To the West a great river cuts through the landscape, winding off to distant mountains.</p>
        <p>In the distance you see a vast town of smaller buildings made from improvised materials.</p>
        </InvestigationFrame>
        <InvestigationFrame title="Attempt to get up">
            <AttemptToGetUp followLink={followLink} />
        </InvestigationFrame>
        </>
    );
}