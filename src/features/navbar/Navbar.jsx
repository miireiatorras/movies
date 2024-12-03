import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src="/logo_app.png" alt="logo" className="logo" />
          </Link>
        </div>
        <div className="navbar-content">
          <p className="profile-link">My profile</p>
          <img src="/avatar.png" alt="avatar" className="avatar" />
        </div>
      </nav>
    );
}

export default Navbar;
