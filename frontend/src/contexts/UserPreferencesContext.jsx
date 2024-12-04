import React, { createContext, useState } from 'react';

export const UserPreferencesContext = createContext();

const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    favoriteRecipes: [],
  });

  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, updatePreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
