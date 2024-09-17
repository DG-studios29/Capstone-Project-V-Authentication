import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Credentials = ({ divisionId, token, role }) => {
  const [credentials, setCredentials] = useState([]);
  const [message, setMessage] = useState('');
  const [newCredential, setNewCredential] = useState({ name: '', value: '' });

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/credentials/division/${divisionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCredentials(response.data);
      } catch (err) {
        setMessage('Error fetching credentials');
        console.error(err);
      }
    };

    if (divisionId) {
      fetchCredentials();
    }
  }, [divisionId, token]);

  const addCredential = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/credentials/division/${divisionId}`, newCredential, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredentials([...credentials, response.data]);
      setNewCredential({ name: '', value: '' });
      setMessage('Credential added successfully');
    } catch (err) {
      setMessage('Error adding credential');
      console.error(err);
    }
  };

  const updateCredential = async (credentialId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/credentials/${credentialId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Credential updated successfully');
    } catch (err) {
      setMessage('Error updating credential');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Credentials</h2>
      <p>{message}</p>
      <ul>
        {credentials.map(credential => (
          <li key={credential._id}>
            {credential.name}: {credential.value}
            {role === 'management' && (
              <button onClick={() => updateCredential(credential._id, { name: credential.name, value: credential.value })}>
                Update
              </button>
            )}
          </li>
        ))}
      </ul>

      {role === 'normal' || role === 'management' ? (
        <div>
          <h3>Add Credential</h3>
          <input
            type="text"
            placeholder="Name"
            value={newCredential.name}
            onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Value"
            value={newCredential.value}
            onChange={(e) => setNewCredential({ ...newCredential, value: e.target.value })}
          />
          <button onClick={addCredential}>Add Credential</button>
        </div>
      ) : null}
    </div>
  );
};

export default Credentials;
