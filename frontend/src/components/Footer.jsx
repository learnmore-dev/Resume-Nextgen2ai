import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Instagram, Twitter, MessageCircle } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <>
      <footer className="nextgen-footer">
        <div className="nextgen-footer-container">
          {/* Column 1: Our Contact */}
          <div className="nextgen-footer-col">
            <h4 className="nextgen-footer-title">Our Contact</h4>
            <div className="nextgen-contact-details">
              <p className="nextgen-company-name">NextGen2AI</p>
              <p className="nextgen-address-line">No-10 Aviansh Building Kundalahalli Gate,</p>
              <p className="nextgen-address-line">Vartur Marathahalli main road, Bangalore-560037.</p>
              
              <div className="nextgen-contact-links">
                <a href="tel:+919538431415" className="nextgen-contact-item">
                  +91-9538431415
                </a>
                <a href="mailto:office@nextgen2ai.com" className="nextgen-contact-item">
                  office@nextgen2ai.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="nextgen-footer-col">
            <h4 className="nextgen-footer-title">Quick Links</h4>
            <ul className="nextgen-footer-list">
              <li><Link to="/news">Latest Events & News</Link></li>
              <li><Link to="/terms">Terms and conditions</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/careers">Career</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>

          {/* Column 3: Recent News */}
          <div className="nextgen-footer-col">
            <h4 className="nextgen-footer-title">Recent News</h4>
            <ul className="nextgen-footer-list nextgen-news-list">
              <li><Link to="/news#meta-chip">Meta debuts new generation of AI chip</Link></li>
              <li><Link to="/news#openai-gpt4">OpenAI makes GPT-4 Turbo available</Link></li>
              <li><Link to="/news#microsoft-security">Microsoft AI security updates</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="nextgen-footer-col">
            <h4 className="nextgen-footer-title">Follow Us</h4>
            <div className="nextgen-social-links">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nextgen-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nextgen-social-btn"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nextgen-social-btn"
                aria-label="Twitter"
              >
                <Twitter size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="nextgen-footer-bottom">
          <div className="nextgen-footer-bottom-content">
            <p>© All rights reserved. By NextGen2AI</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons (Phone & WhatsApp) */}
      <div className="nextgen-floating-actions">
        <a 
          href="tel:+919538431415" 
          className="nextgen-float-btn nextgen-float-phone" 
          title="Call Us: +91-9538431415"
          aria-label="Call Us"
        >
          <Phone size={22} color="#FFFFFF" />
        </a>
        <a 
          href="https://wa.me/919538431415" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nextgen-float-btn nextgen-float-whatsapp" 
          title="WhatsApp Us"
          aria-label="WhatsApp"
        >
          <MessageCircle size={24} color="#FFFFFF" />
        </a>
      </div>
    </>
  );
};

export default Footer;
