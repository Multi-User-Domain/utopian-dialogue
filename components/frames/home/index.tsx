import React, { useState } from "react";

import {
    Button,
    Center,
    Container
} from "@chakra-ui/react";

import { WindupChildren, Pause, Effect, Pace } from "windups";
import { IStoryFrame } from "../../lib/types";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE } from "../../lib/constants";
import InvestigationFrame from "../../lib/investigationFrame";

const SHAKE_TIMEOUT = 500;

function ContinueB({followLink} : IStoryFrame): React.ReactElement {
  return (
    <InvestigationFrame title="Continue">
      <p>You don’t remember who you are.</p>
      <Pause ms={LONG_PAUSE} />
      <Center marginTop="20px">
          <Button onClick={() => followLink("whoAmI")}>Who Am I?</Button>
      </Center>
    </InvestigationFrame>
  );
}

function ContinueA({followLink} : IStoryFrame): React.ReactElement {
  return (
    <InvestigationFrame title="Continue">
      <p>You have woken up in a park. You're lying down.</p>
      <p>There is a tree branch above you. It crosses your vision.</p>
      <Pause ms={SHORT_PAUSE} />
      <p>The tree is covered in a crop of leaves, but autumn is approaching.</p>
      <p>The sky above is clear, it's hot.</p>
      <Pause ms={SHORT_PAUSE} />
      <ContinueB followLink={followLink} />
    </InvestigationFrame>
  );
}

function HomeContent({followLink} : IStoryFrame) : React.ReactElement {
  const [isShaking, setIsShaking] = useState(false);

  const shakeEffect = () => {
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
    }, SHAKE_TIMEOUT);
  }

    return (
      <Container className={isShaking ? "shake-hard shake-constant" : ""}>
        <WindupChildren>
            <Pace ms={SLOW_PACE}>
                <p>Dreaming...</p>
            </Pace>
            <Pause ms={LONG_PAUSE}/>
            <p>A bang.</p>
            <p>A <Effect fn={shakeEffect} />POP!</p>
            <Pause ms={LONG_PAUSE} />
            <Pace ms={SLOW_PACE}>
                <p>A long silence. . .</p>
            </Pace>
            <Pause ms={LONG_PAUSE} />
            <p>Your eyes open slowly. The light hurts.</p>
            <p>The world seems to flutter.</p>
            <Pause ms={SHORT_PAUSE} />
            <ContinueA followLink={followLink} />
        </WindupChildren>
      </Container>
    );
} 

export default function HomeFrame({followLink} : IStoryFrame): React.ReactElement {
  return <HomeContent followLink={followLink} />
}
