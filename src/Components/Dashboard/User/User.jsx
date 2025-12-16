import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <h1>hello</h1>
    </div>
    
  );
};

export default User;