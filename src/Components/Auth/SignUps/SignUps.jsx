import { useState } from "react";
// import { supabase} from "../../Supabase/Supabase.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    // Insert profile info into users table
    await supabase.from("users").insert({
      id: data.user.id,
      name,
    });

    navigate("/user/dashboard");
  };

  return (
    <form onSubmit={handleSignUp} style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign Up</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUp;