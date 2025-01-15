/**
 * Main Goal:
 * The DetailsPage component displays detailed information about a specific movie or series.
 * - Fetches and shows details of the selected content based on the URL ID.
 * - Fetches and displays related content to enhance user experience.
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams(); //obtain the id from the URL
  const [details, setDetails] = useState(null);  //state to store the details of the content
  const [relatedContent, setRelatedContent] = useState([]); //state to store the related content
  const navigate = useNavigate();  

  useEffect(() => {
    const [type, typeId] = id.split("-"); //split the id and the type
    fetchDetails(type, typeId);  // we obtain the details of the content (movie or series) 
    fetchRelatedContent(type, typeId); //we obtain the related content
  }, [id]);

  const fetchDetails = async (type, typeId) => {
    try {
//construction of the endpoint depending on whether it is a movie or a series
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
      setDetails({ ...data, type }); //we save the details and the type (tv serie or movie)
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

//function to fetch related content
  const fetchRelatedContent = async (type, typeId) => {
    try {
      const endpoint =
        type === "movie"
          ? `https://api.themoviedb.org/3/movie/${typeId}/similar?language=en-US&page=1`
          : `https://api.themoviedb.org/3/tv/${typeId}/similar?language=en-US&page=1`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setRelatedContent(data.results || []);  // we save the related content (if there is any)
    } catch (error) {
      console.error("Error fetching related content:", error);
    }
  };

  const handleRelatedItemClick = (type, id) => {
    navigate(`/details/${type}-${id}`);  // Redirect to the detail page of the clicked content 
  };

  return (
    <div className="details-container">
      {details ? ( // if we have details, we show them
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
                    onClick={() => handleRelatedItemClick(item.media_type, item.id)}  
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
