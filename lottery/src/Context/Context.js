import React from "react";

const Context = React.createContext({
  SignerContract: {},
  setSignerContract: () => {},

  ProviderContract: {},
  setProviderContract: () => {},

  Address: "",
  setAddress: () => {},

  Owner: "",
  setOwner: () => {},

  ManagerOne: "",
  setManagerOne: () => {},

  ManagerTwo: "",
  setManagerTwo: () => {},

  StartTime: {},
  setStartTime: () => {},

  TokenProviderContract: {},
  setTokenProviderContract: () => {},
});

export default Context;
