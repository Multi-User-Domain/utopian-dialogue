import React, {
    useContext
} from 'react';

import {
    IPlayerContext,
    PlayerContext
} from '../../context/playerContext';

export default function usePlayer() : IPlayerContext {
    const {
        webId,
        playerPerformer,
        setName,
        setImage,
        relationships,
        addRelationship,
        removeRelationship,
        hasRelationshipPair
    } = useContext(PlayerContext);

    return {
        webId,
        playerPerformer,
        setName,
        setImage,
        relationships,
        addRelationship,
        removeRelationship,
        hasRelationshipPair
    };
}
  