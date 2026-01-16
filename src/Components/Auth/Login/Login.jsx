import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      // call backend
      const res = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      // backend sends error?
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        // reset form
        setData({ email: '', password: '' });

        toast.success('Login successful!');

        // navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={loginUser}>
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email..."
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password..."
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;