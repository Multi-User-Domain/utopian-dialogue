import React from "react";

import {
    Container,
    Flex,
    Box,
    Button,
    useDisclosure
} from "@chakra-ui/react";

import DevTools from "../devTools";
import useNarrative from "../../../hooks/useNarrative";

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
