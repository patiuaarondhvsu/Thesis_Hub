import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ThesesList() {
  const [theses, setTheses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/theses')
      .then(response => {
        setTheses(response.data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Theses List</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {theses.map(thesis => (
          <li key={thesis._id}>
            <strong>{thesis.titlename}</strong> - {thesis.category} ({thesis.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThesesList;
