import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const arrayOfPossibleMessages = [
    { message: "hi", response: "hello" },
    { message: "which study is a website?", response: "Web-Based Equipment Maintenance Monitoring System for DHVSU Facilities, PALENGKIHAN, CODEQUEST, Monitoring System for DHVSU Facilities." },
    { message: "which study is a web application?", response: " Taskgrove, Online Financial Assistance, HTEFinder, COMPAWNION." },
    { message: "which study used quantitative methodology?", response: "CODEQUEST, Taskgrove, HTEFinder" },
    { message: "which study used mix method?", response: "COMPAWNION Web-Based Equipment Maintenance Monitoring System for DHVSU Facilities" },
    { message: "Which study uses an Iterative Software Development Methodology? ", response: "MSWD Online Financial Assistance, ANTABE, HTEFINDER, COMPAWNION." },
    { message: "Which study uses an agile Software Development Methodology?", response: "Taskgrove,Equipment maintenance monitoring,CODEQUEST,PALENGKIHAN." },
    { message: "Which studies are related to animals? ", response: "COMPAWNION." },
    { message: "Which studies are about people with disability? ", response: "ANTABE" },
    { message: "Which study is related about nature?", response: "Taskgrove." },
    { message: "Which studies are related to geography?", response: "COMPAWNION, HTEFINDER" },

  ];

  const sendMessage = (message) => {
    if (message.trim() === '') {
      alert('Please type a message');
      return;
    }

    setChatHistory([...chatHistory, { sender: 'User', text: message }]);
    chatbotResponse(message);
    setUserMessage('');
  };

  const chatbotResponse = (userMessage) => {
    let chatbotMessage = "please send different message";

    if (userMessage.length > 5 || userMessage.toLowerCase() === "hi") {
      const result = arrayOfPossibleMessages.find(val => val.message.includes(userMessage.toLowerCase()));
      if (result) {
        chatbotMessage = result.response;
      } else {
        chatbotMessage = "please send another message";
      }
    }

    setTimeout(() => {
      setChatHistory(prevHistory => [...prevHistory, { sender: 'Chatbot', text: chatbotMessage }]);
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, 1000);
  };

  return (
    <div>
      <div id="chatContainer" style={{ maxHeight: '300px', overflowY: 'auto' }} ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ textAlign: chat.sender === 'User' ? 'right' : 'left', margin: '10px' }}>
            <span>{chat.sender}: </span>
            <span>{chat.text}</span>
          </div>
        ))}
      </div>
      <input
        id="textbox"
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage(userMessage)}
      />
      <button id="sendBtn" onClick={() => sendMessage(userMessage)}>Send</button>
    </div>
  );
};

export default Chatbot;
