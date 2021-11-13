import React, { useContext } from "react";

import {
  IMudAccountContext,
  MudAccountContext,
} from "../../context/mudAccountContext";

export function useMudAccount(): IMudAccountContext {
  const {
    webId
  } = useContext(MudAccountContext);

  return {
    webId
  };
}
