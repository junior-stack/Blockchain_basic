import React from "react";

const Context = React.createContext({
  address: "",
  setAddress: () => {},

  provider: {},
  setProvider: () => {},

  signer: {},
  setSigner: () => {},

  contract: {},
  setContract: () => {},
});

export default Context;
