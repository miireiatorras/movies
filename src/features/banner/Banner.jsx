import React from 'react';
import './Banner.css';

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
      <img src="/hola.jpg" alt="banner" className="banner-img" />
      <h1>Welcome to FeelReel!</h1>
      <h3>"Discover stories, feel emotion, live magic.”</h3>
      <button>How are you feeling today?</button>
      <div className="button-container">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            className="button"
            style={{
              backgroundImage: `url('${emotion.image}')`,
              ...emotion.extraStyle, // Aplica estilos adicionales si existen
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
