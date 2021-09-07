import React from "react";

import {
    Container,
    Grid,
    GridItem,
    Image
} from "@chakra-ui/react";

export interface IDialogue {
    imgSrc: string;
    children: any;
}

export default function Dialogue({imgSrc, children}: IDialogue): React.ReactElement {

    return (
        <Grid
            templateColumns="repeat(5, 1fr)"
            gap={1}
        >
            <GridItem colSpan={2} h={100} w={100} position="relative" overflow="hidden" borderRadius="50%">
                <Image h="auto" w="100%" src={imgSrc}/>
            </GridItem>
            <GridItem colSpan={3} h="100%">
                <Container paddingLeft={5} paddingTop={15}>
                    {children}
                </Container>
            </GridItem>
        </Grid>
    );
}
