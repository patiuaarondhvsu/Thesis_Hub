import React, { useState } from 'react';
import './LogsPage.css'; // Ensure this CSS file is updated for layout
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Logs = () => {
  const [logs] = useState([
    { id: 1, message: 'Aldrian logged in', timestamp: '2024-08-23 09:30:00 am' },
    { id: 2, message: 'Ivan updated profile', timestamp: '2024-08-23 10:00:00 pm' },
    { id: 3, message: 'Jericho logged out', timestamp: '2024-08-23 10:15:00 pm' },
    { id: 4, message: 'Admin deleted a user', timestamp: '2024-08-23 11:00:00 am' },
    // Add more logs as needed
  ]);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


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
        <h1>System Logs</h1>
        <table className="log-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.message}</td>
                <td>{log.timestamp}</td>
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
};

export default Logs;