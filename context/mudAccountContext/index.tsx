import React, {
  ReactElement,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
  
/**
 * The source of truth for the player data. Authentication provider
 */

export interface IMudAccountContext {
  webId?: string;
  login?: (un: string) => boolean;
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

  return (
    <MudAccountContext.Provider
      value={{
        webId,
        login
      }}
    >
      {children}
    </MudAccountContext.Provider>
  );
};
