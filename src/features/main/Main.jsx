import React, { useState, useEffect } from "react"; 
import MovieCard from "../Movie-card/MovieCard"; 
import "./Main.css"; 
import Banner from "../banner/Banner";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]); //state to store popular movies
  const [popularSeries, setPopularSeries] = useState([]); //state to store popular series

  useEffect(() => {
    fetchMovies(); //we call the function that fetches the popular movies
    fetchSeries(); //we call the function that fetches the popular series
  }, []);

  //obtains the popular movies from the API
  const fetchMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc", { 
        headers: { 
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o", 
          Accept: "application/json" 
        } 
      });
      const data = await response.json();
      setPopularMovies(data.results || []); //stores the popular movies in the state
    } catch (error) {
      console.error("Error fetching movies:", error);
      setPopularMovies([]); // manages errors
    }
  };

  //obtains the popular series from the API
  const fetchSeries = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/tv/popular?language=en-US", { 
        headers: { 
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o", 
          Accept: "application/json" 
        } 
      });
      const data = await response.json();
      setPopularSeries(data.results || []); // it stores the series in the state
    } catch (error) {
      console.error("Error fetching series:", error);
      setPopularSeries([]); // manages errors
    }
  };

  return (
    <div className="Main">
      <Banner /> 
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {popularMovies.length > 0 ? (
          popularMovies.map((movie) => ( // show the movies
            <MovieCard key={movie.id} title={movie.title} image={movie.poster_path} id={`movie-${movie.id}`} release_date={movie.release_date} />
          ))
        ) : (
          <p>No movies available</p> 
        )}
      </div>

      <h1>Popular TV Series</h1>
      <div className="movie-list">
        {popularSeries.length > 0 ? (
          popularSeries.map((series) => ( // show the series
            <MovieCard key={series.id} title={series.name} image={series.poster_path} id={`series-${series.id}`} release_date={series.first_air_date} />
          ))
        ) : (
          <p>No TV series available</p> 
        )}
      </div>
    </div>
  );
};

export default Main;
