// src/components/Credentials.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Credentials = ({ divisionId, token }) => {
  const [credentials, setCredentials] = useState([]);
  const [newCredential, setNewCredential] = useState({ name: '', username: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/credentials/division/${divisionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCredentials(response.data);
      } catch (err) {
        setMessage(err.response ? err.response.data.error : 'Error fetching credentials');
      }
    };
    fetchCredentials();
  }, [divisionId, token]);

  const handleAddCredential = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/credentials/division/${divisionId}`, newCredential, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredentials([...credentials, response.data]);
      setNewCredential({ name: '', username: '', password: '' });
      setMessage('Credential added successfully');
    } catch (err) {
      setMessage(err.response ? err.response.data.error : 'Error adding credential');
    }
  };

  const handleUpdateCredential = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/credentials/credential/${id}`, newCredential, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredentials(credentials.map((cred) => (cred._id === id ? response.data : cred)));
      setNewCredential({ name: '', username: '', password: '' });
      setMessage('Credential updated successfully');
    } catch (err) {
      setMessage(err.response ? err.response.data.error : 'Error updating credential');
    }
  };

  return (
    <div>
      <h2>Credentials</h2>
      {credentials.map((credential) => (
        <div key={credential._id}>
          <p>{credential.name}</p>
          <p>{credential.username}</p>
          <button onClick={() => handleUpdateCredential(credential._id)}>Update</button>
        </div>
      ))}
      <h3>Add New Credential</h3>
      <input
        type="text"
        placeholder="Name"
        value={newCredential.name}
        onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        value={newCredential.username}
        onChange={(e) => setNewCredential({ ...newCredential, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newCredential.password}
        onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
      />
      <button onClick={handleAddCredential}>Add Credential</button>
      <p>{message}</p>
    </div>
  );
};

export default Credentials;
