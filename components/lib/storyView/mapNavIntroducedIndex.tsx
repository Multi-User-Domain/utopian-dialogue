import React from "react";

import {
    Container
} from "@chakra-ui/react";

import useNarrative from "../../../hooks/useNarrative";
import MapNavigation from "../mapNav";

export default function StoryView(): React.ReactElement {

    const { activeFrame } = useNarrative();

    const content = activeFrame == null ? <MapNavigation /> : activeFrame;

    return (
        <Container>
            {content}
        </Container>
    );
}
