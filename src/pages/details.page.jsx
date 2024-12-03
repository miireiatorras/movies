import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';  // Importar iconos de estrellas

const DetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
            Accept: 'application/json',
          },
        }
      );
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);  // Número de estrellas completas
    const halfStars = Math.ceil((rating % 2) / 1);  // Número de estrellas medias
    const emptyStars = 5 - fullStars - halfStars;  // Número de estrellas vacías

    const stars = [];

    // Agregar estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    // Agregar estrellas medias
    for (let i = 0; i < halfStars; i++) {
      stars.push(<FaStarHalfAlt key={`half-${i}`} />);
    }

    // Agregar estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <div>
      {movieDetails ? (
        <>
          <h1>{movieDetails.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
          <p>{movieDetails.overview}</p>
          <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
          <p>Release Date: {movieDetails.release_date}</p>
          <p>Budget: ${movieDetails.budget}</p>
          <p><strong>Review:</strong> {renderStars(movieDetails.vote_average)}</p>  
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
