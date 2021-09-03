import React, { useState } from "react";

import {
    Container,
    Center,
    Button
} from "@chakra-ui/react";

import { WindupChildren, OnChar, Pause, Effect, Pace } from "windups";

export interface IInvestigationFrame {
    title: string,
    children: any
}

// really just a simple toggle. After the button is clicked it disappears
// and the children (previously hidden) are rendered in its' place
export default function InvestigationFrame({title, children}: IInvestigationFrame): React.ReactElement {

    // boolean marks if the user has selected the button and so resolved the children
    const [discovered, setDiscovered] = useState(false);

    let content = discovered ? children : null;

    return (
        <WindupChildren>
            <Container display={discovered ? "none" : "block"}>
                <Center>
                    <Button onClick={() => setDiscovered(true)}>{title}</Button>
                </Center>
            </Container>
            <Container>
                {content}
            </Container>
        </WindupChildren>
    );
}
