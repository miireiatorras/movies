import React from 'react'
import './EmotionsPage.css';

function Banner() {
  const emotions = [
    { name: "ALEGRÍA", image: "/alegria.png" },
    { name: "TRISTEZA", image: "/tristeza.png" },
    { name: "MIEDO", image: "/miedo.png" },
    { name: "RELAX", image: "/relajado.jpg" },
    { name: "MOTIVADA", image: "/motivada.avif" },
    { name: "CURIOSIDAD", image: "/curiosidad.jpg" },
    { name: "NOSTALGIA", image: "/nostalgia.jpeg" },
    { name: "ROMANCE", image: "/romance.jpg" },
    { name: "SOÑADOR", image: "/soñador.jpg" },
    { name: "ABURRIDO", image: "/aburrido.jpg", extraStyle: { backgroundPosition: "center 37%" } }, // Ajuste para ABURRIDO
  ];

  return (
    <>
    <h1>Emotions Page</h1>
    <h2>How do you feel today?</h2>
      <div className="button-container">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            className="button"
            style={{
              backgroundImage: `url('${emotion.image}')`,
              ...emotion.extraStyle,
            }}
          >
            {emotion.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Banner;