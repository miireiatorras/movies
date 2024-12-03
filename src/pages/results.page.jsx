import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../features/Movie-card/MovieCard";

const ResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setSearchResults(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  return (
    <div className="results-page">
      <h1>Search Results for: "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-list">
          {searchResults.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={movie.poster_path}
              id={movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
