import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const res = await axios.post('/register', { name, email, password });

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-title">CAPITAL <span>GROW</span></h1>
        <h2 className="register-subtitle">Create Account</h2>

        <form className="register-form" onSubmit={registerUser}>
          <div>
            <label className="register-label">Full Name <span>*</span></label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter your name..."
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="register-label">Email <span>*</span></label>
            <input
              className="register-input"
              type="email"
              placeholder="Enter email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="register-label">Password <span>*</span> (min 8 chars)</label>
            <input
              className="register-input"
              type="password"
              placeholder="Enter password..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              minLength={8}
            />
          </div>

          <button className="register-button" type="submit">REGISTER</button>
        </form>

        <p className="register-login">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        <p className="register-copyright">&copy; 2025 Capital Grow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
