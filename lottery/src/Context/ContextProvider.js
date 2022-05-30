import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Context from "./Context";
import lottery from "./../artifacts/contracts/Lottery.sol/Lottery.json";

const ContextProvider = ({ children }) => {
  // const [address, setAddress] = useState("");

  // async function loadContract() {
  //   if (typeof window.ethereum !== "undefined") {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     console.log({ provider });
  //     const contract = new ethers.Contract(address, lottery.abi, provider);
  //     try {
  //       const data = await contract.price();
  //       console.log("data: ", data);
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   }
  // }

  // const [provider, setProvider] = useState(
  //   new ethers.providers.Web3Provider(window.ethereum)
  // );

  // const [contract, setContract] = useState(
  //   new ethers.Contract(address, lottery.abi, provider)
  // );

  const address = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
