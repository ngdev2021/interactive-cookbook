import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import RecipeDetail from './components/features/Recipe/RecipeDetail/RecipeDetail';

import Home from './pages/Home/Home';
import MealPlanner from './components/features/MealPlanner/MealPlanner';
import ShoppingList from './components/features/ShoppingList/ShoppingList';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/:category/:id" element={<RecipeDetail />} />

        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />
      </Routes>
    </>
  );
};

export default App;
