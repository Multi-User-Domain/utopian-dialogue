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
        name,
        setName,
        image,
        setImage,
        relationships,
        addRelationship,
        removeRelationship,
        hasRelationshipPair
    } = useContext(PlayerContext);

    return {
        webId,
        name,
        setName,
        image,
        setImage,
        relationships,
        addRelationship,
        removeRelationship,
        hasRelationshipPair
    };
}
  