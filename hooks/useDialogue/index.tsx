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
        addParticipant,
        addMessage
    } = useContext(DialogueContext);

    return {
        getResponse,
        timeline,
        addParticipant,
        addMessage
    };
}
  