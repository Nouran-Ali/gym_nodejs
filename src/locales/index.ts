// locales/index.ts

import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import i18nConfig from './i18nConfig';

export default function initializeLocalization() {
  return i18next.use(i18nextMiddleware.LanguageDetector).init(i18nConfig);
}
