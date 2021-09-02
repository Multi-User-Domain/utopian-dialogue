import React, { lazy, createContext, ReactElement, useState } from "react";
import Home from "../../components/frames/home"

export interface INarrativeContext {
    getActiveFrameElement?: () => Promise<ReactElement>;
};

export const NarrativeContext = createContext<INarrativeContext>({});

// a dictionary of React Element import routes. Register your frames here!
const frameDictionary = {
    // TODO: code-splitting will improve performance for this design greatly at scale
    // however it involves using another format from IIEF or UMD
    // look into using ESM format (had difficulties bundling this)
    //'home': lazy(() => import('../../components/frames/home')),
    'home': Home
}

export const NarrativeProvider = ({
    children
}): ReactElement => {

    const [activeFrame, setActiveFrame] = useState('home');

    const getActiveFrameElement: () => Promise<ReactElement> = () => {
        //return import('../../components/frames/' + frameDictionary[activeFrame]);
        //return frameDictionary[activeFrame];
        return new Promise<ReactElement>((resolve, reject) => {
            return resolve(frameDictionary[activeFrame]);
        });
    }

    return(
        <NarrativeContext.Provider
            value={{
                getActiveFrameElement
            }}
        >
            {children}
        </NarrativeContext.Provider>
    );
};
