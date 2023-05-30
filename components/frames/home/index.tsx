import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Center,
    Container
} from "@chakra-ui/react";

import { WindupChildren, Pause, Effect, Pace } from "windups";
import { LONG_PAUSE, SHORT_PAUSE, SLOW_PACE } from "../../lib/constants";
import InvestigationFrame from "../../lib/investigationFrame";

const SHAKE_TIMEOUT = 500;

function ContinueB(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <InvestigationFrame title="Continue">
      <p>You don’t remember who you are.</p>
      <Pause ms={LONG_PAUSE} />
      <Center marginTop="20px">
          <Button onClick={() => navigate("/whoAmI")}>Who Am I?</Button>
      </Center>
    </InvestigationFrame>
  );
}

function ContinueA(): React.ReactElement {
  return (
    <InvestigationFrame title="Continue">
      <p>You have woken up in a park. You're lying down.</p>
      <p>There is a tree branch above you. It bisects your vision.</p>
      <Pause ms={SHORT_PAUSE} />
      <p>The tree is covered in a crop of leaves but autumn is approaching.</p>
      <p>The sky above is clear, it's hot.</p>
      <Pause ms={SHORT_PAUSE} />
      <ContinueB />
    </InvestigationFrame>
  );
}

function HomeContent() : React.ReactElement {
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
            <p>The whole world seems to flutter.</p>
            <Pause ms={SHORT_PAUSE} />
            <ContinueA />
        </WindupChildren>
      </Container>
    );
} 

export default function HomeFrame(): React.ReactElement {
  return <HomeContent />
}
