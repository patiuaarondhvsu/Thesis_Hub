// src/UsersPage.js
import React, { useState } from 'react';
import './UsersPage.css';
import Sidebar from './Sidebar';
import './Sidebar.css';
import Header from './Header';
import Footer from './Footer';

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    { id: 1, name: 'Aldrian Regala', email: 'dhvsu.edu.ph' },
    { id: 2, name: 'Aaron Adrian', email: 'dhvsu.edu.ph' },
    { id: 3, name: 'Jericho Reyes', email: 'dhvsu.edu.ph' },
    { id: 4, name: 'Ivan Reyes', email: 'dhvsu.edu.ph' },
    // Add more data as needed
  ]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

    // eslint-disable-next-line no-unused-vars
    const updateData = () => {
      setData([...data, { id: 4, name: 'New Person', email: 'dhvsu.edu.ph' }]);
    
     };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
    {/* Header */}
    <Header />

    <div className="main-page">
      <Sidebar isVisible={sidebarVisible} />
      <div className={`content ${sidebarVisible ? 'sidebar-open' : ''}`}>
        <button onClick={toggleSidebar} className="menu-button">
          ☰
        </button>
        <h1>Users</h1>
        <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-bar"
          /> 
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>   


    
    </div>
      {/* Footer */}
      <Footer />
  </div>
);
}

export default UsersPage;
