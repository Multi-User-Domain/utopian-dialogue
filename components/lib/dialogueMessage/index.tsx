import React from "react";

import {
    Container,
    Grid,
    Center,
    Text,
    GridItem,
    Image
} from "@chakra-ui/react";
import { IMessage } from "../../../context/dialogueContext";

export interface IDialogueMessage {
    message: IMessage;
    children: any;
}

export default function DialogueMessage({message, children}: IDialogueMessage): React.ReactElement {

    return (
        <Grid
            marginTop={10}
            templateColumns="repeat(5, 1fr)"
            gap={1}
        >
            <GridItem colSpan={2} h={100} w={100} position="relative" overflow="hidden" borderRadius="50%">
                <Image h="auto" w="100%" src={message.imgSrc}/>
                <Center marginTop={5}>
                    <Text>{message.name}</Text>
                </Center>
            </GridItem>
            <GridItem colSpan={3} h="100%">
                <Container paddingLeft={5} paddingTop={15}>
                    {children}
                </Container>
            </GridItem>
        </Grid>
    );
}
