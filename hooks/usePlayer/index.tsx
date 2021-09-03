import React, {
    useContext
} from 'react';

import {
    IPlayerContext,
    PlayerContext
} from '../../context/playerContext';

export default function usePlayer() : IPlayerContext {
    const {
        name,
        setName,
        image,
        setImage
    } = useContext(PlayerContext);

    return {
        name,
        setName,
        image,
        setImage
    };
}
  