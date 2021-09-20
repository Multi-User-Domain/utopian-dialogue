import React, { createContext, ReactElement, useState, useEffect } from "react";

export enum World {
    GOVERNANCE = "GOVERNANCE",
    RULER = "RULER"
};

export interface IBigCityContext {
    world?: any;
    setWorldItem?: (key: string, value: any) => void;
};

export const BigCityContext = createContext<IBigCityContext>({});

// provides the locations in Big City for the player to visit and their definition

export const BigCityProvider = ({
    children
}): ReactElement => {

    const [world, setWorld] = useState({});

    const setWorldItem = (key: string, value: any) => {
        setWorld(prevWorld => (
            {...prevWorld, [key]: value}
        ));
    }

    return(
        <BigCityContext.Provider
            value={{
                world,
                setWorldItem
            }}
        >
            {children}
        </BigCityContext.Provider>
    );
};
