import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Privacy from "./Components/Privacy/Privacy.jsx";
import FAQ from "./Components/FAQ/FAQ.jsx";

function App() {
  return (
    <Router>
      <>
        <Navbar />

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
