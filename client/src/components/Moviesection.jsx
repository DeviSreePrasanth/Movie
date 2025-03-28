import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "8de602d1ef935fcd543656e2bbbe240f";
const LANGUAGES = [
  { code: "te", name: "Telugu Movies" },
  { code: "hi", name: "Hindi Movies" },
  { code: "en", name: "English Movies" },
];
 
function MovieSection() {
  const [moviesByLanguage, setMoviesByLanguage] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = {};
        for (const lang of LANGUAGES) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang.code}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch ${lang.name}: ${response.statusText}`);
          }
          const data = await response.json();
          moviesData[lang.code] = data.results.filter((movie) => movie.poster_path);
        }
        setMoviesByLanguage(moviesData);
        setError(null);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Unable to load movies. Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-300 text-lg sm:text-xl">
        <span className="animate-pulse">Loading Movies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-red-400 text-lg sm:text-xl px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="py-6 px-2 sm:px-4">
      {LANGUAGES.map((lang) => (
        <div key={lang.code} className="mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 ml-2 sm:ml-6 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent drop-shadow-md">
            {lang.name}
          </h2>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto p-2 sm:p-4 snap-x snap-mandatory scroll-smooth scrollbar-none">
            {moviesByLanguage[lang.code]?.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-36 sm:w-40 md:w-56 h-[200px] sm:h-[240px] md:h-[360px] relative text-center bg-gray-900/70 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] snap-center border border-cyan-500/30 backdrop-blur-sm"
              >
                <Link
                  to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`}
                  state={{ posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  className="block w-full h-full"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110 hover:brightness-110"
                    loading="lazy"
                  />
                </Link>
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer gap-2 sm:gap-4">
                  <div className="text-gray-200 text-xs sm:text-sm md:text-xl font-semibold text-center px-2 sm:px-4 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent line-clamp-2">
                    {movie.title}
                  </div>
                  <Link
                    to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`}
                    state={{ posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    className="px-3 sm:px-4 md:px-6 py-1 sm:py-1 md:py-2 text-xs sm:text-sm md:text-base font-medium bg-cyan-700 text-gray-100 rounded-full hover:brightness-125 hover:scale-110 transition-all duration-300"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <style jsx>{`
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .snap-center {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default MovieSection;