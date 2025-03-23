// import axios from "axios";

// const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = "8de602d1ef935fcd543656e2bbbe240f";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// export const fetchMovies = async (type = "now_playing") => {
//   try {
//     const genreResponse = await axios.get(`${API_BASE_URL}/genre/movie/list`, {
//       params: { api_key: API_KEY, language: "en-US" },
//     });
//     const genres = genreResponse.data.genres.reduce((acc, genre) => {
//       acc[genre.id] = genre.name;
//       return acc;
//     }, {});

//     const response = await axios.get(`${API_BASE_URL}/movie/${type}`, {
//       params: { api_key: API_KEY, language: "en-US", page: 1 },
//     });

//     const movies = await Promise.all(
//       response.data.results.map(async (movie) => {
//         let imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
//         let background = `${IMAGE_BASE_URL}${movie.backdrop_path}`;

//         if (!movie.poster_path) {
//           const pexelsResponse = await axios.get(`https://api.pexels.com/v1/search`, {
//             headers: { Authorization: "your_pexels_api_key" },
//             params: { query: movie.title, per_page: 1 },
//           });
//           imageUrl = pexelsResponse.data.photos[0]?.src?.large2x || 'default-placeholder.jpg';
//         }

//         return {
//           id: movie.id,
//           title: movie.title,
//           imageUrl,
//           background,
//           genre: movie.genre_ids.map(id => genres[id] || id).join(", "),
//         };
//       })
//     );

//     return movies;
//   } catch (error) {
//     console.error(`Error fetching ${type} movies:`, error);
//     return [];
//   }
// };
// services/api.js



const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "8de602d1ef935fcd543656e2bbbe240f";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// Function to fetch movies based on a category (e.g., "now_playing")
export const fetchMovies = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data to match what your component expects
    const movies = data.results.map((movie) => ({
      title: movie.title,
      background: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null, // TMDb provides backdrop images; adjust if your API differs
    }));

    return movies;
  } catch (error) {
    console.error("Error fetching movies from API:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};