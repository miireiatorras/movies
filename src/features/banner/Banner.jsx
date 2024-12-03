import React from 'react';
import './Banner.css';
import { FaSmile } from 'react-icons/fa'; // Importa el icono de la cara sonriente

function Banner() {
  return (
    <div className="banner-container">
      <img src="/hola.jpg" alt="banner" className="banner-img" />
      <div className="banner-content">
        <h1>Welcome to FeelReel!</h1>
        <h3>"Discover stories, feel emotion, live magic.”</h3>
        <button>
          <FaSmile style={{ marginRight: '10px' }} /> {/* Cara sonriente */}
          How are you feeling today?
        </button>
      </div>
    </div>
  );
}

export default Banner;
