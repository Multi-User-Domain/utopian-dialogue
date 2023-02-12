import React, {
    useContext
} from 'react';

import {
    IBigCityContext,
    BigCityContext
} from '../../context/bigCityContext';

export default function useBigCity() : IBigCityContext {
    const {
        world,
        setWorldItem
    } = useContext(BigCityContext);

    return {
        world,
        setWorldItem
    };
}
  