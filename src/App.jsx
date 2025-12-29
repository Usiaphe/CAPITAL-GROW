
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Privacy from "./Components/Privacy/Privacy.jsx";
import FAQ from "./Components/FAQ/FAQ.jsx";
import Login from "./Components/Auth/Login/Login.jsx";

import UserDashboard from "./Components/Dashboard/UserDashboard.jsx";
import Register from "./Components/Auth/Register/Register.jsx";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
