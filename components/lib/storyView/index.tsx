import React, { useEffect } from "react";

import {
    Container
} from "@chakra-ui/react";

import useNarrative from "../../../hooks/useNarrative";

export default function StoryView(): React.ReactElement {

    const { activeFrame, setFrame } = useNarrative();

    useEffect(() => {
        setFrame("home");
    }, []);

    return (
        <Container>
            {activeFrame}
        </Container>
    );
}
