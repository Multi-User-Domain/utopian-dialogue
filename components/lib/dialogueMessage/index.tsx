import React, {useState, useEffect} from "react";

import {
    Container,
    Grid,
    Center,
    Text,
    GridItem,
    Image,
    IconButton
} from "@chakra-ui/react";
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useSkip } from "windups";
import { IMessage } from "../../../context/dialogueContext";
import { DialogueResponsePrompt } from "../dialogueResponse";

export interface IDialogueMessage {
    message: IMessage;
    firstMessageInSeq: boolean; // set to true if the message is the first (or the only message) in a sequence
    children: any;
}

const SkipButton = () => {
    const skip = useSkip();

    return <IconButton aria-label="skip-button" onClick={skip} color="primary"><ArrowRightIcon /></IconButton>;
};

export default function DialogueMessage({message, firstMessageInSeq, children}: IDialogueMessage): React.ReactElement {

    const [activeCss, setActiveCss] = useState(false);

    useEffect(() => {
        if(message.containerCss) setActiveCss(true);
    }, []);

    let dialogueResponsePrompt = (message.read && message.getResponses) ? <DialogueResponsePrompt message={message}/> : null;

    const imageDisplay = message.performer.imgSrc ? (
        <GridItem colSpan={2} h={100} w={100} position="relative" overflow="hidden" borderRadius="50%">
            <Image h="auto" w="100%" src={message.performer.imgSrc}/>
            <Center marginTop={5}>
                <Text>{message.performer.name}</Text>
            </Center>
        </GridItem>
    ) : null;

    const skipButton = (!firstMessageInSeq || message.excludeSkipPrompt || message.read) ? null :
        <GridItem colSpan={1} h="100%">
            <SkipButton />
        </GridItem>;

    let messageColSpan = 5;
    if(message.performer.imgSrc) messageColSpan -= 2;
    if(firstMessageInSeq) messageColSpan -= 1;

    return (
        <Container className={activeCss ? message.containerCss : null}>
            <Grid
                marginTop={10}
                templateColumns="repeat(5, 1fr)"
                gap={1}
            >
                {imageDisplay}
                <GridItem colSpan={messageColSpan} h="100%">
                    <Container paddingLeft={5} paddingTop={15}>
                        {children}
                    </Container>
                </GridItem>
                {skipButton}
            </Grid>
            {dialogueResponsePrompt}
        </Container>
    );
}
