/**
 * Main Goal:
 * The Navbar component provides navigation links and a search bar.
 * - It enables users to navigate between pages.
 * - Allows users to search for movies or series, redirecting to a results page.
 */

import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";


function Navbar() {
  // State to manage the text entered in the search bar
  const [searchQuery, setSearchQuery] = useState("");

  // Hook to navigate to a different route
  const navigate = useNavigate();

  // Function that handles the search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading
    if (searchQuery.trim()) { 
      // Only navigates if there's text (excluding whitespace)
      navigate(`/results?query=${searchQuery}`); // Navigates to the route with the search term
    }
  };

  return (
    <nav className="navbar"> 
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img src="/logo_app.png" alt="logo" className="logo" /> 
        </Link>
      </div>

      {/* Navigation Msenu */}
      <ul className="navbar-menu">
        <li><Link to="/">Popular Movies and TV Series</Link></li>
        <li><Link to="/emotions">Emotions</Link></li>
      </ul>
      
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies or series..." 
          value={searchQuery} // Binds the input value to the state
          onChange={(e) => setSearchQuery(e.target.value)} // Updates the state when the user types
          className="search-input"
        />
        <button type="submit" className="search-button"> 
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
