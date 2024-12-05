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
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
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
    <div>
      {details ? (
        <>
          {/* Mostrar etiqueta si es una película o serie */}
          <span className="type-label">{details.type === "movie" ? "MOVIE" : "SERIE"}</span>

          <h1>{details.title || details.name}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title || details.name}
          />
          <p>{details.overview}</p>
          <p>Release date: {details.release_date || details.first_air_date}</p>
          <p>Rating: {details.vote_average}</p>
          <p>Genres: {details.genres.map((genre) => genre.name).join(", ")}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
