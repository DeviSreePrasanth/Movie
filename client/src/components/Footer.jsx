import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'; // Using react-icons
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            font-family: 'Poppins', sans-serif;
            color: #fff;
            padding: 2rem; /* Responsive padding */
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            position: relative;
            overflow: hidden;
          }

          .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 80%);
            z-index: 0;
          }

          .footer-content {
            display: flex;
            justify-content: space-between;
            max-width: 1400px;
            margin: 0 auto;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
            gap: 1.5rem; /* Responsive spacing */
            position: relative;
            z-index: 1;
          }

          .footer-section {
            flex: 1;
            min-width: 200px; /* Ensure sections don’t collapse too small */
          }

          .footer-section h4 {
            color: #ff6b6b;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .footer-section ul {
            list-style: none;
            padding: 0;
          }

          .footer-section li {
            margin-bottom: 0.75rem;
            font-size: 1.1rem;
            color: #e0e0e0;
            transition: color 0.3s ease;
          }

          .footer-section li:hover {
            color: #4ecdc4; /* Hover effect */
          }

          .social-icons {
            margin-top: 1rem;
            display: flex;
            gap: 1rem; /* Responsive spacing between icons */
          }

          .social-icon {
            font-size: 1.5rem;
            color: #ff6b6b;
            transition: transform 0.3s ease, color 0.3s ease;
          }

          .social-icon:hover {
            transform: scale(1.2);
            color: #4ecdc4;
          }

          .footer-bottom {
            text-align: center;
            margin-top: 2rem;
            position: relative;
            z-index: 1;
          }

          .footer-bottom hr {
            border-color: #555;
            margin-bottom: 1rem;
          }

          .footer-bottom p {
            font-size: 0.9rem;
            color: #e0e0e0;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .footer {
              padding: 1.5rem;
            }
            .footer-section h4 {
              font-size: 1.3rem;
            }
            .footer-section li {
              font-size: 1rem;
            }
            .social-icon {
              font-size: 1.2rem;
            }
            .footer-bottom p {
              font-size: 0.8rem;
            }
          }

          @media (max-width: 480px) {
            .footer {
              padding: 1rem;
            }
            .footer-content {
              flex-direction: column; /* Stack sections vertically */
              gap: 2rem;
            }
            .footer-section {
              min-width: 100%; /* Full width on small screens */
            }
            .footer-section h4 {
              font-size: 1.2rem;
            }
            .footer-section li {
              font-size: 0.9rem;
            }
            .social-icon {
              font-size: 1rem;
            }
          }
        `}
      </style>
      <footer className="footer">
        <div className="footer-content">
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4>PROFILE</h4>
            <ul>
              <li>FAQ's</li>
              <li>Pricing Plans</li>
              <li>Order Tracking</li>
              <li>Returns</li>
            </ul>
          </motion.div>
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4>RECENT POSTS</h4>
            <ul>
              <li>Touch of Uniqueness</li>
              <li>Offices You Won’t Forget</li>
              <li>Cicilan</li>
            </ul>
          </motion.div>
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4>CUSTOMER</h4>
            <ul>
              <li>Help & Contact Us</li>
              <li>Return</li>
              <li>Online Stores</li>
              <li>Terms & Conditions</li>
            </ul>
          </motion.div>
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4>CONTACT</h4>
            <ul>
              <li>951596422</li>
              <li>moviehub@gmail.com</li> {/* Fixed typo: gmial → gmail */}
              <li>movieshub</li>
            </ul>
            <div className="social-icons">
              <FaInstagram className="social-icon" />
              <FaTwitter className="social-icon" />
              <FaFacebook className="social-icon" />
            </div>
          </motion.div>
        </div>
        <div className="footer-bottom">
          <hr />
          <p>© 2014 Nizami Cinema. All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;