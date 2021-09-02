import React, {
    useContext
} from 'react';

import {
    INarrativeContext,
    NarrativeContext
} from '../../context/narrativeContext';

export default function useNarrative() : INarrativeContext {
    const {
        activeFrame,
        setFrame
    } = useContext(NarrativeContext);

    return {
        activeFrame,
        setFrame
    };
}
  