import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import BuyTicket from "./Pages/BuyTicket/BuyTicket";
import OrganizerPage from "./Pages/OrganizerPage/OrganizerPage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/buy" element={<BuyTicket />} />
      <Route path="/organizer" element={<OrganizerPage />} />
    </Routes>
  );
}

export default App;
