import React from 'react';
import Chatbot from './Chatbot'; // Ensure the path is correct

const ChatbotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Chatbot</h2>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatbotModal;
