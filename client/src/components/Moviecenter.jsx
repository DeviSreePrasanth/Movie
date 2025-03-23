import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Moviecenter = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(false);

  useEffect(() => {
    if (autoSlideEnabled && movies.length > 0) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [autoSlideEnabled, movies.length]);

  const infiniteMovies = [...movies, ...movies];

  const handlePrevClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setAutoSlideEnabled(false);
  };

  const handleNextClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setAutoSlideEnabled(true);
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

  if (movies.length === 0) return <div className="text-white text-center">No movies available.</div>;

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat font-poppins transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${movies[currentIndex % movies.length].background})`,
      }}
    >
      <main className="flex flex-col items-center justify-end h-full relative z-10 pb-1">
        <div className="relative w-full h-[350px] flex items-center overflow-hidden lg:h-[350px] md:h-[300px] sm:h-[250px]">
          <button
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white border-none p-3 rounded-full transition-all duration-300 z-20 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-red-500 hover:scale-110"
            } lg:p-3 md:p-2 sm:p-[6px]`}
            onClick={currentIndex === 0 ? null : handlePrevClick}
            disabled={currentIndex === 0}
            aria-label="Previous Movie"
          >
            ❮
          </button>
          <div
            className={`flex h-full items-center ${
              isTransitioning ? "transition-transform duration-500 ease-in-out animate-bounce-subtle" : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * (180 + 60)}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {infiniteMovies.map((movie, index) => (
              <div
                className={`flex-shrink-0 mx-[30px] flex items-center justify-center w-[180px] transition-all duration-300 lg:mx-[30px] md:mx-4 sm:mx-[10px] lg:w-[180px] md:w-[150px] sm:w-[120px] ${
                  index % movies.length === currentIndex % movies.length ? "scale-110" : "scale-95 opacity-80"
                }`}
                key={index}
                onClick={() => handleMovieClick(index % movies.length)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleMovieClick(index % movies.length)}
              >
                <div className="relative text-center rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                  <Link to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`} className="block text-white no-underline">
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className={`w-[180px] h-[270px] object-cover rounded-lg border transition-all duration-300 lg:w-[180px] lg:h-[270px] md:w-[150px] md:h-[225px] sm:w-[120px] sm:h-[180px] ${
                        index % movies.length === currentIndex % movies.length
                          ? "shadow-glow"
                          : "border-gray-500 hover:scale-105 hover:animate-zoom-in"
                      }`}
                      loading="lazy"
                    />
                  </Link>
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <div className="text-white text-lg font-semibold text-center px-3 lg:text-lg md:text-base sm:text-sm">
                      {movie.title}
                    </div>
                    <Link
                      to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`}
                      className="mt-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 lg:py-2 lg:px-4 md:py-1 md:px-3 sm:py-1 sm:px-2"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white border-none p-3 rounded-full cursor-pointer hover:bg-red-500 hover:scale-110 transition-all duration-300 z-20 lg:p-3 md:p-2 sm:p-[6px]"
            onClick={handleNextClick}
            aria-label="Next Movie"
          >
            ❯
          </button>
        </div>
      </main>
      <style jsx>{`
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 0.8s ease-in-out;
        }
        .animate-zoom-in {
          animation: zoomIn 0.3s ease-out forwards;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Moviecenter;