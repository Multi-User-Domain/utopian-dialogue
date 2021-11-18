import React, {useState, useEffect} from "react";

import axios from 'axios';

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
}

export default function DialogueMessage({message}: IDialogueMessage): React.ReactElement {

    const [activeCss, setActiveCss] = useState(false);
    const [content, setContent] = useState(message.content);

    useEffect(() => {
        if(message.containerCss) setActiveCss(true);

        return () => {
            setContent(null);
        }
    }, []);

    const getRemoteContent: (messageUrl: string) => Promise<React.ReactElement> = (messageUrl) => {
        return new Promise<React.ReactElement>((resolve, reject) => {
            axios.get(messageUrl).then(res => { return resolve(<>{res.data}</>) });
        });
    }

    if(message.contentUrl) {
        getRemoteContent(message.contentUrl).then((content) => {
            message.content = content;
            setContent(content);
        });
    }

    let dialogueResponsePrompt = (message.read && message.getResponses) ? <DialogueResponsePrompt /> : null;

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
                        {content}
                    </Container>
                </GridItem>
            </Grid>
            {dialogueResponsePrompt}
        </Container>
    );
}
