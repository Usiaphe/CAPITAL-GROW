import { useSignIn } from "@clerk/clerk-react";

export default function Login() {
  const { signIn, isLoaded } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isLoaded) return;

    try {
      await signIn.create({ identifier: email, password });
      alert("Login successful!");
      window.location.href = "/userdashboard"; // redirect
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" required />
      <input name="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}