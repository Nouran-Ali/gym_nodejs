// locales/i18nConfig.ts

const i18nConfig = {
  fallbackLng: 'en',
  resources: {
    en: {
      translation: require('./en.json'),
    },
    ar: {
      translation: require('./ar.json'),
    },
  },
};

export default i18nConfig;
