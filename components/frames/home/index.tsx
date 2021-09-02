import React, { useState, useContext } from "react";
import { cx } from "linaria";
import { css } from "@emotion/css";

import {
    Box,
    Button,
    Center,
    Container,
    Heading
} from "@chakra-ui/react";

import { WindupChildren, OnChar, Pause, Effect, Pace } from "windups";

const SMASH_MS = 5000;

const smashStyles = css`
  @keyframes smash {
    0% {
      transform: translate(0, 10px);
    }
    10% {
      transform: translate(20px, -30px);
    }
    20% {
      transform: translate(-12px, 17px);
    }
    40% {
      transform: translate(7px, -9px);
    }
    60% {
      transform: translate(-3px, 4px);
    }
    80% {
      transform: translate(1px, -1px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  animation-name: smash;
  animation-duration: ${SMASH_MS}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
`;

export const SFXContext = React.createContext({
  smash: () => {},
});

const SmashEffect: React.FC = ({ children }) => {
  const [isSmashing, setIsSmashing] = useState(false);

  const smash = React.useCallback(() => {
    setIsSmashing(true);
  }, []);

  React.useEffect(() => {
    if (isSmashing) {
      setTimeout(() => {
        setIsSmashing(false);
      }, SMASH_MS);
    }
  }, [isSmashing]);

  return (
    <SFXContext.Provider value={{ smash }}>
      <div className={cx(isSmashing && smashStyles)}>{children}</div>
    </SFXContext.Provider>
  );
};

export default function HomeFrame(): React.ReactElement {
    const longPause = 2000;
    const shortPause = 1000;
    const slowPace = 100;

    return (
        <WindupChildren>
            <Pace ms={slowPace}>
                <p>Dreaming...</p>
            </Pace>
            <Pause ms={longPause}/>
            <p>A bang.</p>
            <Pause ms={shortPause} />
            <SmashEffect>
                <p>A POP!</p>
            </SmashEffect>
            <Pause ms={longPause} />
            <Pace ms={slowPace}>
                <p>A long silence…</p>
            </Pace>
            <Pause ms={longPause} />
            <p>Your eyes open slowly. The light hurts.</p>
            <p>The world seems to flutter.</p>
            <Pause ms={shortPause} />
            <br/>
            <p>You have woken up in a park. You're lying down.</p>
            <p>There is a tree branch above you. It crosses your vision.</p>
            <Pause ms={shortPause} />
            <p>The tree is covered in a crop of leaves, but autumn is approaching.</p>
            <p>The sky above is clear, it's hot.</p>
            <br/>
            <Pause ms={shortPause} />
            <p>You don’t remember who you are.</p>
            <Pause ms={longPause} />
            <Center marginTop="20px">
                <Button>Who Am I?</Button>
            </Center>
        </WindupChildren>
    );
}
