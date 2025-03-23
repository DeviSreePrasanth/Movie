import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Moviecenter from "./components/Moviecenter";
import Moviesection from "./components/Moviesection";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Booking from "./components/Booking";
import Payment from "./components/Payment";
import Profile from "./components/Profile";
import SeatSelection from "./components/SeatSelectionPopup";
import moviesData from "./components/movie.json";

function App() {
  const [movies, setMovies] = useState([]);
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

  if (loading) return <div className="text-white text-center">Loading movies...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col">
                <Header />
                <Moviecenter movies={movies} />
                <Moviesection movies={movies}  />
                <AboutUs />
                <Footer />
              </div>
            }
          />
          <Route path="/booking/:movieTitle" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;