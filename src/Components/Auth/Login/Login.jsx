import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const username = e.target.username.value
    const password = e.target.password.value

    if (!username || !password) {
      alert('Please fill in all fields')
      setLoading(false)
      return
    }

    // Here we will connect to Supabase later
    // For now, simulate success
    alert(`Welcome back, ${username}!`)
    navigate('/user/dashboard')
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">
          AUTO-<span>CAPITAL</span>
        </h1>
        <h2 className="login-subtitle">Log In</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="login-label">
              Username <span>*</span>
            </label>
            <input type="text" name="username" required className="login-input" />
          </div>

          <div>
            <label className="login-label">
              Password <span>*</span>
            </label>
            <input type="password" name="password" placeholder="Enter Password" required className="login-input" />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" disabled={loading} className="login-button">
            Sign in
          </button>
        </form>

        <p className="login-signup">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>

        <p className="login-copyright">
          © Copyright 2023 World of Forex. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

