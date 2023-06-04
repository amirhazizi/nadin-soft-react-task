import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "../locale/en.json" // en translation.json
import translationFA from "../locale/fa.json" // fa translation.json
const i18nInit = (lan: string) => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEN,
      },
      fa: {
        translation: translationFA,
      },
    },
    lng: lan, // set default language based on localstorage or redux language
    fallbackLng: ["en", "fa"],
    interpolation: {
      escapeValue: false,
    },
  })
}
export default i18nInit
