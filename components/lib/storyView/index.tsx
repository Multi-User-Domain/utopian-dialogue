import React from "react";

import {
    Container
} from "@chakra-ui/react";

import useNarrative from "../../../hooks/useNarrative";

export default function StoryView(): React.ReactElement {

    const { activeFrame } = useNarrative();

    return (
        <Container>
            {activeFrame}
        </Container>
    );
}
