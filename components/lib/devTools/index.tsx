import React from "react";

import {
    Container,
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent
} from "@chakra-ui/react";

import { FRAME_DICTIONARY } from "../../../context/narrativeContext";
import useNarrative from "../../../hooks/useNarrative";

export default function DevTools({isOpen, onClose=null} : {isOpen: boolean, onClose: () => void}): React.ReactElement {
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
