import React from "react";

import {
    Container,
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    Tabs,
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    Text
} from "@chakra-ui/react";

import { FRAME_DICTIONARY } from "../../../context/narrativeContext";
import useNarrative from "../../../hooks/useNarrative";
import useBigCity from "../../../hooks/useBigCity";

export default function DevTools({isOpen, onClose=null} : {isOpen: boolean, onClose: () => void}): React.ReactElement {
    const { setFrame } = useNarrative();
    const { world } = useBigCity();
    
    const goToFrame = (idx: string) => {
        setFrame(idx);
        onClose();
    }

    const frameList = [];
    for(let name in FRAME_DICTIONARY) {
        frameList.push(<Container key={name} w="100%" marginBottom={3}><Button colorScheme="teal" onClick={() => goToFrame(name)}>{name}</Button></Container>)
    }

    // render world data into a JSON-object like display
    const worldData = [<Text key={0}>&#123;</Text>];
    Object.keys(world).forEach((key) => {
        worldData.push(<Text key={key} paddingLeft="2em">{key}: {world[key]}</Text>);
    });
    worldData.push(<Text key={Object.keys(world).length}>&#125;</Text>);

    const worldDisplay = worldData.length > 2 ? worldData : [];

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody paddingTop={10}>
                    <Tabs isFitted>
                        <TabList>
                            <Tab>Navigation</Tab>
                            <Tab>Game State</Tab>
                        </TabList>
                        
                        <TabPanels>
                            <TabPanel>
                                {frameList}
                            </TabPanel>
                            <TabPanel>
                                <Text fontSize='xl'>{world.name}</Text>
                                {worldDisplay}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}
