const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:scale-105 transition-transform duration-300">
      <div className="relative flex-[3]">
        <img
          src={
            movie.poster_path
              ? `${IMG_BASE}${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <p 
          className="absolute bottom-2 right-3 text-sm text-yellow-300 z-50"
          style={{ textShadow: "0 0 4px rgba(0, 0, 0, 0.8)" }}
        >⭐ {movie.vote_average.toFixed(1)}</p>
      </div>

      <div className="flex-[1] bg-gray-900 text-white text-left px-2">
        <h2 className="py-2 text-sm font-semibold truncate">{movie.title}</h2>
      </div>
    </div>
  );
};

export default MovieCard;
