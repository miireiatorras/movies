import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <>
      <img src="/hola.jpg" alt="banner" className="banner-img" />
      <h1>Welcome to FeelReel! </h1>
      <h3>"Discover stories, feel emotion, live magic.”</h3>
      <button>How are you feeling today?</button>
    </>
  );
}

export default Banner;
