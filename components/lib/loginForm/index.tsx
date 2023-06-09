import React, { useState } from "react";

import {
    Container,
    Input,
    Button,
    Center,
    Text
} from "@chakra-ui/react";

import { useMudAccount } from "../../../hooks/useMudAccount";

export default function LoginForm(): React.ReactElement {

    const { login } = useMudAccount();
    const [ username, setUsername ] = useState("");

    return (
        <Container>
            <Text>Enter a unique name here that we'll use to keep all your characters and worlds in the same place. For now they're shared (no passwords, emails or anything else)</Text>
            <Input
                label="Username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <Center>
                <Button onClick={(e) => login(username)}>Login</Button>
            </Center>
        </Container>
    );
}
