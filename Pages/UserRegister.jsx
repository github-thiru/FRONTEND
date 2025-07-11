import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      alert('User registered successfully');
      navigate('/user/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>User Registration</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleRegister}>Register</button><br /><br />
      <p>Already registered? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/user/login')}>Login</span></p>
    </div>
  );
}

export default UserRegister;
