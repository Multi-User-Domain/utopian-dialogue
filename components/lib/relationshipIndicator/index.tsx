import React from "react";
import { css } from '@emotion/css'

import {
    Container,
    Text
} from "@chakra-ui/react";

export default function RelationshipIndicator({color, children} : {color: string, children: any}): React.ReactElement {

    return (
        <Container className={css`
        margin: 5px 0px;
        color: ${color};
        `}>
            <Text><em>New relationship effect!</em></Text>
            {children}
        </Container>
    );
}
