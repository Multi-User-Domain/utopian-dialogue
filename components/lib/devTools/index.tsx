import React from "react";
import { useNavigate } from "react-router-dom";

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
    Text,
    Input
} from "@chakra-ui/react";

import useBigCity from "../../../hooks/useBigCity";

const FRAME_DICTIONARY = {
    "start": "start",
    "whoAmI": "whoAmI",
    "whereAmI": "whereAmI",
    "agora": "https://raw.githubusercontent.com/Multi-User-Domain/utopian-dialogue/master/ink/agora.ink.json"
}

export default function DevTools({isOpen, onClose=null} : {isOpen: boolean, onClose: () => void}): React.ReactElement {
    const navigate = useNavigate();
    const { world, setWorldItem } = useBigCity();
    
    const goToFrame = (idx: string) => {
        if(FRAME_DICTIONARY[idx].startsWith("http")) navigate("/readFromInk", {state: {url: encodeURI(FRAME_DICTIONARY[idx])}});
        else navigate(idx);
        onClose();
    }

    const frameList = [];
    for(let name in FRAME_DICTIONARY) {
        frameList.push(<Container key={name} w="100%" marginBottom={3}><Button colorScheme="teal" onClick={() => goToFrame(name)}>{name}</Button></Container>)
    }

    // render world data into a JSON-object like display
    const worldData = [<Text key={0}>&#123;</Text>];
    Object.keys(world).forEach((key) => {
        worldData.push(
            <div key={key}>
            <Text paddingLeft="2em">{key}: </Text>
            <Input
                label="Name"
                value={world[key]}
                onChange={(e) => setWorldItem(key, e.target.value)}/>
            </div>
        );
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
