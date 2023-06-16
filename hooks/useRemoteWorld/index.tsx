import React, { useContext } from "react";

import {
  IRemoteWorldContext,
  RemoteWorldContext,
} from "../../context/remoteWorldContext";

export function useRemoteWorld(): IRemoteWorldContext {
  const {
    world,
    setWorld
  } = useContext(RemoteWorldContext);

  return {
    world,
    setWorld
  };
}
