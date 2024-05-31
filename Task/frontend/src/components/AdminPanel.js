// src/components/AdminPanel.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = ({ token }) => {
  const [userId, setUserId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [ouId, setOuId] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleAssignDivision = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/assign-division',
        { userId, divisionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response ? err.response.data.error : 'Error assigning division');
    }
  };

  const handleAssignOu = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/assign-ou',
        { userId, ouId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response ? err.response.data.error : 'Error assigning OU');
    }
  };

  const handleChangeRole = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/change-role',
        { userId, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response ? err.response.data.error : 'Error changing role');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Assign User to Division</h3>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Division ID"
          value={divisionId}
          onChange={(e) => setDivisionId(e.target.value)}
        />
        <button onClick={handleAssignDivision}>Assign Division</button>
      </div>
      <div>
        <h3>Assign User to OU</h3>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="OU ID"
          value={ouId}
          onChange={(e) => setOuId(e.target.value)}
        />
        <button onClick={handleAssignOu}>Assign OU</button>
      </div>
      <div>
        <h3>Change User Role</h3>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handleChangeRole}>Change Role</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default AdminPanel;
