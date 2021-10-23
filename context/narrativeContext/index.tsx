import React, { lazy, createContext, ReactElement, useState, useEffect } from "react";
import Home from "../../components/frames/home"
import WhoAmI from "../../components/frames/whoAmI";
import WhereAmI from "../../components/frames/whereAmI";
import Agora from "../../components/frames/agora";
import HolyBuilding from "../../components/frames/holyBuilding";

export interface INarrativeContext {
    activeFrame: ReactElement;
    setFrame?: (name: string) => void;
};

export const NarrativeContext = createContext<INarrativeContext>({activeFrame: null});

// a dictionary of React Element import routes. Register your frames here!
const frameDictionary = {
    // TODO: code-splitting will improve performance for this design greatly at scale
    // however it involves using another format from IIEF or UMD
    // look into using ESM format (had difficulties bundling this)
    //'home': lazy(() => import('../../components/frames/home')),
    'home': Home,
    'whoAmI': WhoAmI,
    'whereAmI': WhereAmI,
    'agora': Agora,
    'holyBuilding': HolyBuilding
}

export const NarrativeProvider = ({
    children
}): ReactElement => {

    const [activeFrame, setActiveFrame] = useState<ReactElement>(null);

    const getActiveFrameElement: (name: string) => ReactElement = (name: string) => {
        return frameDictionary[name]({followLink: setFrame});
    }

    const setFrame = (name: string) => {
        if(name in frameDictionary) {
            setActiveFrame(getActiveFrameElement(name));
            return;
        }
        console.error("attempt made to set frame to " + name + " but this key doesn't exist!");
    }

    useEffect(() => {
        setFrame("home");
    }, []);

    return(
        <NarrativeContext.Provider
            value={{
                activeFrame,
                setFrame
            }}
        >
            {children}
        </NarrativeContext.Provider>
    );
};
