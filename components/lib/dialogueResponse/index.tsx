import React from "react";

import { css } from "@emotion/css";

import {
    Container,
    Text,
    Grid,
    GridItem
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

import usePlayer from "../../../hooks/usePlayer";
import useDialogue from "../../../hooks/useDialogue";

function DialogueResponseChoice({key, onClick, children}: {key:number, onClick:() => void, children: any}): React.ReactElement {
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
    <Grid key={key} onClick={onClick} className={containerStyles} templateColumns="repeat(6, 1fr)">
        <GridItem colSpan={1}><TriangleUpIcon className={iconStyles} /></GridItem>
        <GridItem colSpan={5}>{children}</GridItem>
    </Grid>
    );
}

export function DialogueResponsePrompt({}): React.ReactElement {

    const { webId } = usePlayer();
    const { getResponse, timeline } = useDialogue();

    const lastMessage = timeline[timeline.length - 1];

    // only show options if the player was not the last performer to speak
    let content = null;

    if(lastMessage.webId != webId) {
        const responses = lastMessage['getResponses'] ? lastMessage.getResponses() : [];
        let responseDisplay = [];

        for(let i = 0; i < responses.length; i++) {

            // special case - say nothing
            if(responses[i] == null) {
                responseDisplay.push(
                    <DialogueResponseChoice key={i} onClick={() => getResponse(responses[i])}><Text>[Say Nothing]</Text></DialogueResponseChoice>
                );
                continue;
            }

            let responseContent = responses[i].shorthandContent ? responses[i].shorthandContent : responses[i].content;

            responseDisplay.push(
                <DialogueResponseChoice key={i} onClick={() => getResponse(responses[i])}>{responseContent}</DialogueResponseChoice>
            );
        }

        content = (
            <Container padding={5} marginTop={5}>
                {...responseDisplay}
            </Container>
        );
    }

    return content;
}
