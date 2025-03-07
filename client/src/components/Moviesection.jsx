import React from 'react';
import { Link } from 'react-router-dom';

function MovieSection({ title, movies }) {
  return (
    <div style={{
      overflow: 'hidden',
      padding: '10px 0',
      position: 'relative'
    }}>
      <h2 style={{ margin: '0 0 20px 20px' }}>{title}</h2>
      <div style={{
        display: 'flex',
        gap: '50px',
        overflowX: 'auto',
        padding: '10px 0',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none', // Firefox
        '::-webkit-scrollbar': { display: 'none' } // Webkit browsers (Chrome, Safari)
      }}>
        {movies.map(movie => (
          <div key={movie.id} style={{
            flex: '0 0 auto',
            width: '200px',
            position: 'relative',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            ':hover': { transform: 'scale(1.05)' } // Note: Pseudo-classes like :hover are limited in inline styles
          }}>
            <Link to={`/booking/${movie.title}`} style={{ textDecoration: 'none', color: 'white' }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </Link>
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: '8px',
              background: 'rgba(0, 0, 0, 0.6)',
              color: '#fff',
              textAlign: 'center',
              borderRadius: '0 0 8px 8px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{movie.title}</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{movie.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;