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

  // Fetch search results when the query changes
  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
      fetchGenres();
    }
  }, [query]);

  // Filter search results when rating, genre or searchResults change
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
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o", 
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.results || []);  // Save results to state
    } catch (error) {
      console.error("Error fetching search results:", error); // Log any error during the fetch
    }
  };

  // Fetch genres from the API to allow filtering
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o", 
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setGenres(data.genres || []);  // Save genres to state
    } catch (error) {
      console.error("Error fetching genres:", error); // Log any error during the fetch
    }
  };

  // Filter the search results based on rating and genre
  const filterResults = () => {
    let filtered = searchResults;

    if (rating > 0) {
      filtered = filtered.filter(
        (result) => result.vote_average >= rating  // Filter by rating
      );
    }

    if (genre) {
      filtered = filtered.filter((result) =>
        result.genre_ids?.includes(Number(genre))  // Filter by genre
      );
    }

    setFilteredResults(filtered);  // Update filtered results state
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
            onChange={(e) => setRating(e.target.value)} // Update rating state
          />
            <span>{rating}</span>
        </div>

        <div>
          <label htmlFor="genre">Select Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)} // Update genre state
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}  {/* Display genres as options */}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="movie-list">
        {filteredResults.length === 0 ? (
          <p>No results found</p>  // Display message if no results match
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
