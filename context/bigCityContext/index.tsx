import React, { createContext, ReactElement, useState } from "react";

export enum World {
    GOVERNANCE = "GOVERNANCE",
    RULER = "RULER",
    PRISON = "PRISON",
    ARMOURY_DESTROYED = "ARMOURY_DESTROYED"
};

export enum GovernanceStates {
    MONARCHY = "absolute monarchy",
    AGORA = "agora",
    MILITARY_CONSULATE = "Military Consulate",
    MOB_RULE = "Mob Rule"
}

export enum PrisonStates {
    ABOLISHED = "abolished",
    DETERRANT = "deterrant"
}

export interface ILocation {
    name: string;
    visited: boolean;
    frameKey: string;
}

export interface IBigCityContext {
    world?: any;
    setWorldItem?: (key: string, value: any) => void;
    locations?: ILocation[];
    visitLocation?: (name: string) => void;
};

export const BigCityContext = createContext<IBigCityContext>({});

// provides the locations in Big City for the player to visit and their definition

export const BigCityProvider = ({
    children
}): ReactElement => {

    const [world, setWorld] = useState({});
    const [locations, setLocations] = useState([
        {
            name: 'Holy Spire',
            visited: false,
            frameKey: 'holySpire'
        },
        {
            name: 'Armoury',
            visited: false,
            frameKey: 'armoury'
        }
    ]);

    const setWorldItem = (key: string, value: any) => {
        setWorld(prevWorld => (
            {...prevWorld, [key]: value}
        ));
    }

    const visitLocation = (name: string) => {
        if(name == null || !(name in locations)) return;

        locations[name].visited = true;
        setLocations({...locations});
    }

    return(
        <BigCityContext.Provider
            value={{
                world,
                setWorldItem,
                locations,
                visitLocation
            }}
        >
            {children}
        </BigCityContext.Provider>
    );
};
