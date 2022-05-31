import { useState } from "react";
import { ethers } from "ethers";
import Context from "./Context";
import lottery from "./../artifacts/contracts/Lottery.sol/Lottery.json";
import mokToken from "./../artifacts/contracts/MokToken.sol/MokToken.json";

const ContextProvider = ({ children }) => {
  const address = process.env.REACT_APP_ADDRESS;

  const tokenAddress = process.env.REACT_APP_TOKENADDRESS;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const [ProviderContract, setProviderContract] = useState(
    new ethers.Contract(address, lottery.abi, provider)
  );

  const [SignerContract, setSignerContract] = useState(
    new ethers.Contract(address, lottery.abi, signer)
  );

  const [Address, setAddress] = useState("");

  const [ManagerOne, setManagerOne] = useState("");

  const [ManagerTwo, setManagerTwo] = useState("");

  const [Owner, setOwner] = useState("");

  const [StartTime, setStartTime] = useState(Date.now());

  const [TokenProviderContract, setTokenProviderContract] = useState(
    new ethers.Contract(tokenAddress, mokToken.abi, provider)
  );

  // useEffect(() => {
  //   console.log("context contract: ", contract);
  // }, []);

  return (
    <Context.Provider
      value={{
        ProviderContract,
        setProviderContract,
        SignerContract,
        setSignerContract,
        Address,
        setAddress,
        ManagerOne,
        setManagerOne,
        ManagerTwo,
        setManagerTwo,
        Owner,
        setOwner,
        StartTime,
        setStartTime,
        TokenProviderContract,
        setTokenProviderContract,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
