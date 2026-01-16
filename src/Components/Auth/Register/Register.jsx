import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      const res = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password,
      });

      // handle errors from backend
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success('Registration successful! Welcome!');

        // navigate after registration
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={registerUser}>
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter name..."
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

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

      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;