// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import BusinessMap from "./components/BusinessMap.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<BusinessMap />} />
      </Routes>
    </Router>
  );
}

export default App;
