import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignUp } from '@clerk/clerk-react'
import { supabase } from "../../../Supabase/SupabaseClient"
import './Register.css'  // Your normal CSS from before

export default function Register() {
  const navigate = useNavigate()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded) return

    setLoading(true)

    const form = e.target
    const password = form.password.value
    const confirmPassword = form.confirmPassword.value
    const email = form.email.value
    const confirmEmail = form.confirmEmail.value

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      setLoading(false)
      return
    }
    if (email !== confirmEmail) {
      alert('Emails do not match!')
      setLoading(false)
      return
    }
    if (!form.terms.checked) {
      alert('You must accept terms and conditions')
      setLoading(false)
      return
    }

    try {
      // Step 1: Create user with Clerk
      const result = await signUp.create({
        emailAddress: email,
        password: password,
        username: form.username.value,
        firstName: form.fullName.value,
      })

      // Step 2: Activate the session (log them in)
      await setActive({ session: result.createdSessionId })

      // Step 3: Save extra data to Supabase
      const { error } = await supabase.from('profiles').insert({
        id: result.createdUserId,
        full_name: form.fullName.value,
        username: form.username.value,
        bitcoin_wallet: form.bitcoinWallet.value,
        usdt_wallet: form.usdtWallet.value,
        secret_question: form.secretQuestion.value,
        secret_answer: form.secretAnswer.value,
        upline: form.upline.value || 'n/a',
        balance: 0,
        total_profit: 0,
        active_trade: 0,
        pending_withdrawal: 0,
        total_deposit: 0,
        total_withdrawal: 0,
        role: 'user'
      })

      if (error) throw error

      alert('Registration successful! Redirecting to login.')
      navigate('/login')
    } catch (error) {
      alert(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-title">
          AUTO-<span>CAPITAL</span>
        </h1>

        <form onSubmit={handleSubmit} className="register-form">
          {/* All inputs same as before */}
          <input type="text" name="fullName" placeholder="Your Full Name" required className="register-input" />
          <input type="text" name="username" placeholder="Your Username" required className="register-input" />
          <input type="password" name="password" placeholder="Define Password" required className="register-input" />
          <input type="password" name="confirmPassword" placeholder="Retype Password" required className="register-input" />
          <input type="text" name="bitcoinWallet" placeholder="Your Bitcoin payment Wallet ID" className="register-input" />
          <input type="text" name="usdtWallet" placeholder="Your USDT bep20 Wallet ID" className="register-input" />
          <input type="email" name="email" placeholder="Your E-mail Address" required className="register-input" />
          <input type="email" name="confirmEmail" placeholder="Retype Your E-mail" required className="register-input" />
          <input type="text" name="secretQuestion" placeholder="Secret Question" required className="register-input" />
          <input type="text" name="secretAnswer" placeholder="Secret Answer" required className="register-input" />
          <div className="register-upline">
            <span>Your Upline:</span>
            <input type="text" name="upline" placeholder="n/a" className="register-input" />
            <span className="n-a">N/A (n/a)</span>
          </div>

          <label className="register-terms">
            <input type="checkbox" name="terms" required />
            <span>Terms and conditions</span>
          </label>

          <button type="submit" disabled={loading} className="register-button">
            {loading ? 'Registering...' : 'Register'}
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
  )
}