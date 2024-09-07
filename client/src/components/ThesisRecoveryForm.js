// src/components/ThesisRecoveryForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ThesisRecoveryForm = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`/api/thesis/recover/${id}`);
      setMessage(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>Recover Thesis</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="thesisId">Thesis ID:</label>
          <input
            type="text"
            id="thesisId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Recover Thesis</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ThesisRecoveryForm;
