import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const arrayOfPossibleMessages = [
    { message: "hi", response: "hello" },
    { message: "what is thesis", response: "A thesis, or dissertation, is a document submitted in support of candidature for an academic degree or professional qualification presenting the author's research and findings" },
    { message: "what is abstract", response: "An abstract is a brief summary of a research article, thesis, review, conference proceeding, or any in-depth analysis of a particular subject and is often used to help the reader quickly ascertain the paper's purpose." },
    { message: "what is introduction", response: "The introduction allows you to orient the reader to your research project and preview the organisation of your thesis. In the introduction, state what the topic is about, explain why it needs to be further researched and introduce your research question(s) or hypothesis." },
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
