import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import skJSON from "./locale/sk.json";
import uaJSON from "./locale/ua.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: { en: { ...enJSON }, sk: { ...skJSON }, ua: { ...uaJSON } },
  lng: "en",
});
