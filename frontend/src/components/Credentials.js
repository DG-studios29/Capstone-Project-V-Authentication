import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Credentials = ({ divisionId, token }) => {
  const [credentials, setCredentials] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/credentials/division/${divisionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCredentials(response.data);
      } catch (err) {
        setMessage(err.response?.data?.error || 'An error occurred while fetching credentials');
      }
    };

    if (divisionId) {
      fetchCredentials();
    }
  }, [divisionId, token]);

  const handleAddCredential = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/credentials/division/${divisionId}`, {
        name,
        username,
        password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCredentials([...credentials, response.data]);
      setName('');
      setUsername('');
      setPassword('');
      setMessage('Credential added successfully');
    } catch (err) {
      setMessage(err.response?.data?.error || 'An error occurred while adding the credential');
    }
  };

  return (
    <div>
      <h2>Credentials</h2>
      {message && <p>{message}</p>}
      <ul>
        {credentials.map(credential => (
          <li key={credential._id}>{credential.name} - {credential.username}</li>
        ))}
      </ul>
      <h3>Add Credential</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAddCredential}>Add Credential</button>
    </div>
  );
};

export default Credentials;
