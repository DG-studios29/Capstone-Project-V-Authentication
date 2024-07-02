// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login the user
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      toast.success('Login successful');  // Display success message
      localStorage.setItem('token', res.data.token);  // Store token in local storage
    } catch (err) {
      toast.error('Login failed');  // Display error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
