import React, {useState} from 'react';

import {
  Flex,
  Box,
  Button,
  Container,
  useDisclosure,
  Heading,
  ChakraProvider
} from "@chakra-ui/react";

import { NarrativeProvider } from "../context/narrativeContext";
import StoryView from "../components/lib/storyView";

export default function Home(): React.ReactElement {

  return (
    <ChakraProvider>
      <Container marginTop="20px">
          <NarrativeProvider>
            <StoryView></StoryView>
          </NarrativeProvider>
      </Container>
    </ChakraProvider>
    );
}
