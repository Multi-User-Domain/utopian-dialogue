import React, {useState} from 'react';

import {
  Container,
  ChakraProvider,
  extendTheme
} from "@chakra-ui/react";

import { NarrativeProvider } from "../context/narrativeContext";
import { PlayerProvider } from "../context/playerContext";
import StoryView from "../components/lib/storyView";
import { BigCityProvider } from "../context/bigCityContext";
import { MudAccountProvider } from "../context/mudAccountContext";

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
        <MudAccountProvider>
          <NarrativeProvider>
            <BigCityProvider>
              <PlayerProvider>
                <StoryView></StoryView>
              </PlayerProvider>
            </BigCityProvider>
          </NarrativeProvider>
        </MudAccountProvider>
      </Container>
    </ChakraProvider>
    );
}
