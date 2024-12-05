import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <h1>Cook Em With Kindness</h1>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              activeClassName="active-link"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className="nav-link"
              activeClassName="active-link"
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/videos"
              className="nav-link"
              activeClassName="active-link"
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pairings"
              className="nav-link"
              activeClassName="active-link"
            >
              Pairings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
