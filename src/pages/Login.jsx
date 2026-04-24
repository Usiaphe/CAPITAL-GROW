import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Auth.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function fetchProfile(userId) {
    // Try up to 5 times with delay (profile may not be created yet)
    for (let i = 0; i < 5; i++) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) return data;

      // Row not found yet, wait and retry
      if (error?.code === "PGRST116") {
        await new Promise((r) => setTimeout(r, 800));
      } else {
        console.error("Profile fetch error:", error);
        break;
      }
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        // --- REGISTER ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });

        if (error) throw error;

        if (data.user) {
          // Create profile immediately
          const { error: profError } = await supabase.from("profiles").upsert(
            {
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              role: "user",
              package: "NONE",
              signal: "NONE",
              investment: 0,
              total_earning: 0,
            },
            { onConflict: "id" },
          );

          if (profError) {
            console.error("Profile creation error:", profError);
          }

          alert("Account created! Logging you in...");
          navigate("/dashboard");
        } else {
          alert("Check your email to confirm your account.");
          setIsRegister(false);
        }
      } else {
        // --- SIGN IN ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Wait briefly for session to settle
        await new Promise((r) => setTimeout(r, 500));

        // Fetch profile to check role
        const profile = await fetchProfile(data.user.id);

        console.log("Signed in user:", data.user.email);
        console.log("Profile found:", profile);

        if (!profile) {
          // Profile missing — create it then go to dashboard
          await supabase.from("profiles").upsert(
            {
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || "",
              role: "user",
              package: "NONE",
              signal: "NONE",
              investment: 0,
              total_earning: 0,
            },
            { onConflict: "id" },
          );
          navigate("/dashboard");
          return;
        }

        const role = profile.role?.trim().toLowerCase();
        console.log("Role detected:", role);

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>CAPITAL GROW</span>
        </div>
        <h1 className={styles.title}>
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <p className={styles.subtitle}>
          {isRegister ? "Start investing today" : "Sign in to continue"}
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <div className={styles.field}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}

          <div className={styles.field}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isRegister
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>

        <p className={styles.toggle}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setFullName("");
              setPassword("");
            }}
            disabled={loading}
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
