import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../services/api';

function MovieSection({ title, type }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(type);
      if (data.length > 0) {
        setMovies(data);
      } else {
        setError(`Failed to fetch ${title.toLowerCase()} movies.`);
      }
      setLoading(false);
    };
    loadMovies();
  }, [type, title]);

  if (loading) return <div className="text-center text-gray-500">Loading {title.toLowerCase()}...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (movies.length === 0) return <div className="text-center text-gray-500">No {title.toLowerCase()} available.</div>;

  return (
    <div className="overflow-hidden py-2">
      <h2 className="text-2xl font-semibold mb-5 ml-5">{title}</h2>
      <div className="flex gap-12 overflow-x-auto p-2 snap-x snap-mandatory scroll-smooth scrollbar-none">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="flex-none w-52 h-[350px] relative text-center bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 snap-center"
          >
            <Link to={`/booking/${movie.title}`}>
              <img
                src={movie.imageUrl || 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300?text=No+Image')}
                loading="lazy"
              />
            </Link>
            <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-60 text-white rounded-b-lg">
              <h3 className="text-base font-medium m-0">{movie.title}</h3>
              <p className="text-xs opacity-80 m-0">{movie.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;