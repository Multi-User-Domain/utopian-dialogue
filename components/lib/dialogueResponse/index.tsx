import React from "react";

import {
    Container,
    Text
} from "@chakra-ui/react";

import usePlayer from "../../../hooks/usePlayer";
import useDialogue from "../../../hooks/useDialogue";

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
                    <Container key={i} onClick={() => getResponse(responses[i])}><Text>[Say Nothing]</Text></Container>
                );
                continue;
            }

            let responseContent = responses[i].shorthandContent ? responses[i].shorthandContent : responses[i].content;

            responseDisplay.push(
                <Container key={i} onClick={() => getResponse(responses[i])}>{responseContent}</Container>
            );
        }

        content = (
            <Container>
                {...responseDisplay}
            </Container>
        );
    }

    return content;
}
