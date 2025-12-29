import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

// ---------- Admin Protected Route ----------
export const ProtectedAdminRoute = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading...</div>;

  if (!user) return <RedirectToSignIn />;

  if (user.publicMetadata?.role !== "admin") return <Navigate to="/user/dashboard" replace />;

  return children;
};

// ---------- User Protected Route ----------
export const ProtectedUserRoute = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading...</div>;

  if (!user) return <RedirectToSignIn />;

  if (user.publicMetadata?.role !== "user") return <Navigate to="/admin/dashboard" replace />;

  return children;
};