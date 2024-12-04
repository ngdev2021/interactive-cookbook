import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import MealPlanner from './pages/MealPlanner';
import RecipeDetail from './pages/RecipeDetail';
import ShoppingList from './pages/ShoppingList';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
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
