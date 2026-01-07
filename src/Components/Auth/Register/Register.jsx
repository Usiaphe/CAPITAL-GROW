import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // 1. Create Clerk account
      await signUp.create({
        emailAddress: email,
        password,
      });

      // 2. Save name to Clerk profile
      await signUp.update({
        firstName: fullName,
      });

      // 3. Optional: email verification (recommended)
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // 4. Redirect to login or dashboard
      navigate("/login");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-title">
          AUTO-<span>CAPITAL</span>
        </h1>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="fullName"
            placeholder="Your Full Name"
            required
            className="register-input"
          />

          <input
            type="text"
            name="username"
            placeholder="Your Username"
            className="register-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Define Password"
            required
            className="register-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Your E-mail Address"
            required
            className="register-input"
          />

          <label className="register-terms">
            <input type="checkbox" name="terms" required />
            <a href="#"><span>Terms and conditions</span></a>
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-login">
          Already have an account? <a href="/login">Login</a>
        </p>

        <p className="register-copyright">
          © 2018 auto-capital.ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
