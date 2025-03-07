import React, { useState } from "react";
import { Link } from 'react-router-dom';

// Import images explicitly
import godzillaImage from "../images/i2.jpg";
import godzillaBg from "../images/i22.jpg";
import lionImage from "../images/i0.jpeg";
import lionBg from "../images/i00.jpg";
import jokerImage from "../images/i1.jpg";
import jokerBg from "../images/i11.jpg";
import mortalImage from "../images/i3.jpg";
import mortalBg from "../images/i33.jpg";
import vikingsImage from "../images/i4.jpg";
import vikingsBg from "../images/i44.jpg";
import avengersImage from "../images/i5.jpg";
import avengersBg from "../images/i55.jpg";
import titanicImage from "../images/i6.jpg";
import titanicBg from "../images/i66.jpg";

const movies = [
  { title: "Godzilla vs Kong", imageUrl: godzillaImage, background: godzillaBg },
  { title: "The Lion King", imageUrl: lionImage, background: lionBg },
  { title: "Joker", imageUrl: jokerImage, background: jokerBg },
  { title: "Mortal Kombat", imageUrl: mortalImage, background: mortalBg },
  { title: "Vikings", imageUrl: vikingsImage, background: vikingsBg },
  { title: "Avengers", imageUrl: avengersImage, background: avengersBg },
  { title: "Titanic", imageUrl: titanicImage, background: titanicBg },
];

const Moviecenter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMovieClick = (index) => {
    setCurrentIndex(index);
  };

  const handleBookNowClick = () => {
    // Add booking logic here if needed
  };

  return (
    <>
      <style>
        {`
          .container {
            position: relative;
            width: 99vw;
            height: 100vh;
            overflow: hidden;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          .main {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: flex-start;
            padding-bottom: 250px;
          }

          .slider-container {
            position: relative;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
            z-index: 10;
          }

          .slider {
            display: flex;
            transition: transform 0.5s ease-in-out;
            height: 100%;
            width: calc(100% * ${movies.length});
            flex-wrap: nowrap;
          }

          .movie {
            flex: 0 0 auto;
            margin: 0 30px;
            position: relative;
            top: 120px;
            height: 100%;
            transition: transform 0.5s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .movie-image {
            width: 150px;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          .movie:hover .movie-image {
            height: 250px;
            opacity: 1;
          }

          .movie.active .movie-image {
            height: 280px;
            transform: scale(1.5);
            opacity: 1;
          }

          .movie-overlay {
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .movie:hover .movie-overlay {
            opacity: 1;
          }

          .movie-title {
            color: #fff;
            font-size: 18px;
          }

          .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
          }

          .nav-button.prev {
            left: 16px;
          }

          .nav-button.next {
            right: 16px;
          }

          .nav-button:hover {
            background-color: rgba(0, 0, 0, 0.7);
          }

          .booking-container {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 20;
          }

          .book-button {
            padding: 16px 32px;
            background-color: #ab0a10;
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease, opacity 0.3s ease;
            opacity: 0;
            display: block;
            z-index: 20;
            position: absolute;
            top: 480px;
            right: 20px;
          }

          .movie.active .book-button {
            opacity: 1;
          }

          .book-button:hover {
            background-color: #ab0a10;
          }

          @media (max-width: 1024px) {
            .movie-image {
              width: 120px;
            }

            .movie:hover .movie-image {
              height: 200px;
            }

            .movie.active .movie-image {
              height: 240px;
              transform: scale(1.4);
            }

            .movie-title {
              font-size: 16px;
            }

            .nav-button {
              padding: 6px 12px;
            }

            .nav-button.prev {
              left: 12px;
            }

            .nav-button.next {
              right: 12px;
            }

            .book-button {
              padding: 14px 28px;
            }
          }

          @media (max-width: 600px) {
            .slider-container {
              height: 150vh;
              position: relative;
              top: 45vw;
            }

            .movie {
              margin: 0 10px;
              top: 30px;
            }

            .movie-image {
              width: 80px;
            }

            .movie:hover .movie-image {
              height: 150px;
            }

            .movie.active .movie-image {
              height: 180px;
              transform: scale(1.2);
            }

            .movie-title {
              font-size: 14px;
            }

            .nav-button {
              padding: 6px 10px;
            }

            .nav-button.prev {
              left: 4px;
            }

            .nav-button.next {
              right: 4px;
            }

            .book-button {
              padding: 10px 20px;
            }
          }
        `}
      </style>
      <div
        className="container"
        style={{ backgroundImage: `url(${movies[currentIndex].background})` }}
      >
        <main className="main">
          <div className="slider-container">
            <button className="nav-button prev" onClick={handlePrevClick}>
              ❮
            </button>
            <div className="slider">
              {movies.map((movie, index) => (
                <div
                  className={`movie ${index === currentIndex ? "active" : ""}`}
                  key={index}
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                  onClick={() => handleMovieClick(index)}
                >
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <div className="black">
                    <div className="movie-overlay">
                      <div className="movie-title">{movie.title}</div>
                      {index === currentIndex && (
                        <div className="booking-container">
                          <Link to={`/booking/${movie.title}`}>
                            <button
                              className="book-button active"
                              onClick={handleBookNowClick}
                            >
                              Book Now
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="nav-button next" onClick={handleNextClick}>
              ❯
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Moviecenter;