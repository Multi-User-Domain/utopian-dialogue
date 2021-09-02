import React, { useState, useEffect } from "react";

import {
    Box,
    Button,
    Container,
    Heading
} from "@chakra-ui/react";

import useNarrative from "../../../hooks/useNarrative";

export default function StoryView(): React.ReactElement {

    const { getActiveFrameElement } = useNarrative();
    const [ content, setContent ] = useState(null);

    useEffect(() => {
        getActiveFrameElement().then((element) => {
            setContent(element);
        })
    }, []);

    return (
        <Container>
            {content}
        </Container>
    );
}
