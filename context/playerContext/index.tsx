import React, { createContext, ReactElement, useState, useEffect } from "react";

export interface IPlayerContext {
    webId?: string;
    name?: string;
    setName?: (string) => void;
    image?: string;
    setImage?: (string) => void;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const [webId, setWebId] = useState("_:player");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    return(
        <PlayerContext.Provider
            value={{
                webId,
                name,
                setName,
                image,
                setImage
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
