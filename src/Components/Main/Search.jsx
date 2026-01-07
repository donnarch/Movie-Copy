import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api_Service from "../../Service/Api_Service";

const categories = ["All", "Movies", "TV Series", "Actors"];
const categoryEndpoints = {
  All: "search/multi",
  Movies: "search/movie",
  "TV Series": "search/tv",
  Persons: "search/person",
};

export default function Search() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const endpoint = categoryEndpoints[activeCategory];
      const response = await Api_Service.GetData(
        `${endpoint}?query=${encodeURIComponent(searchValue.trim())}`
      );

      if (response?.results?.length) {
        setResults(response.results);
      } else {
        setError("No results found");
      }
    } catch {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (item) => {
    if (item.media_type === "person") {
      navigate(`/actor/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tv/${item.id}`);
    } else {
      navigate(`/movies/${item.id}`, {
        state: { movie: item },
      });
    }
  };

  const getImage = (item) =>
    item.poster_path || item.profile_path
      ? `https://image.tmdb.org/t/p/w300${
          item.poster_path || item.profile_path
        }`
      : "https://via.placeholder.com/300x450?text=No+Image";

  const getTitle = (item) => item.title || item.name || "No title";

  const getYear = (item) => {
    const date = item.release_date || item.first_air_date;
    return date ? date.split("-")[0] : "—";
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 px-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center">
        {/* SEARCH BAR */}
        <div className="flex w-full gap-3">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search movies, TV shows, actors..."
            className="flex-1 bg-[#111] px-6 py-4 text-lg rounded-lg outline-none focus:ring-2 focus:ring-red-600 w-full"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-red-600 px-8 py-4 text-lg rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-4 flex-wrap justify-center mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-lg text-lg font-medium ${
                activeCategory === cat
                  ? "bg-red-600"
                  : "bg-[#2a2a2a] hover:bg-red-600 cursor-pointer"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-400 bg-red-900/30 border border-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* RESULTS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mt-4">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavigate(item)}
              className="bg-[#2a2a2a] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition border border-gray-600"
            >
              <img
                src={getImage(item)}
                alt={getTitle(item)}
                className="h-64 w-full object-cover"
              />
              <div className="p-3">
                <p className="font-semibold truncate text-lg">
                  {getTitle(item)}
                </p>
                <p className="text-gray-400 text-sm">{getYear(item)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
