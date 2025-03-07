import React from 'react';
import { IoIosPeople } from "react-icons/io"; 
import { FaGlobe, FaCity } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";

const AboutUs = () => {
  return (
    <>
      <style>
        {`
        .about-us {
          font-family: 'Arial', sans-serif;
          color: #333;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          background-color: #;
        
        }

        h1, h2, h3 {
          color: #000;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        p {
          margin-left: 20px;
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .our-story, .quick-facts, .mission, .join-us {
          margin-bottom: 40px;
        }

        .achievements, .facts-grid {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .achievement, .fact {
          text-align: center;
          flex: 1;
          padding: 20px;
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 6px;
        }

        .achievement h3, .fact h3 {
          color: #00A8E8;
          margin-bottom: 10px;
        }

        .mission p, .join-us p {
          font-size: 1.2rem;
          line-height: 1.6;
        }
        `}
      </style>
      <div className="about-us">
        <section className="hero">
          <h1>About Us</h1>
          <p>
            25 years ago, in a small town, a simple idea was born: to make movie experiences more accessible, enjoyable, and memorable for everyone. What started as a dream has now blossomed into a thriving platform that brings movies closer to millions of fans across the world. Over the years, we’ve built something special, and we’re excited to continue this journey with you.
          </p>
        </section>

        <section className="our-story">
          <h3>Our Story</h3>
          <p>
            Our journey began with a vision to create a seamless movie booking experience. Today, we are proud to be a part of the lives of millions of movie enthusiasts. From humble beginnings, we have grown to become a trusted name in the entertainment industry.
          </p>
          <div className="achievements">
            <div className="achievement">
              <h3>50 Million+</h3>
              <p>App Downloads</p>
            </div>
            <div className="achievement">
              <h3>15 Million+</h3>
              <p>Tickets Booked Every Month</p>
            </div>
            <div className="achievement">
              <h3>2 Billion+</h3>
              <p>Page Views Monthly</p>
            </div>
          </div>
        </section>

        <section className="quick-facts">
          <h3>Quick Facts</h3>
          <div className="facts-grid">
            <div className="fact">
              <IoIosPeople size={50} color="#00A8E8" />
              <h3>30 Million+</h3>
              <p>Customers</p>
            </div>
            <div className="fact">
              <FaGlobe size={50} color="#00A8E8" />
              <h3>5</h3>
              <p>Countries</p>
            </div>
            <div className="fact">
              <FaCity size={50} color="#00A8E8" />
              <h3>650+</h3>
              <p>Towns and Cities</p>
            </div>
            <div className="fact">
              <BiCameraMovie size={50} color="#00A8E8" />
              <h3>5000+</h3>
              <p>Screens</p>
            </div>
          </div>
        </section>

        <section className="mission">
          <h3>Our Mission</h3>
          <p>
            At Movie Hub, our mission is simple: to bring the joy of movies to every corner of the world. We believe that movies are more than just entertainment—they are a gateway to new worlds, cultures, and emotions. We are committed to making the movie-going experience easy, accessible, and enjoyable for everyone.
          </p>
        </section>

        <section className="join-us">
          <h3>Join Us</h3>
          <p>
            Whether you're a movie buff, a casual viewer, or someone who just enjoys a good story, we invite you to join us on this exciting journey. Together, we can create even more magical moments, one movie at a time.
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
