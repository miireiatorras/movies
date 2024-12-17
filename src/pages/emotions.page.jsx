import React, { useState, useEffect } from "react";
import "./EmotionsPage.css";

function EmotionsPage() {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const emotions = [
    { name: "HAPPINESS", image: "/alegria.png", genreId: 35 }, // Comedy
    { name: "SADNESS", image: "/tristeza.png", genreId: 18 }, // Drama
    { name: "HORROR", image: "/miedo.png", genreId: 27 }, // Horror
    { name: "RELAX", image: "/relajado.jpg", genreId: 10749 }, // Romance
    { name: "MOTIVATE", image: "/motivada.avif", genreId: 28 }, // Action
    { name: "CURIOSITY", image: "/curiosidad.jpg", genreId: 99 }, // Documentary
    { name: "NOSTALGIA", image: "/nostalgia.jpeg", genreId: 10751 }, // Family
    { name: "ROMANCE", image: "/romance.jpg", genreId: 10749 }, // Romance
    { name: "DREAMER", image: "/soñador.jpg", genreId: 14 }, // Fantasy
    { name: "BORING", image: "/aburrido.jpg", genreId: 80 }, // Crime
  ];

  const fetchContent = async (type, genreId) => {
    try {
      const endpoint = `https://api.themoviedb.org/3/discover/${type}?language=en-US&with_genres=${genreId}&sort_by=popularity.desc`;

      const response = await fetch(endpoint, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o`,
        },
      });

      const data = await response.json();
      return data.results
        .filter((item) => item.poster_path) // Filtrar elementos sin póster
        .map((item) => ({
          id: item.id,
          title: item.title || item.name,
          type,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const handleEmotionClick = async (emotionName) => {
    const emotion = emotions.find((e) => e.name === emotionName);
    if (!emotion) return;

    setSelectedEmotion(emotionName);
    setLoading(true);

    const movies = await fetchContent("movie", emotion.genreId);
    const series = await fetchContent("tv", emotion.genreId);

    setResults([...movies, ...series]); // Combinar películas y series
    setLoading(false);
  };

  return (
    <div className="emotions-page">
      <h1 className="titulo">Discover Content Based on Your Emotions</h1>
      <p className="explanatory-text">
        Select how you feel today, and we will show you movies and series that match your mood!
      </p>
      <div className="button-container">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            className="emotion-button"
            style={{
              backgroundImage: `url('${emotion.image}')`,
            }}
            onClick={() => handleEmotionClick(emotion.name)}
          >
            {emotion.name}
          </button>
        ))}
      </div>
      {loading && <p>Loading content...</p>}
      {selectedEmotion && !loading && (
        <div className="results-container">
          <h2>Results for {selectedEmotion}</h2>
          <ul className="results-list">
            {results.map((result) => (
              <li key={result.id} className={`result-item ${result.type}`}>
                <img
                  className="result-poster"
                  src={result.poster}
                  alt={`${result.title} poster`}
                />
                <span className={`result-type ${result.type}`}>
                  {result.type.toUpperCase()}
                </span>
                <p className="result-title">{result.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmotionsPage;