import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#constructor" className="nav-link">Constructor</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
      <div class="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="navbar-right">
        <input type="search" placeholder="Search..." className="search-input" />
      </div>
    </nav>
  );
}
