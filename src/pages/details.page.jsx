import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Importa useNavigate
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const navigate = useNavigate();  // Usamos useNavigate

  useEffect(() => {
    const [type, typeId] = id.split("-");
    fetchDetails(type, typeId);
    fetchRelatedContent(type, typeId);
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

  const fetchRelatedContent = async (type, typeId) => {
    try {
      const endpoint =
        type === "movie"
          ? `https://api.themoviedb.org/3/movie/${typeId}/similar?language=en-US&page=1`
          : `https://api.themoviedb.org/3/tv/${typeId}/similar?language=en-US&page=1`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o<YOUR_API_KEY>",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setRelatedContent(data.results || []);
    } catch (error) {
      console.error("Error fetching related content:", error);
    }
  };

  const handleRelatedItemClick = (type, id) => {
    navigate(`/details/${type}-${id}`);  // Navega a la página de detalles del ítem
  };

  return (
    <div className="details-container">
      {details ? (
        <>
          <span className={`type-label ${details.type}`}>
            {details.type === "movie" ? "MOVIE" : "SERIE"}
          </span>
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

          <div className="related-container">
            <h2>Related Content</h2>
            {relatedContent.length > 0 ? (
              <div className="related-list">
                {relatedContent.map((item) => (
                  <div
                    key={item.id}
                    className="related-item"
                    onClick={() => handleRelatedItemClick(item.media_type, item.id)}  // Maneja el click
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={item.title || item.name}
                    />
                    <p>{item.title || item.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Related content not available</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
