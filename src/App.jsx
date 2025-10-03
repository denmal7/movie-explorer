import { useEffect, useState, useRef, useCallback } from "react";
import { fetchMovies, fetchMovieDetails, fetchGenres } from "./api/tmdb.js";
import Navbar from "./components/Navbar.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieModal from "./components/MovieModal.jsx";
import GenreDropdown from "./components/GenreDropdown.jsx";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)

  // Ref for the last movie element
  const observer = useRef();

  // Fetch genres once
  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const getMovies = async () => {
  
    try {
      setLoading(true);
      const data = await fetchMovies(page, selectedGenre, query);

      if (page === 1) {
        setMovies(data); // reset list when genre changes
      } else {
        setMovies((prev) => [...prev, ...data]);
      }

      if(data.length === 0) setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, [page, selectedGenre, query]);


  // Load more when last card is visible
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  ) 

  // When genre changes, reset page & movies
  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };
  
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }

  const handleMovieClick = async (movieId) => {
    try {
      const details = await fetchMovieDetails(movieId);
      setSelectedMovie(details);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Could not load movie details");
    }
  };

  // Filter by search
  const filteredMovies = movies.filter((movie) => 
     movie.title.toLowerCase().includes(query.toLocaleLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16 overflow-hidden">
      <Navbar 
        onSearch={handleSearch}
      />

      <main className="max-w-6xl mx-auto p-4">
        {error && <p className="text-red-500 font-bold">{error}</p>}
       
        <GenreDropdown 
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect}
        />

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredMovies.map((movie, index) => {
            if (filteredMovies.length === index + 1) {
              // attach ref to the last movie card
              return (
                <div
                  ref={lastMovieRef}
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className="cursor-pointer"
                >
                  <MovieCard movie={movie}/>
                </div>
              );
            } else {
              return (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <MovieCard movie={movie} />
                </div>
              );
            }
          })}
        </div>

        {loading && <p className="text-center mt-6 animate-pulse">Loading more movies...</p>}
        {!hasMore && <p className="text-center mt-6 text-gray-400">No more movies</p>}
      </main>

      {/* Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default App;