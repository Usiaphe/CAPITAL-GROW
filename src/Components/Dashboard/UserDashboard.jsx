import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const { user } = useUser();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    fetch(`/api/auth/me/${user.id}`)
      .then((res) => res.json())
      .then((data) => setFullName(data.fullName))
      .catch(console.error);
  }, [user]);

  return <h1>Welcome, {fullName} 👋</h1>;
}