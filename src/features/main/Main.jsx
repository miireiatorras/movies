import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Movie-card/MovieCard";
import "./Main.css";
import Banner from "../banner/Banner";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]); // Inicializa como un array vacío
  const [popularSeries, setPopularSeries] = useState([]); // Inicializa como un array vacío
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setPopularMovies(data.results || []); // Maneja el caso donde `results` sea undefined
    } catch (error) {
      console.error("Error fetching movies:", error);
      setPopularMovies([]); // Asegúrate de mantener un array vacío si hay un error
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setPopularSeries(data.results || []); // Maneja el caso donde `results` sea undefined
    } catch (error) {
      console.error("Error fetching series:", error);
      setPopularSeries([]); // Asegúrate de mantener un array vacío si hay un error
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?query=${searchQuery}`);
    }
  };

  return (
    <div className="Main">
      <Banner />
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies or series..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <h1>Popular Movies</h1>
      <div className="movie-list">
        {popularMovies.length > 0 ? (
          popularMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={movie.poster_path}
              id={`movie-${movie.id}`}
            />
          ))
        ) : (
          <p>No movies available</p> // Mensaje por defecto si no hay datos
        )}
      </div>

      <h1>Popular TV Series</h1>
      <div className="movie-list">
        {popularSeries.length > 0 ? (
          popularSeries.map((series) => (
            <MovieCard
              key={series.id}
              title={series.name}
              image={series.poster_path}
              id={`series-${series.id}`}
            />
          ))
        ) : (
          <p>No TV series available</p> // Mensaje por defecto si no hay datos
        )}
      </div>
    </div>
  );
};

export default Main;
