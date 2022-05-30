import React from "react";

const Context = React.createContext({
  SignerContract: {},
  setSignerContract: () => {},

  ProviderContract: {},
  setProviderContract: () => {},

  Address: "",
  setAddress: () => {},
});

export default Context;
