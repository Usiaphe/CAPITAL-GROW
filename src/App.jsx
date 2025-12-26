import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Privacy from "./Components/Privacy/Privacy.jsx";
import FAQ from "./Components/FAQ/FAQ.jsx";
import Login from "./Components/Auth/Login/Login.jsx"
import SignUps from "./Components/Auth/SignUps/SignUps.jsx"
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path ="/login" element={<Login />} />
        <Route path ="/SignUPs" element={<SignUps />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </>
  );
}

export default App;
