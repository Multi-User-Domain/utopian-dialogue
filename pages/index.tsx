import React, {useState} from 'react';

import {
  Container,
  ChakraProvider
} from "@chakra-ui/react";

import { NarrativeProvider } from "../context/narrativeContext";
import { PlayerProvider } from "../context/playerContext";
import StoryView from "../components/lib/storyView";

export default function Home(): React.ReactElement {

  return (
    <ChakraProvider>
      <Container marginTop="20px">
          <NarrativeProvider>
            <PlayerProvider>
              <StoryView></StoryView>
            </PlayerProvider>
          </NarrativeProvider>
      </Container>
    </ChakraProvider>
    );
}
