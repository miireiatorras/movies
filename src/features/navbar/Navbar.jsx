import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";

function Navbar() {
  // Estat per gestionar el text introduït a la barra de cerca
  const [searchQuery, setSearchQuery] = useState("");

  // Hook per navegar a una altra ruta
  const navigate = useNavigate();

  // Funció que gestiona l'enviament del formulari de cerca
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Evita que la pàgina es recarregui
    if (searchQuery.trim()) { 
      // Només navega si hi ha text (sense espais buits)
      navigate(`/results?query=${searchQuery}`); // Navega a la ruta amb el terme de cerca
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
          value={searchQuery} // Vincula el valor de l'input amb l'estat
          onChange={(e) => setSearchQuery(e.target.value)} // Actualitza l'estat quan l'usuari escriu
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
