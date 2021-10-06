import React from "react";
import {
    Button,
    Center,
    Text
} from "@chakra-ui/react";

import { WindupChildren, Pause } from "windups";
import { IStoryFrame } from "../../lib/types";
import InvestigationFrame from "../../lib/investigationFrame";
import { LONG_PAUSE, SHORT_PAUSE } from "../../lib/constants";

function ContinueB(): React.ReactElement {
    return (
        <InvestigationFrame title="Go back to sleep">
            <p>You lie down again and rest your eyes. Before long you are asleep.</p><Pause ms={SHORT_PAUSE} />
            <p>You dream of a city, you are walking busy streets as people go about their daily business.</p>
            <p>To your right there are some large apartment blocks, to your left there is a river.</p>
            <p>A cloudy sky looms above you.</p>
            <p>Its' structure is constantly changing, the clouds reorganising and transforming at an impossible pace.</p>
            <p>The city above is mirroring to the city below, shadowing its' developments.</p>
            <Pause ms={LONG_PAUSE} />
            <p>You wake up again.</p>
            <p>You feel groggy.</p>
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
        <WindupChildren>
            <p>Slowly, you struggle to your feet. Your legs are none too happy about it, and your back aches.</p>
            <p>You stretch.</p>
            <p>You feel tired.</p>
            <ContinueA followLink={followLink} />
        </WindupChildren>
    );
}

export default function WhereAmIFrame({followLink} : IStoryFrame): React.ReactElement {

    return (
        <>
        <WindupChildren>
            <p>You are sat atop a hill, it's an enclove within a park.</p>
            <p>The grasss is lush and green and rich in glucose.</p><Pause ms={SHORT_PAUSE} />
            <p>There are some bees, gliding from flower to flower and collecting pollen.</p>
            <p>Downhill there is a fence, beyond which the park continues.</p>
            <p>In the distance the horizon stretches and there is a view over a great city.</p>
        </WindupChildren>
        <InvestigationFrame title="Look over the city">
            <p>The city is dense. Your view is dominated by the highrises and older apartment blocks.</p>
            <p>There are occassional breaks in the buildings. In particular there is what must be a large public square, central to your vision. A large column rises from the space.</p>
            <p>Beyond this an impressive stone goliath sits atop a hill, it is adorned with statues and fantastic spirals.</p><Pause ms={SHORT_PAUSE} />
            <p>To the East there is a huge concrete fortress, squat and square.</p>
            <p>To the West, the sea, and a port with great metal ships at harbour. Behind the industry there is a vast town of buildings made of scrap metal and improvised materials.</p><Pause ms={SHORT_PAUSE} />
            <p>Beyond that, mountains.</p>
        </InvestigationFrame>
        <InvestigationFrame title="Attempt to get up">
            <AttemptToGetUp followLink={followLink} />
        </InvestigationFrame>
        </>
    );
}