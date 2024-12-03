import React, { useState, useEffect } from 'react';
import MovieCard from '../Movie-card/MovieCard';
import './Main.css';
import Banner from '../banner/Banner';

const Main = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);



  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o', // Reemplaza con tu token
            'Accept': 'application/json',
          },
        }
      );

      const data = await response.json();
      setMovies(data.results); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="Main">
      <div>
      <Banner />
      </div>
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} title={movie.title} image={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default Main;
