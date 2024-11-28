import React from 'react';

const MovieCard = ({ title, image }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${image}`; 

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default MovieCard;
