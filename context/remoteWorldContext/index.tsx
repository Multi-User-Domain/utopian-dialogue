import React, {
    ReactElement,
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios from "axios";
  import { API_URL } from "../../components/lib/constants";
    
  /**
   * The source of truth for the world data. Authentication provider
   */
  
  export interface IRemoteWorldContext {
      world?: any,
      setWorld?: (world) => any
  }
  
  export const RemoteWorldContext = createContext<IRemoteWorldContext>({

  });
  
  interface IMudAccountProvider {
    children: ReactNode;
  }
  
  export const MudAccountProvider = ({
    children,
  }: IMudAccountProvider): ReactElement => {

    const [world, setWorld] = useState(null);
  
    // TODO: this shouldn't be explicit - use a content negotiation
    const charactersEndpoint = API_URL + "characters/by/";
  
    return (
      <RemoteWorldContext.Provider
        value={{
            world,
            setWorld
        }}
      >
        {children}
      </RemoteWorldContext.Provider>
    );
  };
  