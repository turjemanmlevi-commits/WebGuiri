import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import hi from './hi.json';
import zh from './zh.json';

const savedLang = localStorage.getItem('webpedidos-lang') || 'es';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    hi: { translation: hi },
    zh: { translation: zh },
  },
  lng: savedLang,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('webpedidos-lang', lng);
  document.documentElement.lang = lng;
});

export default i18n;
