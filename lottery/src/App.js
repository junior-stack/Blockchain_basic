import logo from "./logo.svg";
import { ethers } from "ethers";
import "./App.css";
import ContextProvider from "./Context/ContextProvider";
import Context from "./Context/Context";
import React, { useEffect } from "react";
import lottery from "./artifacts/contracts/Lottery.sol/Lottery.json";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import BuyTicket from "./Pages/BuyTicket/BuyTicket";
import OrganizerPage from "./Pages/OrganizerPage/OrganizerPage";

function App() {
  // useEffect(() => {
  //   const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(address, lottery.abi, signer);
  //   const contract1 = new ethers.Contract(address, lottery.abi, provider);
  //   setProvider(provider);
  //   setContract(contract1);
  //   setAddress(address);
  //   const f = async () => {
  //     const p = await contract1.price();
  //     setPrice(Number(p));
  //     console.log("p: ", Number(p));
  //   };
  //   f();
  //   console.log("contract price1: ", price);
  // }, []);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/buy" element={<BuyTicket />} />
      <Route path="/organizer" element={<OrganizerPage />} />

      {/* About page for manager to select winner and withdraw */}
      {/* <Route path="/about" element={<About />} />
      <Route path="/buy" element={<BuyTicket />} /> */}
    </Routes>
  );
}

export default App;
