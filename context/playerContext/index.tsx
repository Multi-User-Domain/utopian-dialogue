import React, { createContext, ReactElement, useState, useEffect } from "react";

export interface IPlayerContext {
    name?: string;
    setName?: (string) => void;
    image?: string;
    setImage?: (string) => void;
};

export const PlayerContext = createContext<IPlayerContext>({});

export const PlayerProvider = ({
    children
}): ReactElement => {

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    return(
        <PlayerContext.Provider
            value={{
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
