import React, {
    useContext
} from 'react';

import {
    IDialogueContext,
    DialogueContext
} from '../../context/dialogueContext';

export default function useDialogue() : IDialogueContext {
    const {
        getResponse,
        messageBuffer,
        addMessage,
        addMessages,
        nextMessageBuffer,
        dialogueEnded,
        setDialogueEnded
    } = useContext(DialogueContext);

    return {
        getResponse,
        messageBuffer,
        addMessage,
        addMessages,
        nextMessageBuffer,
        dialogueEnded,
        setDialogueEnded
    };
}
  