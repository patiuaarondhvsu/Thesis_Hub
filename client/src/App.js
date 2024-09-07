// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UsersPage from './components/UsersPage';
import ThesesPage from './components/ThesesPage';  
import LogsPage from './components/LogsPage';
import ProfileModal from './components/ProfileModal'; 
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import UploadForm from './components/UploadForm';
import EditForm from './components/EditForm';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/theses" element={<ThesesPage />} /> 
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/profile" element={<ProfileModal />} />
          <Route path="/main" element={<MainPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
