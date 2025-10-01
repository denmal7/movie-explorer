import { X } from "lucide-react";

const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null;

    // Get YouTube Trailer if available
    const trailer = movie.videos?.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-3xl overflow-hidden shadow-xl relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-50 text-white hover:text-red-500"
                >
                    <X size={28} />
                </button>

                {/* Movie Poster */}
                <div className="relative flex flex-col justify-center">
                    <div className="flex-[3]">
                        <img
                          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                          alt={movie.title}
                          className="w-full h-64 object-cover"
                        />
                    </div>
                    <div className="flex-[1] w-full bg-gray-900">
                        <h2 className="text-sm text-white font-semibold truncate">{movie.title}</h2>
                        <p className="text-xs text-gray-300">⭐ {movie.vote_average.toFixed(1)}</p>
                    </div>
                </div>
                
                {/* Movie info */}
                <div className="p-4">
                    <p className="text-gray-200 mb-4">{movie.overview}</p>
                    {movie.genres && (
                        <p className="text-sm text-green-400 mb-2">
                            Genres: {movie.genres.map((g) => g.name).join(", ")}
                        </p>
                    )}

                    {/* Trailer */}
                    {trailer ? (
                        <iframe
                          className="w-full h-64 rounded-lg"
                          src={`https://www.youtube.com/embed/${trailer.key}`}
                          title="Trailer"
                          allowFullScreen
                        >
                        </iframe>
                    ) : (
                        <p className="text-gray-400">No trailer available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieModal;