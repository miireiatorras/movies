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

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
      fetchGenres();
    }
  }, [query]);

  useEffect(() => {
    filterResults();
  }, [rating, genre, searchResults]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&language=en-US`,
        {
          headers: {
            Authorization: "Bearer YOUR_API_KEY", // Asegúrate de usar tu clave de API aquí
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.results || []); // Asegúrate de que 'results' sea un array
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        {
          headers: {
            Authorization: "Bearer YOUR_API_KEY", // Asegúrate de usar tu clave de API aquí
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setGenres(data.genres || []); // Asegúrate de que 'genres' sea un array
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const filterResults = () => {
    let filtered = searchResults;

    // Filtrar por rating
    if (rating > 0) {
      filtered = filtered.filter(
        (result) => result.vote_average >= rating
      );
    }

    // Filtrar por género
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

      {/* Filtros */}
      <div className="filters">
        {/* Filtro de Rating */}
        <div>
          <label htmlFor="rating">Minimum Rating:</label>
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

        {/* Filtro de Género */}
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

      {/* Resultados filtrados */}
      <div className="movie-list">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <MovieCard
              key={result.id}
              title={result.title || result.name}
              image={result.poster_path}
              id={`${result.media_type}-${result.id}`}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
