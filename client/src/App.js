// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UsersPage from './components/UsersPage';
import ThesesPage from './components/ThesesPage';  
import LogsPage from './components/LogsPage';
import ProfilePage from './components/ProfileModal';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/theses" element={<ThesesPage />} /> 
          <Route path="/logs" element={<LogsPage/>} /> 
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/main" element={<MainPage/>} />
          <Route path="/login" element={<LoginForm/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
