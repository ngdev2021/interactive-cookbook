import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from '../../public/assets/images/main/rustic-food_upscaled.png'; // Replace with your actual hero image path

const Hero = () => {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Hot Truffle Honey Wings</h1>
        <p className="hero-description">
          Crispy fried chicken wings with Truffle Hot Honey
        </p>
        <Link to="/recipe/4">
          <button className="button-primary">Get This Recipe</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
