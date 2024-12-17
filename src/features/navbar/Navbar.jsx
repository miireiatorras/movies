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

      <div className="navbar-content">
        <p className="profile-link">My profile</p>
        <img src="/avatar.png" alt="avatar" className="avatar" /> 
      </div>
    </nav>
  );
}

export default Navbar;
