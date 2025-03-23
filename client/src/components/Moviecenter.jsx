import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moviesData from "./movie.json"; // Adjust path as needed

const Moviecenter = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = () => {
      setLoading(true);
      try {
        const formattedMovies = moviesData.movies.map((movie) => ({
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          background: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        }));
        if (formattedMovies.length > 0) {
          setMovies(formattedMovies);
        } else {
          setError("No movies found in the data.");
        }
      } catch (err) {
        setError("Failed to load movies from JSON.");
      }
      setLoading(false);
    };
    loadMovies();
  }, []);

  const infiniteMovies = [...movies, ...movies];

  const handlePrevClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleMovieClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= movies.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setIsTransitioning(false);
      setCurrentIndex(movies.length - 1);
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-white text-center">No movies available.</div>;
  }

  return (
    <>
      <style>
        {`
          .container {
            position: relative;
            width: 100vw; /* Full viewport width */
            height: 100vh; /* Full viewport height */
            overflow: hidden;
            background-size: cover; /* Ensure background fits screen */
            background-position: center;
            background-repeat: no-repeat;
            background: linear-gradient(to bottom right, #1F2937, #111827); /* Fallback gradient */
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
            height: 400px;
            display: flex;
            align-items: center;
            overflow: hidden;
            z-index: 10;
          }
          .slider {
            display: flex;
            height: 100%;
            transition: ${isTransitioning ? "transform 0.5s ease-in-out" : "none"};
          }
          .movie {
            flex: 0 0 auto;
            margin: 0 30px;
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
          }
          .movie-image {
            width: 200px;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease, opacity 0.3s ease;
            border: 1px solid #6B7280;
          }
          .movie:hover .movie-image {
            height: 300px;
            opacity: 1;
          }
          .movie.active .movie-image {
            height: 350px;
            transform: scale(1.1);
            opacity: 1;
            border-color: #EF4444;
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
            background: rgba(0, 0, 0, 0.6);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .movie:hover .movie-overlay {
            opacity: 1;
          }
          .movie-title {
            color: #fff;
            font-size: 20px;
            font-weight: 600;
          }
          .nav-button {
            position: absolute;
            top: 20px; /* Position above images */
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            z-index: 20; /* Ensure buttons are above images */
            border-radius: 50%; /* Circular buttons */
          }
          .nav-button.prev {
            left: 20px; /* Adjusted to align with movie images */
          }
          .nav-button.next {
            right: 20px; /* Adjusted to align with movie images */
          }
          .nav-button:hover {
            background-color: #EF4444;
          }
          @media (max-width: 1024px) {
            .slider-container { height: 350px; }
            .movie { width: 160px; }
            .movie-image { width: 160px; }
            .movie:hover .movie-image { height: 250px; }
            .movie.active .movie-image { height: 300px; transform: scale(1.4); }
            .movie-title { font-size: 16px; }
            .nav-button { padding: 6px 12px; top: 15px; }
          }
          @media (max-width: 600px) {
            .slider-container { height: 300px; }
            .movie { margin: 0 10px; width: 100px; }
            .movie-image { width: 100px; }
            .movie:hover .movie-image { height: 180px; }
            .movie.active .movie-image { height: 220px; transform: scale(1.2); }
            .movie-title { font-size: 14px; }
            .nav-button { padding: 6px 10px; top: 10px; }
          }
        `}
      </style>
      <div
        className="container font-poppins"
        style={{
          backgroundImage: `url(${movies[currentIndex % movies.length].background})`,
        }}
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
            <div
              className="slider"
              style={{
                transform: `translateX(-${currentIndex * (200 + 60)}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {infiniteMovies.map((movie, index) => (
                <div
                  className={`movie ${
                    index % movies.length === currentIndex % movies.length
                      ? "active"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleMovieClick(index % movies.length)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleMovieClick(index % movies.length)
                  }
                >
                  <div className="relative text-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                    <Link
                      to={`/booking/${encodeURIComponent(
                        movie.title.replace(/ /g, "%20")
                      )}`}
                      className="block text-white no-underline"
                    >
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="movie-image transition-all duration-300"
                        loading="lazy"
                      />
                    </Link>
                    <Link
                      to={`/booking/${encodeURIComponent(
                        movie.title.replace(/ /g, "%20")
                      )}`}
                      className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-300 text-white px-3 py-1 rounded-md font-medium shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-10 text-sm lg:px-6 lg:py-2 md:px-5 md:py-1.5 sm:px-4 sm:py-1"
                      aria-label={`Book ${movie.title}`}
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