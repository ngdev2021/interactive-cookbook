import React, { useState } from 'react';
import './Navbar.css';
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/images/logo.png'; // Replace with your logo

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="menu-wrapper">
      <nav className="navbar">
        <div className="container">
          {/* Left Section: Logo and Hamburger */}
          <div className="navbar-left">
            <button
              className="hamburger"
              onClick={toggleMenu}
              aria-label="Toggle Navigation"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
            {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
          </div>

          {/* Center Section: Links */}
          <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
            <li>
              <a href="/" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="/recipes">Recipes</a>
            </li>
            <li>
              <a href="/videos">Videos</a>
            </li>
            <li>
              <a href="/pairings">Pairings</a>
            </li>
          </ul>

          {/* Right Section: Search and Profile */}
          <div className="navbar-right">
            {/* Search Bar */}
            <div
              className={`search-bar ${searchOpen ? 'expanded' : ''}`}
            >
              <button
                className="icon-button"
                onClick={toggleSearch}
                aria-label="Toggle Search"
              >
                <FiSearch />
              </button>
              <div
                className={`search-input-wrapper ${
                  searchOpen ? 'visible' : ''
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  autoFocus={searchOpen}
                />
                <button
                  className="search-submit"
                  aria-label="Submit Search"
                >
                  Go
                </button>
              </div>
            </div>

            {/* Profile Icon */}
            <div className="profile-icon">
              <FiUser />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
