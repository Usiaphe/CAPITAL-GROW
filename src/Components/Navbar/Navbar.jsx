// Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";


const Navbar = () => {


  return (
     <>
    <header className="navbar">
      
      
      {/* Main Navigation - App-Like on Mobile */}
      <div className="main-nav">
        <div className="logo">
          <span className="logo-icon">∞</span>
          <div className="logo-text">
            <span>CAPITAL</span> <span className="grow">GROW</span>
          </div>
        </div>
<nav className="menu">
  <Link to="/home">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/faq">FAQ</Link>
  <Link to="/privacy">Privacy & Policy</Link>
</nav>

        <div className="auth-buttons">
          <Link to="/login">
  <button className="login">LOGIN</button>
</Link>

<span className="separator">|</span>

<Link to="/SignUPs">
  <button className="register">REGISTER</button>
</Link>
        </div>
      </div>
      
    </header>
  
        </>
  );
};

export default Navbar;