import React from 'react';

import './Navbar.css';

function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo_app.png" alt="logo" className="logo" />
        </div>
        <div className="navbar-content">
          <p className="profile-link">My profile</p>
          <img src="/avatar.png" alt="avatar" className="avatar" />
        </div>
      </nav>
    );
  }
  
  export default Navbar;
