import React from "react";
import { Link } from "react-router-dom";

function MovieSection({ movies, title = "Movies" }) {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-500">No {title.toLowerCase()} available.</div>;
  }

  return (
    <div className="overflow-hidden py-2">
      <h2 className="text-2xl font-semibold mb-5 ml-5">{title}</h2>
      <div className="flex gap-12 overflow-x-auto p-2 snap-x snap-mandatory scroll-smooth scrollbar-none">
        {movies.map((movie, index) => (
          <div
            key={index} // Use index as key since 'id' is not available
            className="flex-none w-52 h-[350px] relative text-center bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 snap-center"
          >
            <Link to={`/booking/${encodeURIComponent(movie.title.replace(/ /g, "%20"))}`}>
              <img
                src={movie.imageUrl || "https://via.placeholder.com/200x300?text=No+Image"}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/200x300?text=No+Image")}
                loading="lazy"
              />
            </Link>
            <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 text-white rounded-b-lg">
              <h3 className="text-base font-medium m-0">{movie.title}</h3>
              {/* Genre is not available in the data, so omit or add a placeholder */}
              <p className="text-xs opacity-80 m-0">Genre: N/A</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;