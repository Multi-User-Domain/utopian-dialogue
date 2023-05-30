import React, { useEffect, useState } from "react";
import { Container, Button, Center, Text, Heading } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

/*
*   A component which renders a dialogue directly from an ink file
*/

export default function MainMenu(): React.ReactElement {

    const navigate = useNavigate();

    return (
        <Container>
            <Center>
                <Heading size='2xl'>Big City Agora</Heading>
            </Center>
            <Center marginTop={20} fontSize={14}>
                <Button onClick={() => navigate("/start")}><Text>New Game</Text></Button>
            </Center>
            <Center marginTop={20} fontSize={14}>
                <Button onClick={() => navigate("/browseWorlds")}><Text>Browse Worlds (Beta)</Text></Button>
            </Center>
            <Center marginTop={20} fontSize={14}>
                <Button onClick={() => navigate("/readFromInk", {state: {url: null}})}><Text>Load a Custom Narrative</Text></Button>
            </Center>
        </Container>
    );
}
