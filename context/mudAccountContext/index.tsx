import React, {
  ReactElement,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "../../components/lib/constants";
import { IPerformer } from "../../components/lib/performers";
  
/**
 * The source of truth for the player data. Authentication provider
 */

export interface IMudAccountContext {
  webId?: string;
  login?: (un: string) => boolean;
  characters?: IPerformer[];
}

export const MudAccountContext = createContext<IMudAccountContext>({

});

interface IMudAccountProvider {
  children: ReactNode;
}

export const MudAccountProvider = ({
  children,
}: IMudAccountProvider): ReactElement => {
  //const { session, fetch } = useSession();
  //const [webId, setWebId] = useState(session.info.webId);
  const [webId, setWebId] = useState(null);
  const [characters, setCharacters] = useState<IPerformer[]>([]);

  // TODO: this shouldn't be explicit - use a content negotiation
  const charactersEndpoint = API_URL + "characters/by/";

  // TODO: authentication
  const login = (un: string) => {
    setWebId(un);
    return true;
  }

  /*useEffect(() => {
    let workingWebId: string = session.info.webId;
    if (workingWebId == null) return;
    setWebId(workingWebId);

    // following the Web-ID gives us the authenticated user's profile card, which we can use to find an associated mud account
    // TODO: handle case that this information does not exist
    getSolidDataset(workingWebId).then((profileDataSet) => {
      const profileThing = getThing(profileDataSet, workingWebId);
      const accountUrl = getUrl(profileThing, FOAF.account);

      // get MUD:Account from the user's profile card
      getSolidDataset(accountUrl).then((accountDataSet) => {
        const accountThing = getThing(accountDataSet, accountUrl);

        console.log("successfully got MUD account data! " + accountUrl);
      });
    });
  }, [session]);*/

  useEffect(() => {
    if(webId == null || webId.length == 0) return;

    axios.get(charactersEndpoint + webId + "/").then(res => {
      let arr = [];
      for(let i = 0; i < res.data.length; i++) {
          arr.push({
            name: res.data[i]["n:fn"],
            imgSrc: res.data[i]["foaf:depiction"]
          })
      }
      setCharacters(arr);
    });
  }, [webId]);

  return (
    <MudAccountContext.Provider
      value={{
        webId,
        login,
        characters
      }}
    >
      {children}
    </MudAccountContext.Provider>
  );
};
