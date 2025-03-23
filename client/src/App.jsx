import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieSection from './components/Moviesection';
import Footer from './components/Footer';
import Moviecenter from './components/Moviecenter';
import Booking from './components/Booking';
import AboutUs from './components/AboutUs';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { fetchMovies } from './services/api';

// MoviesPage Component
function MoviesPage() {
  const location = useLocation();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const nowPlayingData = await fetchMovies("now_playing");
      const upcomingData = await fetchMovies("upcoming");

      if (nowPlayingData.length > 0 && upcomingData.length > 0) {
        // Filter out duplicates by ID
        const nowPlayingIds = new Set(nowPlayingData.map(movie => movie.id));
        const filteredUpcoming = upcomingData.filter(movie => !nowPlayingIds.has(movie.id));

        setNowPlaying(nowPlayingData);
        setUpcoming(filteredUpcoming);
      } else {
        setError("Failed to fetch movies.");
      }
      setLoading(false);
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (location.pathname === '/movies') {
      const section = document.getElementById('movies-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <Moviecenter />
      <div id="movies-section">
        <MovieSection title="Currently Playing" movies={nowPlaying} />
        <MovieSection title="Coming Soon" movies={upcoming} />
      </div>
      <AboutUs />
    </>
  );
}

// AboutPage Component
function AboutPage() {
  const location = useLocation();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const nowPlayingData = await fetchMovies("now_playing");
      const upcomingData = await fetchMovies("upcoming");

      if (nowPlayingData.length > 0 && upcomingData.length > 0) {
        const nowPlayingIds = new Set(nowPlayingData.map(movie => movie.id));
        const filteredUpcoming = upcomingData.filter(movie => !nowPlayingIds.has(movie.id));

        setNowPlaying(nowPlayingData);
        setUpcoming(filteredUpcoming);
      } else {
        setError("Failed to fetch movies.");
      }
      setLoading(false);
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (location.pathname === '/about') {
      const section = document.getElementById('about');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <Moviecenter />
      <MovieSection title="Currently Playing" movies={nowPlaying} />
      <MovieSection title="Coming Soon" movies={upcoming} />
      <div id="about">
        <AboutUs />
      </div>
    </>
  );
}

// Layout Component
function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login';
  const isBookingPage = location.pathname.startsWith('/booking');
            
  return (
    <>
      {!isLoginPage && !isBookingPage && <Header />}
      {children} 
      {!isLoginPage && !isBookingPage && <Footer />}
    </>
  );
}

// App Component
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-black font-sans">
        <Layout>
          <Routes>
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:movieName" element={<Booking />} />
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;