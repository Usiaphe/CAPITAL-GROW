import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Privacy from "./Components/Privacy/Privacy.jsx";
import FAQ from "./Components/FAQ/FAQ.jsx";
import Login from "./Components/Auth/Login/Login.jsx";
import Register from "./Components/Auth/Register/Register.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./Context/userContext.jsx"


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  // Pages where Navbar should NOT show
  const hideNavbarRoutes = ["/login", "/register", "/dashboard"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
    <UserContextProvider>

      {showNavbar && <Navbar />}
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;