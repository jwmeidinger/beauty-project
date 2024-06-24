// src/components/HomePage/HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [photoName, setPhotoName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/map", { state: { photoName } });
  };

  return (
    <div className="home-page">
      <h1>DEMO</h1>
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
  );
};

export default HomePage;
