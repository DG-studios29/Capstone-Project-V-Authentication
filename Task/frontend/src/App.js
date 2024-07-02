import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Credentials from './components/Credentials';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/divisions');
        setDivisions(response.data);
      } catch (err) {
        console.error('Error fetching divisions:', err);
      }
    };
    fetchDivisions();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password, divisionId });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'An error occurred during registration');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, role, divisionId } = response.data;
      setToken(token);
      setRole(role);
      setDivisionId(divisionId);
      setMessage('Login successful');
    } catch (err) {
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
      <div className="mb-3">
        <select
          className="form-control"
          value={divisionId}
          onChange={(e) => setDivisionId(e.target.value)}
        >
          <option value="">Select Division</option>
          {divisions.map((division) => (
            <option key={division._id} value={division._id}>
              {division.name}
            </option>
          ))}
        </select>
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
