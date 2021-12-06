import React, {
    useContext
} from 'react';

import {
    IRemoteDialogueContext,
    RemoteDialogueContext
} from '../../context/remoteDialogueContext';

export default function useRemoteDialogue() : IRemoteDialogueContext {
    const {
        addMessagesFromSolidDataset
    } = useContext(RemoteDialogueContext);

    return {
        addMessagesFromSolidDataset
    };
}
  