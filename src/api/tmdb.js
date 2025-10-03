const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// api/tmdb.js
export const fetchMovies = async (page, genre, query) => {
  const endpoint = query
     ? `/search/movie?query=${query}&page=${page}`
     : `/discover/movie?with_genres=${genre}&page=${page}`;

  const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
  const data = await res.json();
  return data.results || [];
};


export const fetchMovieDetails = async (movieId) => {
  try {
    const res = await fetch(
       `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch movie details: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};


export const fetchGenres = async () => {
  try {
    const res = await fetch (
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-Us`
    ) 
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    return data.genres;
  } catch (err) {
    console.error("Error fetching genres:", err.message);
    return [];
  }
};
