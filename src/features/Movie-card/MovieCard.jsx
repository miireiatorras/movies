import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, image, id, release_date }) => {
  const imageUrl = image ? `https://image.tmdb.org/t/p/w500${image}` : '/Image-not-found.png';

  return (
    <div className="movie-card">
      <Link to={`/details/${id}`}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <small>{release_date}</small>
      </Link>
    </div>
  );
};

export default MovieCard;
