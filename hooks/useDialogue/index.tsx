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
        timeline,
        addMessage,
        dialogueEnded,
        setDialogueEnded,
        parsePerformer,
        parseResponses,
        addMessagesFromSolidDataset,
        addMessagesFromUrl,
    } = useContext(DialogueContext);

    return {
        getResponse,
        timeline,
        addMessage,
        dialogueEnded,
        setDialogueEnded,
        parsePerformer,
        parseResponses,
        addMessagesFromSolidDataset,
        addMessagesFromUrl,
    };
}
  