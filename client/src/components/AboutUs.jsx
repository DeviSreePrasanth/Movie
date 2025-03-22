import React from 'react';
import { FaUsers, FaGlobe, FaLandmark, FaFilm } from "react-icons/fa"; // Fixed import
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <>
      <style>
        {`
          .about-us {
            font-family: 'Poppins', sans-serif;
            color: #fff;
            padding: 40px;
            max-width: 1400px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            overflow: hidden;
            position: relative;
          }

          .about-us::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 80%);
            z-index: 0;
          }

          h1, h2, h3 {
            color: #fff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 30px;
            background: linear-gradient(to right, #ff6b6b, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          h2 {
            font-size: 2.5rem;
            margin-bottom: 25px;
          }

          h3 {
            font-size: 1.8rem;
            margin-bottom: 10px;
          }

          p {
            line-height: 1.9;
            font-size: 1.2rem;
            color: #e0e0e0;
            /* Remove left margin for facts */
          }

          .hero {
            text-align: center;
            margin-bottom: 60px;
            position: relative;
            z-index: 1;
          }

          .our-story, .quick-facts, .mission, .join-us {
            margin-bottom: 60px;
            position: relative;
            z-index: 1;
          }

          .achievements, .facts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            justify-content: center;
          }

          .achievement, .fact {
            text-align: center;
            padding: 25px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .achievement:hover, .fact:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
          }

          .achievement h3, .fact h3 {
            color: #ff6b6b;
            font-weight: 600;
            margin-bottom: 10px;
          }
.fact-icon {
            margin-bottom: 1rem; /* Responsive spacing below icon */
            margin-left: auto; /* Center horizontally with margin-right */
            margin-right: auto;
            display: block; /* Ensures centering */
            width: fit-content; /* Keeps icon size natural */
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .fact-icon {
              margin-bottom: 0.75rem; /* Slightly less spacing on tablets */
              font-size: 2.5rem; /* Adjust icon size */
            }
          }

          @media (max-width: 480px) {
            .fact-icon {
              margin-bottom: 0.5rem; /* Even less spacing on phones */
              font-size: 2rem; /* Smaller icons on mobile */
            }
            .fact h3 {
              font-size: 1.5rem; /* Adjust number size */
            }
            .fact p {
              font-size: 1rem; /* Adjust text size */
            }
          }
          .mission p, .join-us p {
            font-size: 1.3rem;
            line-height: 1.7;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 10px;
          }

          .join-us {
            text-align: center;
          }

          .join-us button {
            padding: 12px 30px;
            font-size: 1.2rem;
            background: linear-gradient(to right, #ff6b6b, #4ecdc4);
            border: none;
            border-radius: 25px;
            color: #fff;
            cursor: pointer;
            transition: transform 0.3s ease;
          }

          .join-us button:hover {
            transform: scale(1.1);
          }
        `}
      </style>
      <div className="about-us">
        <motion.section className="hero" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1>About Us</h1>
          <p>
            25 years ago, in a little town, we had an idea: make watching movies easy and fun for everyone. That small thought turned into something big—a place where millions of people enjoy movies every day. We’ve come a long way, and we’re excited to keep going with you!
          </p>
        </motion.section>

        <motion.section className="our-story" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3>How We Started</h3>
          <p>
            It all began with a simple goal: make booking movie tickets super easy. Now, we’re happy to help tons of movie fans every day. From a tiny start, we’ve grown into a name people trust for their movie fun.
          </p>
          <div className="achievements">
            <motion.div className="achievement" whileHover={{ scale: 1.05 }}>
              <h3>50 Million+</h3>
              <p>App Users</p>
            </motion.div>
            <motion.div className="achievement" whileHover={{ scale: 1.05 }}>
              <h3>15 Million+</h3>
              <p>Tickets Sold Monthly</p>
            </motion.div>
            <motion.div className="achievement" whileHover={{ scale: 1.05 }}>
              <h3>2 Billion+</h3>
              <p>Page Visits Monthly</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="quick-facts" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3>Fun Facts</h3>
          <div className="facts-grid">
            <motion.div className="fact" whileHover={{ scale: 1.05 }}>
              <FaUsers size={60} color="#ff6b6b" className="fact-icon" />
              <h3>30 Million+</h3>
              <p>Happy Users</p>
            </motion.div>
            <motion.div className="fact" whileHover={{ scale: 1.05 }}>
              <FaGlobe size={60} color="#ff6b6b" className="fact-icon" />
              <h3>5</h3>
              <p>Countries</p>
            </motion.div>
            <motion.div className="fact" whileHover={{ scale: 1.05 }}>
              <FaLandmark size={60} color="#ff6b6b" className="fact-icon" />
              <h3>650+</h3>
              <p>Towns and Cities</p>
            </motion.div>
            <motion.div className="fact" whileHover={{ scale: 1.05 }}>
              <FaFilm size={60} color="#ff6b6b" className="fact-icon" />
              <h3>5000+</h3>
              <p>Screens</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="mission" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3>What We’re About</h3>
          <p>
            At Movie Hub, we want to make movies fun and easy for everyone, everywhere. We think movies are more than just something to watch—they’re a way to feel happy, explore new places, and share stories. We’re here to make your movie time awesome!
          </p>
        </motion.section>

        <motion.section className="join-us" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3>Come Along!</h3>
          <p>
            Love movies a lot? Or just like watching one sometimes? Either way, we’d love for you to be part of our movie adventure. Let’s make some great movie moments together!
          </p>
          <button>Book Tickets</button>
        </motion.section>
      </div>
    </>
  );
};

export default AboutUs;