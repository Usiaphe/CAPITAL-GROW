import { useSignUp } from "@clerk/clerk-react";

export default function Register() {
  const { signUp, isLoaded } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isLoaded) return;

    try {
      // Create user in Clerk
      const { userId } = await signUp.create({
        emailAddress: email,
        password,
      });

      // Save extra info in MongoDB
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: userId, fullName, email }),
      });

      alert("Registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Error registering");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <input name="password" placeholder="Password" type="password" required />
      <button type="submit">Register</button>
    </form>
  );
}