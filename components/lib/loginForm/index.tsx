import React, { useState } from "react";

import {
    Container,
    Input,
    Button,
    Center
} from "@chakra-ui/react";

import { useMudAccount } from "../../../hooks/useMudAccount";

export default function LoginForm(): React.ReactElement {

    const { login } = useMudAccount();
    const [ username, setUsername ] = useState("");

    return (
        <Container>
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
