import { createContext, useContext, useState } from "react";
import fi from "/src/translations/fi.json";
import en from "/src/translations/en.json";

export const LanguageContext = createContext();

const dictionaries = { fi, en };

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("lang") || "fi";
  });

  const setLang = (newLang) => {
    localStorage.setItem("lang", newLang);
    setLangState(newLang);
  };

  const t = (key) => {
    const dict = dictionaries[lang];
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
