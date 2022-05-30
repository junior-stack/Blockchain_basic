import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Context from "./Context";
import lottery from "./../artifacts/contracts/Lottery.sol/Lottery.json";

const ContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");

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

  const [provider, setProvider] = useState({});

  const [contract, setContract] = useState({});

  // useEffect(() => {
  //   console.log("context contract: ", contract);
  // }, []);

  return (
    <Context.Provider
      value={{
        address,
        setAddress,
        provider,
        setProvider,
        contract,
        setContract,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
