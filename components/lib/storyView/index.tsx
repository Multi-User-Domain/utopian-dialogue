import React from "react";

import {
    Container,
    Flex,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    useDisclosure
} from "@chakra-ui/react";

import { FRAME_DICTIONARY } from "../../../context/narrativeContext";
import useNarrative from "../../../hooks/useNarrative";

function DevTools({isOpen, onClose=null} : {isOpen: boolean, onClose: () => void}): React.ReactElement {
    const { setFrame } = useNarrative();
    
    const goToFrame = (idx: string) => {
        setFrame(idx);
        onClose();
    }

    const frameList = [];
    for(let name in FRAME_DICTIONARY) {
        frameList.push(<Container key={name} w="100%" marginBottom={3}><Button colorScheme="teal" onClick={() => goToFrame(name)}>{name}</Button></Container>)
    }

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody paddingTop={10}>
                        {frameList}
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}

export default function StoryView(): React.ReactElement {

    const { activeFrame } = useNarrative();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Container>
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
            {activeFrame}
        </Container>
    );
}
