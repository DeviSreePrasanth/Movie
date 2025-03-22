import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "../services/api"; // Import the API service

const Moviecenter = () => {
  const [movies, setMovies] = useState([]); // State for movies
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch movies when the component mounts
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies();
      if (data.length > 0) {
        setMovies(data);
      } else {
        setError("Failed to fetch movies.");
      }
      setLoading(false);
    };
    loadMovies();
  }, []);

  // Duplicate movies for infinite loop after fetching
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

  const handleBookNowClick = () => {
    // Add booking logic here if needed
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
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies available.</div>;
  }

  return (
    <>
      {/* Custom CSS (same as before, omitted for brevity) */}
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
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          .movie:hover .movie-image {
            height: 300px;
            opacity: 1;
          }
          .movie.active .movie-image {
            height: 350px;
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
            font-size: 20px;
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
            .movie {
              width: 160px;
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
          }
          @media (max-width: 600px) {
            .slider-container {
              height: 300px;
            }
            .movie {
              margin: 0 10px;
              width: 100px;
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
          }
        `}
      </style>
      <div
        className="container font-poppins"
        style={{ backgroundImage: `url(${movies[currentIndex % movies.length].background})` }}
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
                  className={`movie ${index % movies.length === currentIndex % movies.length ? "active" : ""}`}
                  key={index}
                  onClick={() => handleMovieClick(index % movies.length)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && handleMovieClick(index % movies.length)}
                >
                  <div className="relative text-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                    <Link
                      to={`/booking/${encodeURIComponent(
                        movie.title.replace(/ /g, "%20")
                      )}`}
                      className="block text-white no-underline"
                    >
                      <img
                        src={movie.imageUrl} // Ensure API returns imageUrl
                        alt={movie.title}
                        className={`movie-image transition-all duration-300`}
                        loading="lazy"
                      />
                    </Link>
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