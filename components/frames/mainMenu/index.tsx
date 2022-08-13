import React, { useEffect, useState } from "react";
import { Container, Button, Center } from "@chakra-ui/react";

import { IStoryFrame } from "../../lib/types";

/*
*   A component which renders a dialogue directly from an ink file
*/

export default function MainMenu({followLink} : IStoryFrame): React.ReactElement {

    return (
        <Container>
            <Center marginTop={20}>
                <Button onClick={() => followLink("home")}>New Game</Button>
            </Center>
            <Center marginTop={20}>
                <Button onClick={() => followLink("readFromInkStoryFrame")}>Load a Custom Narrative</Button>
            </Center>
        </Container>
    );
}
