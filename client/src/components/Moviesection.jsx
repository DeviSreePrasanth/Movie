import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "8de602d1ef935fcd543656e2bbbe240f"; // Replace with your actual TMDb API key
const LANGUAGES = [
  { code: "te", name: "Telugu Movies" },
  { code: "hi", name: "Hindi Movies" },
  { code: "en", name: "English Movies" },
];

function MovieSection() {
  const [moviesByLanguage, setMoviesByLanguage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = {};
        for (const lang of LANGUAGES) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang.code}`
          );
          const data = await response.json();
          // **Filter out movies with missing images**
          moviesData[lang.code] = data.results.filter(movie => movie.poster_path);
        }
        setMoviesByLanguage(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-300 text-xl py-8">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 py-6">
      {LANGUAGES.map((lang) => (
        <div key={lang.code} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 ml-6 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent drop-shadow-md">
            {lang.name}
          </h2>
          <div className="flex gap-6 overflow-x-auto p-4 snap-x snap-mandatory scroll-smooth scrollbar-none">
            {moviesByLanguage[lang.code]?.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-56 h-[360px] relative text-center bg-gray-900/70 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] snap-center border border-cyan-500/30 backdrop-blur-sm"
              >
                <Link to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`} className="block">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110 hover:brightness-110"
                    loading="lazy"
                  />
                </Link>
                {/* Overlay with Movie Name and Book Now Button on Hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer gap-4">
                  <div className="text-gray-200 text-xl font-semibold text-center px-4 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent lg:text-xl md:text-lg sm:text-base">
                    {movie.title}
                  </div>
                  <Link
                    to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`}
                    className="px-6 py-2 text-base font-medium bg-cyan-700 text-gray-100 rounded-full hover:brightness-125 hover:scale-110 transition-all duration-300 lg:text-base md:text-sm sm:text-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Custom CSS to Ensure Scrollbar is Hidden */}
      <style jsx>{`
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default MovieSection;
