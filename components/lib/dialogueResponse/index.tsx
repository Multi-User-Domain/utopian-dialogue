import React, { useEffect, useState } from "react";

import { css } from "@emotion/css";

import {
    Container,
    Text,
    Grid,
    GridItem
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

import useDialogue from "../../../hooks/useDialogue";
import usePlayer from "../../../hooks/usePlayer";

function DialogueResponseChoice({onClick, children}: {key:number, onClick:() => void, children: any}): React.ReactElement {
    const containerStyles = css`
      margin-top: 5px;

      &:hover {
        color: #32CD32;
        cursor: pointer;
      }
    `;

    const iconStyles = css`
      transform: rotate(90deg);
    `;

    return (
    <Grid onClick={onClick} className={containerStyles} templateColumns="repeat(6, 1fr)">
        <GridItem colSpan={1}><TriangleUpIcon className={iconStyles} /></GridItem>
        <GridItem colSpan={5}>{children}</GridItem>
    </Grid>
    );
}

export function DialogueResponsePrompt({}): React.ReactElement {

    const { playerPerformer } = usePlayer();
    const { getResponse, timeline, parseResponses } = useDialogue();
    const [ responses, setResponses ] = useState([]);

    useEffect(() => {
        const lastMessage = timeline[timeline.length - 1];

        if('responsesUrl' in lastMessage && lastMessage.responsesUrl) {
            parseResponses(lastMessage.responsesUrl, playerPerformer).then((parsedResponses) => setResponses(parsedResponses));
        }
        else if(lastMessage['getResponses']) setResponses(lastMessage.getResponses());

        return () => {
            setResponses([]);
        }
    }, [timeline]);

    const renderResponseOptions = (responses) => {
        let responseDisplay = [];

        for(let i = 0; i < responses.length; i++) {

            let responseContent = responses[i].shorthandContent ? responses[i].shorthandContent : responses[i].content;
    
            responseDisplay.push(
                <DialogueResponseChoice key={i} onClick={() => getResponse(responses[i])}>{responseContent}</DialogueResponseChoice>
            );
        }

        return responseDisplay;
    }

    let responseDisplay = renderResponseOptions(responses);

    const content = responseDisplay.length ? (
        <Container padding={5} marginTop={5}>
            {...responseDisplay}
        </Container>
    ) : null;

    return content;
}
