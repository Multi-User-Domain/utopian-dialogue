import React, { useEffect, useState } from "react";
import { Container, Button, Center, Text, Heading } from "@chakra-ui/react";

import { IStoryFrame } from "../../lib/types";

/*
*   A component which renders a dialogue directly from an ink file
*/

export default function MainMenu({followLink} : IStoryFrame): React.ReactElement {

    return (
        <Container>
            <Center>
                <Heading size='2xl'>Big City Agora</Heading>
            </Center>
            <Center marginTop={20} fontSize={14}>
                <Button onClick={() => followLink("home")}><Text>New Game</Text></Button>
            </Center>
            <Center marginTop={20} fontSize={14}>
                <Button onClick={() => followLink("readFromInkStoryFrame")}><Text>Load a Custom Narrative</Text></Button>
            </Center>
        </Container>
    );
}
