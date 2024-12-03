import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, image, id }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${image}`;

  return (
    <div className="movie-card">
      <Link to={`/details/${id}`}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;
