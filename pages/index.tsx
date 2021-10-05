import React, {useState} from 'react';

import {
  Container,
  ChakraProvider,
  extendTheme
} from "@chakra-ui/react";

import { NarrativeProvider } from "../context/narrativeContext";
import { PlayerProvider } from "../context/playerContext";
import StoryView from "../components/lib/storyView";
import { BigCityProvider } from '../context/bigCityContext';

const theme = extendTheme({
  components:  {
    Container: {
      baseStyle: {
        padding: "0px"
      },
    },
  },
});

export default function Home(): React.ReactElement {

  return (
    <ChakraProvider theme={theme}>
      <Container marginTop="20px">
          <NarrativeProvider>
            <BigCityProvider>
              <PlayerProvider>
                <StoryView></StoryView>
              </PlayerProvider>
            </BigCityProvider>
          </NarrativeProvider>
      </Container>
    </ChakraProvider>
    );
}
