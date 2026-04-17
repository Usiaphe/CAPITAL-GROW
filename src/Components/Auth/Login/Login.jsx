import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../../Context/userContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const res = await axios.post('/login', { email, password });

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setData({ email: '', password: '' });
        setUser(res.data);
        toast.success('Login successful!');

        // redirect based on role
        if (res.data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">CAPITAL <span>GROW</span></h1>
        <h2 className="login-subtitle">Sign In</h2>

        <form className="login-form" onSubmit={loginUser}>
          <div>
            <label className="login-label">Email <span>*</span></label>
            <input
              className="login-input"
              type="email"
              placeholder="Enter email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="login-label">Password <span>*</span></label>
            <input
              className="login-input"
              type="password"
              placeholder="Enter password..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <button className="login-button" type="submit">LOGIN</button>
        </form>

        <p className="login-signup">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>

        <p className="login-copyright">&copy; 2025 Capital Grow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
