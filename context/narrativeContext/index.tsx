import React, { lazy, createContext, ReactElement, useState, useEffect } from "react";
import MainMenu from "../../components/frames/mainMenu";
import Home from "../../components/frames/home"
import WhoAmI from "../../components/frames/whoAmI";
import WhereAmI from "../../components/frames/whereAmI";
//import HolyBuilding from "../../components/frames/holyBuilding";
//import DataSilos from "../../components/frames/dataSilos";
//import DataSilosMudSignup from "../../components/frames/dataSilosMudSignup";
import ReadFromInkStoryFrame from "../../components/frames/readFromInkStoryFrame";

export interface INarrativeContext {
    activeFrame: ReactElement;
    setFrame?: (name: string) => void;
};

export const NarrativeContext = createContext<INarrativeContext>({activeFrame: null});

// a dictionary of React Element import routes. Register your frames here!
export const FRAME_DICTIONARY = {
    'mainMenu': MainMenu,
    'home': Home,
    'whoAmI': WhoAmI,
    'whereAmI': WhereAmI,
    // TODO: the system of using components for each frame will be replaces with URLs for ink stories
    // in the meantime, they can be either a component or a URL to an ink story
    'agora': "https://raw.githubusercontent.com/Multi-User-Domain/utopian-dialogue/master/ink/agora.ink.json",
    //'holySpire': HolyBuilding,
    //'dataSilos': DataSilos,
    //'dataSilosMudSignup': DataSilosMudSignup,
    'readFromInkStoryFrame': ReadFromInkStoryFrame,
}

export const NarrativeProvider = ({
    children
}): ReactElement => {

    const [activeFrame, setActiveFrame] = useState<ReactElement>(null);

    const getActiveFrameElement: (name: string, url?:string) => ReactElement = (name, url) => {
        return FRAME_DICTIONARY[name]({"followLink": setFrame, "url": url});
    }

    const setFrame = (key: string) => {
        if(key in FRAME_DICTIONARY) {
            if(typeof FRAME_DICTIONARY[key] == "string") setActiveFrame(getActiveFrameElement('readFromInkStoryFrame', FRAME_DICTIONARY[key]));
            else setActiveFrame(getActiveFrameElement(key));
            return;
        }
        console.error("attempt made to set frame to " + name + " but this key doesn't exist!");
    }

    useEffect(() => {
        setFrame("mainMenu");
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
