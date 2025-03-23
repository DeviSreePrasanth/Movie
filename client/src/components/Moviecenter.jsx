import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moviesData from "./movie.json"; // Adjust path as needed

const Moviecenter = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(false); // Control auto-slide

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

  // Auto-slide functionality (only when enabled)
  useEffect(() => {
    if (autoSlideEnabled && movies.length > 0) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1500); // Auto-slide every 1.5 seconds
      return () => clearInterval(interval);
    }
  }, [autoSlideEnabled, movies.length]);

  const infiniteMovies = [...movies, ...movies];

  const handlePrevClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setAutoSlideEnabled(false); // Stop auto-slide on "Previous" click
  };

  const handleNextClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setAutoSlideEnabled(true); // Enable auto-slide on "Next" click
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

  if (loading) return <div className="text-white text-center">Loading movies...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (movies.length === 0) return <div className="text-white text-center">No movies available.</div>;

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat font-poppins"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${movies[currentIndex % movies.length].background})`,
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <main className="flex flex-col items-center justify-end h-full relative z-10 pb-1">
        <div className="relative w-full h-[350px] flex items-center overflow-hidden">
          {/* Previous Button */}
          <button
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white border-none p-3 rounded-full transition-all duration-300 z-20 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-red-500 hover:scale-110"
            }`}
            onClick={currentIndex === 0 ? null : handlePrevClick} // Disable click handler when on first card
            disabled={currentIndex === 0} // Disable button
            aria-label="Previous Movie"
          >
            ❮
          </button>

          {/* Slider */}
          <div
            className={`flex h-full items-center ${isTransitioning ? "transition-transform duration-500 ease-in-out animate-bounce-subtle" : ""}`}
            style={{ transform: `translateX(-${currentIndex * (180 + 60)}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {infiniteMovies.map((movie, index) => (
              <div
                className={`flex-shrink-0 mx-[30px] flex items-center justify-center w-[180px] transition-all duration-300 ${
                  index % movies.length === currentIndex % movies.length ? "active scale-110" : "scale-95 opacity-80"
                }`}
                key={index}
                onClick={() => handleMovieClick(index % movies.length)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleMovieClick(index % movies.length)}
              >
                <div className="relative text-center rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                  <Link
                    to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`}
                    className="block text-white no-underline"
                  >
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className={`w-[180px] h-[270px] object-cover rounded-lg border transition-all duration-300 ${
                        index % movies.length === currentIndex % movies.length
                          ? "shadow-glow"
                          : "border-gray-500 hover:scale-105 hover:animate-zoom-in"
                      }`}
                      loading="lazy"
                    />
                  </Link>
                  {/* Hover Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <div className="text-white text-lg font-semibold text-center px-3">{movie.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white border-none p-3 rounded-full cursor-pointer hover:bg-red-500 hover:scale-110 transition-all duration-300 z-20"
            onClick={handleNextClick}
            aria-label="Next Movie"
          >
            ❯
          </button>
        </div>
      </main>

      {/* Responsive Styles and Custom Animations */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .h-[350px] {
            height: 300px;
          }
          .w-[180px] {
            width: 150px;
          }
          .h-[270px] {
            height: 225px;
          }
          .text-lg {
            font-size: 1rem;
          }
          .p-3 {
            padding: 8px 12px;
          }
        }
        @media (max-width: 600px) {
          .h-[350px] {
            height: 250px;
          }
          .mx-[30px] {
            margin-left: 10px;
            margin-right: 10px;
          }
          .w-[180px] {
            width: 120px;
          }
          .h-[270px] {
            height: 180px;
          }
          .text-lg {
            font-size: 0.875rem;
          }
          .p-3 {
            padding: 6px 10px;
          }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.3s ease-out forwards;
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 0.8s ease-in-out;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Moviecenter;