import { LanguageContext } from "../contexts/LanguageContext";
import { useContext } from "react";

const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within an LanguageProvider");
  }

  return context;
};

export { useLang };
