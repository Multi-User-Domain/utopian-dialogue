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
        setWorldItem,
        locations,
        visitLocation
    } = useContext(BigCityContext);

    return {
        world,
        setWorldItem,
        locations,
        visitLocation
    };
}
  