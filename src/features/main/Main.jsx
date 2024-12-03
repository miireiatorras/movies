import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Importar useNavigate
import MovieCard from "../Movie-card/MovieCard";
import "./Main.css";
import Banner from "../banner/Banner";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // Estado para almacenar la búsqueda
  const navigate = useNavigate();  // Hook para la redirección

  useEffect(() => {
    fetchMovies();
    fetchTopRatedMovies();
    fetchSeries();
    fetchTopRatedSeries();
  }, []);

  // Fetch popular movies
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  const fetchSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setPopularSeries(data.results);
    } catch (error) {
      console.error("Error fetching Series:", error);
    }
  };

  // Fetch top-rated movies
  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setTopRatedMovies(data.results);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };
  const fetchTopRatedSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setTopRatedSeries(data.results);
    } catch (error) {
      console.error("Error fetching top rated series:", error);
    }
  };

  // Manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Manejar el submit del formulario
  const handleSearchSubmit = (event) => {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    if (searchQuery.trim()) {
      navigate(`/results?query=${searchQuery}`);  // Redirigir a /results con la búsqueda
    }
  };

  return (
    <div className="Main">
      <div>
        <Banner />
      </div>
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <h1>Popular Movies</h1>
      <div className="movie-list">
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            image={movie.poster_path}
            id={movie.id}
          />
        ))}
      </div>
      
      <h1>Top Rated Movies</h1>
      <div className="movie-list">
        {topRatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            image={movie.poster_path}
            id={movie.id}
          />
        ))}
      </div>

      <h1>Popular TV Series</h1>
      <div className="movie-list">
        {popularSeries.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.original_name}
            image={movie.poster_path}
            id={movie.id}
          />
        ))}
      </div>

      <h1>Top Rated TV Series</h1>
      <div className="movie-list">
        {topRatedSeries.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.original_name}
            image={movie.poster_path}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
