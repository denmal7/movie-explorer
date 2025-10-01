

const GenreDropdown = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className="mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => onSelect(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
        >
            <option value="">All Genres</option>
            {genres.map((g) => (
                <option key={g.id} value={g.id}>
                    {g.name}
                </option>
            ))}
        </select>
    </div>
  )
};

export default GenreDropdown;