/**
 * Main Goal:
 * The Banner component displays a full-width banner with a button.
 * - It includes an inspiring message and a button for navigation.
 * - Enhances the visual appeal of the homepage.
 */


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

function Banner() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/emotions'); //navigates to the "/emotions" route when the button is clicked
  };

  return (
    <div className="banner-container">
      <img src="/hola.jpg" alt="banner" className="banner-img" />
      <div className="banner-content">
        <h1>Welcome to FeelReel!</h1>
        <h3>"Discover stories, feel emotion, live magic.”</h3>
        <button onClick={handleButtonClick}> {/*calls the handleButtonClick function when the button is clicked*/}
          How are you feeling today?
        </button>
      </div>
    </div>
  );
}

export default Banner;
