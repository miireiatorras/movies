import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../features/Movie-card/MovieCard";

const ResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  // Fetch search results and genres when the query is available
  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
      fetchGenres();
    }
  }, [query]);

  // Apply filtering whenever search results, rating, or genre change
  useEffect(() => {
    filterResults();
  }, [rating, genre, searchResults]);

  // Fetch search results from the API
  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&language=en-US`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o", // Reemplaza con tu clave API
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.results); // Para verificar los resultados
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Fetch genres for filtering
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o", // Reemplaza con tu clave API
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Filter results by rating and genre
  const filterResults = () => {
    let filtered = searchResults;

    // Filter by rating
    if (rating > 0) {
      filtered = filtered.filter(
        (result) => result.vote_average >= rating
      );
    }

    // Filter by genre
    if (genre) {
      filtered = filtered.filter((result) =>
        result.genre_ids?.includes(Number(genre))
      );
    }

    setFilteredResults(filtered);
  };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      <div className="filters">
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="range"
            id="rating"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <span>{rating}</span>
        </div>

        <div>
          <label htmlFor="genre">Select Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="movie-list">
        {filteredResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredResults.map((result) => (
            <MovieCard
              key={result.id}
              title={result.title || result.name}
              image={result.poster_path}
              id={`${result.media_type}-${result.id}`}
              release_date={result.release_date}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
