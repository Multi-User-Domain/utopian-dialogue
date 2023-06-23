import React, {
  ReactElement,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../components/lib/constants";
import { IMessage } from "../dialogueContext";
import { performers, PerformerNames } from "../../components/lib/performers";
    
/**
 * The source of truth for the world data. Authentication provider
 */

export interface IRemoteWorldContext {
  world?: any,
  setWorld?: (world) => any,
  describeObject?: (jsonld: any, forceRemote?: boolean) => Promise<IMessage>;
}

export const RemoteWorldContext = createContext<IRemoteWorldContext>({

});

interface IMudAccountProvider {
  children: ReactNode;
}

export const RemoteWorldProvider = ({children,}: IMudAccountProvider): ReactElement => {

    const [world, setWorldInternal] = useState(null);

    // TODO: this shouldn't be explicit - use a content negotiation
    const sceneDescriptionEndpoint = API_URL + "content/sceneDescription/";

    const setWorld = (world: any) => {
      setWorldInternal(world);
    }

    const describeObject = (jsonld: any, forceRemote: boolean=false) => {
      const keys = Object.keys(jsonld);

      const describeObjectRemote = () => {
        return new Promise<IMessage>((resolve, reject) => {
            let fetchUrl = null;

            if(keys.includes("mudcontent:simpleObjectDescriptionEndpoint"))
                fetchUrl = jsonld["mudcontent:simpleObjectDescriptionEndpoint"];
            else if (keys.includes("mudcontent:sceneDescriptionEndpoint")) 
                fetchUrl = jsonld["mudcontent:sceneDescriptionEndpoint"];
            else if(sceneDescriptionEndpoint != null) fetchUrl = sceneDescriptionEndpoint;
            else 
                return reject("JSON-LD data given missing any properties for describing the object with the MUD Content protocol, and no default is set");

            let postData = jsonld;

            axios.post(fetchUrl, postData).then((response) => {
                let jsonld = response.data;
                let keys = Object.keys(jsonld);

                // TODO: choosing a sense when multiple are returned by the server
                let targetProperty = "mudcontent:sees";

                if(!keys.includes(targetProperty)) return reject("server responded without known content structure");

                if(!Object.keys(jsonld[targetProperty]).includes("mudcontent:hasText")) return reject("server responded without required hasText field");

                // TODO: other senses should have other performers if available, e.g. hears
                // mudcontent:originatesFrom property

                // process response into an IMessage
                return resolve({
                  content: <Text>{jsonld["mudcontent:hasText"]}</Text>,
                  performer: performers[PerformerNames.NULL_PERFORMER]
                  // TODO: server might allow for certain responses - e.g. to elaborate on the content
                  // getResponses: response.getResponses
                });
            })
            .catch((err) => reject(err));
        });
      }

      // TODO: when to resolve something locally?
      // if(forceRemote) return describeObjectRemote();
      return describeObjectRemote();
    }

    return (
      <RemoteWorldContext.Provider
        value={{
          world,
          setWorld,
          describeObject
        }}
      >
        {children}
      </RemoteWorldContext.Provider>
    );
};
  