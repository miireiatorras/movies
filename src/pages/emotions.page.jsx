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
    { name: "BORING", image: "/aburrido.jpg", genreId: 80, extraStyle: { backgroundPosition: "center 37%" } }, // Crime
  ];

  const fetchContent = async (type, genreId) => {
    try {
      const endpoint =
        type === "movie"
          ? `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_genres=${genreId}`
          : `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&with_genres=${genreId}`;

      const response = await fetch(endpoint, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTJhY2YzYzJlMDhhNjRjNzY2OTAzOTlmODNlODdlMSIsIm5iZiI6MTczMjc4ODI0MS4zMTc0MzIyLCJzdWIiOiI2NzNjNmQ2YjNiNDgwNDgxY2RkZGNlYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3UCzg5mc2oauTFeiGBWUkF67wwRycQuQ9qcl_B9eU9o`, // Replace YOUR_API_KEY with your TMDB API Key
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

    setResults([...movies, ...series]); // Combina películas y series
    setLoading(false);
  };

  const generatePersonalizedMessage = (emotion) => {
    switch (emotion) {
      case "HAPPINESS":
        return "We love to see you happy! Here are some joyful stories for you.";
      case "SADNESS":
        return "Feeling a bit down? These recommendations might lift your spirits or keep you company.";
      case "HORROR":
        return "Feeling brave today? Here's a chilling selection for your mood.";
      case "RELAX":
        return "Looking to unwind? These picks will help you relax and recharge.";
      case "MOTIVATE":
        return "Time to get inspired! These movies and series will boost your motivation.";
      case "CURIOSITY":
        return "For the curious mind, we’ve found something intriguing for you to explore.";
      case "NOSTALGIA":
        return "Let’s relive some memories together with these nostalgic stories.";
      case "ROMANCE":
        return "Love is in the air! These recommendations are perfect for a romantic mood.";
      case "DREAMER":
        return "For dreamers like you, here’s something to spark your imagination.";
      case "BORING":
        return "A boring day? These picks will break the monotony.";
      default:
        return "Based on how you’re feeling, here’s what we recommend...";
    }
  };

  return (
    <div className="emotions-page">
      <h1 className="titulo">Discover Content Based on Your Emotions</h1>
      <p className="explanatory-text">
        Select how you feel today from the buttons below, and we will show you movies and series
        that match your mood. Explore and find the perfect content for your current emotions!
      </p>
      <div className="button-container">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            className="emotion-button"
            style={{
              backgroundImage: `url('${emotion.image}')`,
              ...emotion.extraStyle,
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
          <h2>{generatePersonalizedMessage(selectedEmotion)}</h2>
          <ul className="results-list">
            {results.map((result) => (
              <li key={result.id} className={`result-item ${result.type}`}>
                <img
                  className="result-poster"
                  src={result.poster}
                  alt={`${result.title} poster`}
                />
                <span className="result-type">{result.type.toUpperCase()}</span>
                {result.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmotionsPage;