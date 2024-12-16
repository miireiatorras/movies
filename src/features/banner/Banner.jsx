import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

function Banner() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/emotions'); // redirigeix a la ruta "/emotions"
  };

  return (
    <div className="banner-container">
      <img src="/hola.jpg" alt="banner" className="banner-img" />
      <div className="banner-content">
        <h1>Welcome to FeelReel!</h1>
        <h3>"Discover stories, feel emotion, live magic.”</h3>
        <button onClick={handleButtonClick}>
          How are you feeling today?
        </button>
      </div>
    </div>
  );
}

export default Banner;
