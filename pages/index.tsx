import React, {useState} from 'react';

import {
  Container,
  ChakraProvider
} from "@chakra-ui/react";

import { NarrativeProvider } from "../context/narrativeContext";
import { PlayerProvider } from "../context/playerContext";
import StoryView from "../components/lib/storyView";
import { BigCityProvider } from '../context/bigCityContext';

export default function Home(): React.ReactElement {

  return (
    <ChakraProvider>
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
