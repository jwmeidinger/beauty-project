// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
        <div className="nav-container">
            <div className="nav-logo">Name of platform</div>
            <div className="nav-links">
                <Link to="/map">Map</Link>
                <Link to="/">Home</Link>
            </div>
        </div>
    </nav>
  );
};

export default NavBar;