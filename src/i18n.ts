import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json"

const resources = {
	en: { translation: en }
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	interpolation: { escapeValue: true }
});

export default i18n;