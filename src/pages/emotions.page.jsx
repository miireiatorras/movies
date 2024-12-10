import React, { useState } from "react";
import "./EmotionsPage.css";

function EmotionsPage() {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [results, setResults] = useState([]);

  const emotions = [
    { name: "HAPPINESS", image: "/alegria.png" },
    { name: "SADNESS", image: "/tristeza.png" },
    { name: "HORROR", image: "/miedo.png" },
    { name: "RELAX", image: "/relajado.jpg" },
    { name: "MOTIVATE", image: "/motivada.avif" },
    { name: "CURIOSITY", image: "/curiosidad.jpg" },
    { name: "NOSTALGIA", image: "/nostalgia.jpeg" },
    { name: "ROMANCE", image: "/romance.jpg" },
    { name: "DREAMER", image: "/soñador.jpg" },
    { name: "BORING", image: "/aburrido.jpg", extraStyle: { backgroundPosition: "center 37%" } },
  ];

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    // Simulate results (you should replace this with an API call)
    const dummyResults = [
      { id: 1, title: `${emotion} Movie 1`, type: "movie" },
      { id: 2, title: `${emotion} Series 1`, type: "series" },
    ];
    setResults(dummyResults);
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
      <h1>Discover Content Based on Your Emotions</h1>
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
      {selectedEmotion && (
        <div className="results-container">
          <h2>{generatePersonalizedMessage(selectedEmotion)}</h2>
          <ul className="results-list">
            {results.map((result) => (
              <li key={result.id} className={`result-item ${result.type}`}>
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