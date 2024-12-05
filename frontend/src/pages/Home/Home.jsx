import React, { useEffect, useState } from 'react';
import Hero from '../../components/layout/Hero/Hero';
import { fetchRecipes } from '../../utils';
import './Home.css';
import FeaturedRecipes from '../../components/features/Recipe/FeatureRecipes/index';

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
