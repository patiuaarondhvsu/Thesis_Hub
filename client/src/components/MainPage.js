import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Date from './Date';
import ProfileModal from './ProfileModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSearch, faUserCircle, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import ChatbotModal from './ChatbotModal'; 

const MyLibraryModal = ({ isOpen, onClose, libraryItems, onDelete, notification }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>My Library</h2>
        {libraryItems.length === 0 ? (
          <p>No items in your library.</p>
        ) : (
          <div className="library-list">
            {libraryItems.map((item, index) => (
              <div key={index} className="library-item">
                <div className="library-item-details">
                  <p className="result-title">{item.title}</p>
                  <p className="result-authors">{item.authors}</p>
                  <p className="result-date">{item.date}</p>
                </div>
                <button className="delete-button" onClick={() => onDelete(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const MainPage = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);
  const [isChatbotModalOpen, setChatbotModalOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState([]);
  const [notification, setNotification] = useState('');

  const toggleProfile = () => setProfileOpen(!isProfileOpen);

  const openProfileModal = () => {
    setProfileModalOpen(true);
    setProfileOpen(false);
  };

  const closeProfileModal = () => setProfileModalOpen(false);

  const closeLibraryModal = () => setLibraryModalOpen(false);

  const openChatbotModal = () => setChatbotModalOpen(true);

  const closeChatbotModal = () => setChatbotModalOpen(false);

  const openDateModal = () => setDateModalOpen(true);

  const closeDateModal = () => setDateModalOpen(false);

  const applyDateSelection = () => {
    closeDateModal();
    handleSearch();
  };

  const handleAddToLibrary = (item) => {
    setLibraryItems([...libraryItems, item]);
    setNotification('Added to your library');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDeleteFromLibrary = (index) => {
    const updatedLibraryItems = libraryItems.filter((_, i) => i !== index);
    setLibraryItems(updatedLibraryItems);
    setNotification('Removed from your library');
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    const searchResults = [
      {
        title: 'TASKGROVE: A TREE-BASED PROJECT MANAGEMENT APPLICATION',
        authors: 'Laxamana, Denzel D., et al.',
        date: 'December 2023',
        link: '#/PDFS/TaskGrove.pdf'
      },
      {
        title: 'COMPAWNION: A PROFILE MANAGEMENT SYSTEM with GEO-LOCATION SYSTEM for NOAH’S ARK DOG AND CAT SHELTER, MABALACAT, PAMPANGA',
        authors: 'De Leon, Aileen P., et al.',
        date: 'December 2023', 
        link: '/PDFS/CS 48_ COMPAWNION with Tables and Figures.pdf'
      },
      {
        title: 'CodeQuest: When Java Programming Meets Playful Learning',
        authors: 'Alcantara, Den Dave M., et al.',
        date: 'December 2023',
        link: '#/PDFS/IT-02 CODEQUEST.pdf'
      },
      {
        title: 'HTEFinder: A Web Application Utilizing Geofencing Technology',
        authors: 'CAguas, Angelica P., et al.',
        date: 'December 2023',
        link: '#/PDFS/HTEFINDER_ A Web Application Utilizing Geofencing Technology.pdf'
      },
      {
        title: 'ANTABE: AN INTELLIGENT GUIDE STICK FOR VISUALLY IMPAIRED',
        authors: 'Baquing, Gemiera M., et al.',
        date: 'December 2023',
        link: '#/PDFS/IT29-ANTABE.pdf'
      },
      {
        title: 'Web-Based Equipment Maintenance Monitoring System for DHVSU Facilities',
        authors: 'Astrologo, Neil Daryl P., et al.',
        date: 'December 2023',
        link: '#/PDFS/IT-22-Web-Based-Equipment-Maintenance-Monitoring-System-for-DHVSU-Facilities-1.pdf'
      },
      {
        title: 'MSWD Online Financial Assistance Program Management System with SMS Notification and Status Tracking',
        authors: 'Bucalin, Christian John Y., et al.',
        date: 'December 2023',
        link: '#/PDFS/MSWD Online Financial Assistance Program Management System with SMS Notification and Status Tracking.pdf'
      },
      {
        title: 'PALE-NGKIHAN: ONLINE MARKET SYSTEM FOR ARAYAT RICE TRADERS',
        authors: 'David, KC Glenn M., et al.',
        date: 'December 2022',
        link: '#/PDFS/IS56- PALENGKIHAN MANUSCRIPT.pdf'
      }
    ];

    const results = searchResults.filter((result) => {
      return (
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.authors.toLowerCase().includes(query.toLowerCase()) ||
        result.date.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredResults(results);
  }, [query]);

  const handleSearch = () => {
    // Search logic...
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/thesishublogowhite.jpg" alt="Logo" className="logo" />

        <div className="libchat-button">
          <button className="library-button" onClick={() => setLibraryModalOpen(true)}>My Library</button>
          <button className="chatbot-button" onClick={openChatbotModal}>Chatbot</button>
        </div>
       
        <div className="profile-section">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="profile-icon"
            onClick={toggleProfile}
          />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <button onClick={openProfileModal}>My Profile</button>
              <a href="/">Logout</a>
            </div>
          )}
        </div>
      </header>
     
      <div className="main-page">
        <div className="content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              onClick={handleSearch}
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="date-icon"
              onClick={openDateModal}
            />
          </div>

          <div className="results">
            <h2>Search Results</h2>
            {filteredResults.map((result, index) => (
              <div key={index} className="result-item">
                <a href={result.link} className="result-title">
                  {result.title}
                </a>
                <p className="result-authors">{result.authors}</p>
                <p className="result-date">{result.date}</p>
                <button
                  className="star-button"
                  onClick={() => handleAddToLibrary(result)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Date
          isOpen={isDateModalOpen}
          onClose={closeDateModal}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onApply={applyDateSelection}
        />

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
        />

        <MyLibraryModal
          isOpen={isLibraryModalOpen}
          onClose={closeLibraryModal}
          libraryItems={libraryItems}
          onDelete={handleDeleteFromLibrary}
          notification={notification}
        />

        <ChatbotModal
          isOpen={isChatbotModalOpen}
          onClose={closeChatbotModal}
        />

        {notification && (
          <div className="notification-container">
            <p className="notification-message">{notification}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
