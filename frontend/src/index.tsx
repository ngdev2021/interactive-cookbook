import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM.createRoot from React 18
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import LocalizationProvider from './contexts/LocalizationContext';
import MealPlanProvider from './contexts/MealPlanContext';
import UserPreferencesProvider from './contexts/UserPreferencesContext';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

// Create a root instead of using ReactDOM.render
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // Ensure 'container' is not null with TypeScript

root.render(
  // <React.StrictMode>
  <ErrorBoundary>
    <LocalizationProvider>
      <MealPlanProvider>
        <UserPreferencesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserPreferencesProvider>
      </MealPlanProvider>
    </LocalizationProvider>
  </ErrorBoundary>
  // </React.StrictMode>
);

reportWebVitals();
