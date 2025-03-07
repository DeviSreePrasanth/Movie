import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  { id: 1, title: "Godzilla vs Kong", imageUrl: godzillaImage, background: godzillaBg, genre: "Action" },
  { id: 2, title: "The Lion King", imageUrl: lionImage, background: lionBg, genre: "Animation" },
  { id: 3, title: "Joker", imageUrl: jokerImage, background: jokerBg, genre: "Thriller" },
  { id: 4, title: "Mortal Kombat", imageUrl: mortalImage, background: mortalBg, genre: "Action" },
  { id: 5, title: "Vikings", imageUrl: vikingsImage, background: vikingsBg, genre: "Drama" },
  { id: 6, title: "Avengers", imageUrl: avengersImage, background: avengersBg, genre: "Action" },
  { id: 7, title: "Titanic", imageUrl: titanicImage, background: titanicBg, genre: "Romance" },
];

// Duplicate movies for infinite loop
const infiniteMovies = [...movies, ...movies, ...movies];

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
      {/* Custom CSS for dynamic transforms and pseudo-elements */}
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
            justify-content: flex-end;
            padding-bottom: 40px;
          }

          .slider-container {
            position: relative;
            width: 100%;
            height: 400px; /* Increased from 300px */
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
            height: 100%;
            transition: transform 0.5s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .movie-image {
            width: 200px; /* Increased from 150px */
            height: auto;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          .movie:hover .movie-image {
            height: 300px; /* Increased from 250px */
            opacity: 1;
          }

          .movie.active .movie-image {
            height: 350px; /* Increased from 280px */
            transform: scale(1.1);
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
            font-size: 20px; /* Increased from 18px */
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

          @media (max-width: 1024px) {
            .slider-container {
              height: 350px;
            }

            .movie-image {
              width: 160px;
            }

            .movie:hover .movie-image {
              height: 250px;
            }

            .movie.active .movie-image {
              height: 300px;
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
          }

          @media (max-width: 600px) {
            .slider-container {
              height: 300px;
            }

            .movie {
              margin: 0 10px;
            }

            .movie-image {
              width: 100px;
            }

            .movie:hover .movie-image {
              height: 180px;
            }

            .movie.active .movie-image {
              height: 220px;
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
          }
        `}
      </style>
      <div
        className="container font-poppins"
        style={{ backgroundImage: `url(${movies[currentIndex].background})` }}
      >
        <main className="main">
          <div className="slider-container">
            <button
              className="nav-button prev"
              onClick={handlePrevClick}
              aria-label="Previous Movie"
            >
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
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && handleMovieClick(index)}
                >
                  <div className="relative text-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                    <Link
                      to={`/booking/${encodeURIComponent(
                        movie.title.replace(/ /g, "%20")
                      )}`}
                      className="block text-white no-underline"
                    >
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className={`movie-image transition-all duration-300`}
                        loading="lazy"
                      />
                    </Link>
                    {/* Updated Book Now Button */}
                    <Link
                      to={`/booking/${encodeURIComponent(
                        movie.title.replace(/ /g, "%20")
                      )}`}
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-800 text-white px-3 py-1 rounded-md border border-red-700 font-medium shadow-md hover:bg-red-900 hover:shadow-lg transition-all duration-300 z-10 text-sm lg:px-6 lg:py-2 md:px-5 md:py-1.5 sm:px-4 sm:py-1"
                      aria-label={`Book ${movie.title}`}
                      onClick={handleBookNowClick}
                    >
                      Book Now
                    </Link>
                    <div className="movie-overlay">
                      <div className="movie-title">{movie.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="nav-button next"
              onClick={handleNextClick}
              aria-label="Next Movie"
            >
              ❯
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Moviecenter;