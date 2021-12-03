import React, {useState, useEffect} from "react";

import {
    Container,
    Grid,
    Center,
    Text,
    GridItem,
    Image
} from "@chakra-ui/react";
import { IMessage } from "../../../context/dialogueContext";
import { DialogueResponsePrompt } from "../dialogueResponse";

export interface IDialogueMessage {
    message: IMessage;
    children: any;
}

export default function DialogueMessage({message, children}: IDialogueMessage): React.ReactElement {

    const [activeCss, setActiveCss] = useState(false);

    useEffect(() => {
        if(message.containerCss) setActiveCss(true);
    }, []);

    let dialogueResponsePrompt = (message.read && message.getResponses) ? <DialogueResponsePrompt message={message}/> : null;

    return (
        <Container className={activeCss ? message.containerCss : null}>
            <Grid
                marginTop={10}
                templateColumns="repeat(5, 1fr)"
                gap={1}
            >
                <GridItem colSpan={2} h={100} w={100} position="relative" overflow="hidden" borderRadius="50%">
                    <Image h="auto" w="100%" src={message.performer.imgSrc}/>
                    <Center marginTop={5}>
                        <Text>{message.performer.name}</Text>
                    </Center>
                </GridItem>
                <GridItem colSpan={3} h="100%">
                    <Container paddingLeft={5} paddingTop={15}>
                        {children}
                    </Container>
                </GridItem>
            </Grid>
            {dialogueResponsePrompt}
        </Container>
    );
}
