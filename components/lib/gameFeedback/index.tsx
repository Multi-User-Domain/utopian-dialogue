import React from "react";
import { css, cx } from '@emotion/css'

import {
    Container,
    Center,
    Button
} from "@chakra-ui/react";

import "./gameFeedback.css";

export interface IGameFeedback {
    theme: "success" | "info" | "alert" | "error",
    text?: string
}

// renders some text into an info box
export default function GameFeedback({theme, text}: IGameFeedback): React.ReactElement {

    return (
        <Container className={css`
        border: 1px solid;
        border-radius: 10px;
        margin: 10px 0px;
        padding:15px 10px;
        color: #4f8a10;
        background-color: #dff2bf;
        `}>
            {text}
        </Container>
    );
}
