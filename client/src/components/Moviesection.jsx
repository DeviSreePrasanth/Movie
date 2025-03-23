import React from "react";
import { Link } from "react-router-dom";

function MovieSection({ movies, title = "Movies" }) {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-300 text-xl py-8">No {title.toLowerCase()} available.</div>;
  }

  return (
    <div className="overflow-hidden py-4 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 ml-6 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent drop-shadow-md">
        {title}
      </h2>
      <div className="flex gap-6 overflow-x-auto p-4 snap-x snap-mandatory scroll-smooth scrollbar-none">
        {movies.map((movie, index) => (
          <div
            key={index} // Using index as key; ideally, use a unique movie ID if available
            className="flex-none w-56 h-[360px] relative text-center bg-gray-900/70 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] snap-center border border-cyan-500/30 backdrop-blur-sm"
          >
            <Link to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`} className="block">
              <img
                src={movie.imageUrl || "https://via.placeholder.com/224x336?text=No+Image"}
                alt={movie.title}
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110 hover:brightness-110"
                onError={(e) => (e.target.src = "https://via.placeholder.com/224x336?text=No+Image")}
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
      {/* Custom CSS to Ensure Scrollbar is Hidden */}
      <style jsx>{`
        .scrollbar-none {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
}

export default MovieSection;