import React from "react";
import { css } from '@emotion/css'

import {
    Container,
    Grid,
    GridItem
} from "@chakra-ui/react";

import { ViewIcon } from "@chakra-ui/icons";

export default function RelationshipIndicator({color, children} : {color: string, children: any}): React.ReactElement {

    return (
        <Container className={css`
        margin: 5px 0px;
        color: ${color};
        `}>
            <Grid templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={1}><ViewIcon /></GridItem>
                <GridItem colSpan={5}>{children}</GridItem>
            </Grid>
        </Container>
    );
}
