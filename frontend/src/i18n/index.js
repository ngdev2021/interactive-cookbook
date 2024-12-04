import en from './en.json';
import es from './es.json';
import fr from './fr.json';

const languages = {
  en,
  es,
  fr,
};

export const getTranslation = (key, lang = 'en') => {
  return languages[lang]?.[key] || key;
};
