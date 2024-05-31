import React, { useState } from 'react';
import axios from 'axios';
import Credentials from './components/Credentials';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [divisionId, setDivisionId] = useState(''); 
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      console.log('Registration response:', response);
      setMessage(response.data.message);
    } catch (err) {
      console.error('Error during registration:', err);
      setMessage(err.response?.data?.error || 'An error occurred during registration');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      console.log('Login response:', response);
      setToken(response.data.token);
      setRole(response.data.role); // Ensure that the role is returned in the response
      setMessage('Login successful');
    } catch (err) {
      console.error('Error during login:', err);
      setMessage(err.response?.data?.error || 'An error occurred during login');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Cool Tech Authentication</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        <button className="btn btn-success" onClick={handleLogin}>Login</button>
      </div>
      <p className="mt-3 text-center">{message}</p>
      {token && (
        <div>
          <Credentials divisionId={divisionId} token={token} />
          {role === 'admin' && <AdminPanel token={token} />}
        </div>
      )}
    </div>
  );
};

export default App;
