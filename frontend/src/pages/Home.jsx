import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import { fetchRecipes } from '../utils/api';
import './Home.css';
import FeaturedRecipes from '../components/FeatureRecipes/FeaturedRecipes';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes()
      .then((res) => setRecipes(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedRecipes recipes={recipes} />
    </div>
  );
};

export default Home;
