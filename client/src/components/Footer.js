import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/ccslogo.png" alt=" " className="footer-logo" />
        </div>
        <div className="footer-links">
          <a href="#1">About Thesis Hub</a>
          <a href="#2">Terms and conditions</a>
          <a href="#3">Privacy policy</a>
          <a href="#4">Contact Us</a>
        </div>
        <div className="footer-text">
          <p>
            We use cookies to help provide and enhance our service. By continuing you agree to the 
            <a href="#"> use of cookies</a>.
          </p>
          <p>Copyright © 2024. All rights reserved.</p>
        </div>
        <div className="footer-logo">
          {/* Empty div for potential future use */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
