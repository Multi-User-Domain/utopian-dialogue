import React, { useState } from "react";

import {
    Container,
    Center,
    Button
} from "@chakra-ui/react";

export interface IInvestigationFrame {
    title: string,
    children: any
}

// really just a simple toggle. After the button is clicked it disappears
// and the children (previously hidden) are rendered in its' place
export default function InvestigationFrame({title, children}: IInvestigationFrame): React.ReactElement {

    // boolean marks if the user has selected the button and so resolved the children
    const [discovered, setDiscovered] = useState(false);

    return (
        <>
        <Container display={discovered ? "none" : "block"}>
            <Center>
                <Button onClick={() => setDiscovered(true)}>{title}</Button>
            </Center>
        </Container>
        <Container display={discovered ? "block" : "none"}>
            {children}
        </Container>
        </>
    );
}
