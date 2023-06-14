import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Container,
  ChakraProvider,
  extendTheme,
  useDisclosure,
  Flex,
  Box,
  Button
} from "@chakra-ui/react";

import { PlayerProvider } from "../context/playerContext";
import Fonts from "../components/lib/fonts";
import { BigCityProvider } from "../context/bigCityContext";
import { MudAccountProvider } from "../context/mudAccountContext";

import MainMenu from "../components/frames/mainMenu";
import HomeFrame from "../components/frames/home";
import WhoAmI from "../components/frames/whoAmI";
import WhereAmI from "../components/frames/whereAmI";
import ReadFromInkStoryFrame from "../components/frames/readFromInkStoryFrame";
import BrowseWorldsList from "../components/frames/browseWorldsList";
import BrowseStoryList from "../components/frames/browseStoryList";

import DevTools from "../components/lib/devTools";

const theme = extendTheme({
  fonts: {
    heading: `'iwona-heavy-regular', sans-serif`,
    body: `'iwona-regular', sans-serif`,
  },
  components:  {
    Container: {
      baseStyle: {
        padding: "0px"
      },
    },
  },
});

function Heading(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container marginBottom={10} textAlign="left">
        <Flex>
            <Box alignSelf="flex-start">

            </Box>

            <Box w="100vw"></Box>

            <Box alignSelf="flex-end">
                <Button onClick={onOpen} size="sm">Open Dev Tools</Button>
                <DevTools isOpen={isOpen} onClose={onClose} />
            </Box>
        </Flex>
    </Container>
  );
}

export default function Home(): React.ReactElement {

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container marginTop="20px">
        <MudAccountProvider>
          <BigCityProvider>
            <PlayerProvider>
              <BrowserRouter>
                <Heading />
                <Routes>
                <Route path="/">
                    <Route index element={<MainMenu />} />
                    <Route path="start" element={<HomeFrame />} />
                    <Route path="whoAmI" element={<WhoAmI />} />
                    <Route path="whereAmI" element={<WhereAmI />} />
                    <Route path="readFromInk" element={<ReadFromInkStoryFrame />} />
                    <Route path="browseWorlds" element={<BrowseWorldsList />} />
                    <Route path="browseStories" element={<BrowseStoryList />} />
                </Route>
                </Routes>
              </BrowserRouter>
            </PlayerProvider>
          </BigCityProvider>
        </MudAccountProvider>
      </Container>
    </ChakraProvider>
    );
}
