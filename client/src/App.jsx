import React, { useEffect } from 'react';
import Header from './components/Header';
import MovieSection from './components/Moviesection';
import Footer from './components/Footer';
import Moviecenter from './components/Moviecenter';
import Booking from './components/Booking';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import lionImage from './images/lion.jpg';
import vikingsImage from './images/vikings.jpg';
import greyImage from './images/grey.jpg';
import starImage from './images/star.jpg';
import jokerImage from './images/jocker.jpg';
import avatarImage from './images/avatar.jpg';
import doraImage from './images/dora.jpg';
import blissImage from './images/bliss.jpg';
import blackImage from './images/black.jpg';
import titanicImage from './images/titanic.jpg';
import johnImage from './images/john.jpg';
import alienImage from './images/alien.jpg';
import deadpoolImage from './images/deadpool.jpg';
import mortalImage from './images/mortal.jpg';

const currentlyPlayingMovies = [
  { id: 1, title: 'The Lion King', genre: 'Action', poster: lionImage },
  { id: 2, title: 'Vikings', genre: 'Action', poster: vikingsImage },
  { id: 3, title: 'Grey\'s Anatomy', genre: 'Drama', poster: greyImage },
  { id: 4, title: 'Star Wars', genre: 'Drama', poster: starImage },
  { id: 5, title: 'Joker', genre: 'Action', poster: jokerImage },
  { id: 6, title: 'Avatar', genre: 'Action', poster: avatarImage },
  { id: 7, title: 'Dora', genre: 'Adventure', poster: doraImage },
];

const comingSoonMovies = [
  { id: 1, title: 'Bliss', genre: 'Romance', poster: blissImage },
  { id: 2, title: 'Black Widow', genre: 'Romance', poster: blackImage },
  { id: 3, title: 'Titanic 2', genre: 'Romance', poster: titanicImage },
  { id: 4, title: 'John Wick', genre: 'Action', poster: johnImage },
  { id: 5, title: 'Alien', genre: 'Sci-Fi', poster: alienImage },
  { id: 6, title: 'Deadpool', genre: 'Action', poster: deadpoolImage },
  { id: 7, title: 'Mortal Kombat', genre: 'Sci-Fi', poster: mortalImage },
];

function MoviesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      const section = document.getElementById('movies-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Moviecenter />
      <div id="movies-section">
        <MovieSection title="Currently Playing" movies={currentlyPlayingMovies} />
        <MovieSection title="Coming Soon" movies={comingSoonMovies} />
      </div>
      <AboutUs />
    </>
  );
}

function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/about') {
      const section = document.getElementById('about');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Moviecenter />
      <MovieSection title="Currently Playing" movies={currentlyPlayingMovies} />
      <MovieSection title="Coming Soon" movies={comingSoonMovies} />
      <div id="about">
        <AboutUs />
      </div>
    </>
  );
}

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

function App() {
  return (
    <>
      <style>
        {`
          .App {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
          }
        `}
      </style>
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/:movieName" element={<Booking />} />
              <Route path="/home" element={<MoviesPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;