import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./css/index.css"

import { Provider } from "react-redux"
import { store } from "./redux/store.ts"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import translationEN from "../locale/en.json" // en translation.json
import translationFA from "../locale/fa.json" // fa translation.json

const language = JSON.parse(
  localStorage.getItem("nadin-soft-react-test") || ""
) || { lan: "en" }

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    fa: {
      translation: translationFA,
    },
  },
  lng: language.lan, // set default language based on localstorage or redux language
  fallbackLng: ["en", "fa"],
  interpolation: {
    escapeValue: false,
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
