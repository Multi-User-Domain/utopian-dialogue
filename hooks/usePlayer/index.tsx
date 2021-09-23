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
        incomingRelationships,
        outgoingRelationships,
        addIncomingRelationship,
        addOutgoingRelationship,
        hasIncomingRelationshipPair,
        hasOutgoingRelationshipPair
    } = useContext(PlayerContext);

    return {
        webId,
        name,
        setName,
        image,
        setImage,
        incomingRelationships,
        outgoingRelationships,
        addIncomingRelationship,
        addOutgoingRelationship,
        hasIncomingRelationshipPair,
        hasOutgoingRelationshipPair
    };
}
  