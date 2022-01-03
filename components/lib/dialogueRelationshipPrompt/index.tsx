import React from "react";

import {
    Container,
    Center,
    Text,
    Image,
    Flex,
    Box,
    Spacer,
    Button
} from "@chakra-ui/react";
import { ITarotCard } from "../relationships";
import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";

export interface IDialogueRelationshipPrompt {
    tarot: ITarotCard;
    children?: any;
}

export default function DialogueRelationshipPrompt({tarot, children}: IDialogueRelationshipPrompt): React.ReactElement {

    const { nextMessageBuffer } = useDialogue();
    const { addRelationship } = usePlayer();

    const acceptTarot = () => {
        addRelationship("self", [tarot.name]);
    }

    const rejectTarot = () => {
        
    }

    let header = tarot.imgSrc ? (
        <>
        <Center>
            <Flex maxWidth={300} marginBottom={10}>
                <Image h="auto" w="100%" src={tarot.imgSrc} alt={tarot.alt}></Image>
            </Flex>
        </Center>
        <Text>{tarot.description}</Text>
        </>
    ) : (
    <>
        <Text>{tarot.name} ({tarot.webId})</Text>
        <Text>{tarot.description}</Text>
    </>
    );

    return (
        <Container marginTop={10}>
            <Container>
                {header}
            </Container>
            <Container>
                {children}
            </Container>
            <Flex>
                <Spacer />            
                <Box marginRight={15}>
                    <Button onClick={acceptTarot}>Accept</Button>
                </Box>
                <Box marginRight={15}>
                    <Button onClick={rejectTarot}>Reject</Button>
                </Box>
                <Spacer />
            </Flex>
        </Container>
    );
}
