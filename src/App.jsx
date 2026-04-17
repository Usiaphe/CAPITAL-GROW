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
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard.jsx";
import { ProtectedUserRoute, ProtectedAdminRoute } from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./Context/userContext.jsx";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register", "/dashboard", "/admin"];

  const showNavbar = !hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
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

        <Route path="/dashboard" element={
          <ProtectedUserRoute>
            <Dashboard />
          </ProtectedUserRoute>
        } />

        <Route path="/admin/*" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
