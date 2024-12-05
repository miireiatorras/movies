import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const [type, typeId] = id.split("-");
    fetchDetails(type, typeId);
  }, [id]);

  const fetchDetails = async (type, typeId) => {
    try {
      const endpoint =
        type === "movie"
          ? `https://api.themoviedb.org/3/movie/${typeId}?language=en-US`
          : `https://api.themoviedb.org/3/tv/${typeId}?language=en-US`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: "Bearer YOUR_API_KEY_HERE",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setDetails({ ...data, type });
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div className="details-container">
      {details ? (
        <>
          {/* Mostrar etiqueta si es una película o serie */}
          <span className={`type-label ${details.type}`}>{details.type === "movie" ? "MOVIE" : "SERIE"}</span>

          <h1 className="details-title">{details.title || details.name}</h1>
          <img
            className="details-image"
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title || details.name}
          />
          <p className="details-overview">{details.overview}</p>
          <p className="details-release">
            Release date: <span>{details.release_date || details.first_air_date}</span>
          </p>
          <p className="details-rating">
            Rating: <span>{details.vote_average}</span>
          </p>
          <p className="details-genres">
            Genres: <span>{details.genres.map((genre) => genre.name).join(", ")}</span>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
