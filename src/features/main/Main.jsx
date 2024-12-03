import React, { useState, useEffect } from "react";
import MovieCard from "../Movie-card/MovieCard";
import "./Main.css";
import Banner from "../banner/Banner";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchTopRatedMovies();
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

  return (
    <div className="Main">
      <div>
        <Banner />
      </div>
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
    </div>
  );
};

export default Main;
