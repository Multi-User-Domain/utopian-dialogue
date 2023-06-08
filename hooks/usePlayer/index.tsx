import React, {
    useContext
} from 'react';

import {
    IPlayerContext,
    PlayerContext
} from '../../context/playerContext';

export default function usePlayer() : IPlayerContext {
    const {
        playerPerformer,
        setName,
        setImage,
        relationships,
        addRelationship,
        removeRelationship,
        hasRelationshipPair,
        hasRelationshipStrongerThan,
        hasRelationshipWeakerThan,
        getRelationshipPair,
        buildRelationshipObject,
        createCharacter
    } = useContext(PlayerContext);

    return {
        playerPerformer,
        setName,
        setImage,
        relationships,
        addRelationship,
        removeRelationship,
        hasRelationshipPair,
        hasRelationshipStrongerThan,
        hasRelationshipWeakerThan,
        getRelationshipPair,
        buildRelationshipObject,
        createCharacter
    };
}
  