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
        dialogueEnded,
        setDialogueEnded
    } = useContext(DialogueContext);

    return {
        getResponse,
        messageBuffer,
        addMessage,
        dialogueEnded,
        setDialogueEnded
    };
}
  