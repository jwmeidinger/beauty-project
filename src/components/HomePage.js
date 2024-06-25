// src/components/HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import "./Home.css";

const HomePage = () => {
  const [photoName, setPhotoName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/map", { state: { photoName } });
  };

  return (
    <>
      <NavBar />
      <div className="home-page">
        <h2>Find your Styling Services</h2>
        <p>Here to help you find your barber, salon, or cosmetics.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Upload a Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoName(e.target.files[0].name)}
            />
          </label>
          <button type="submit">Find your beauty needs</button>
        </form>
      </div>
    </>
  );
};

export default HomePage;
