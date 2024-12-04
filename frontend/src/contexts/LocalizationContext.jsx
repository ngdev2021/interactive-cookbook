import React, { createContext, useState } from 'react';

export const LocalizationContext = createContext();

const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LocalizationContext.Provider
      value={{ language, switchLanguage }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
