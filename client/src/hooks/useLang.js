import { LanguageContext } from "../contexts/LanguageContext";
import { useContext } from "react";

export const useLang = () => useContext(LanguageContext);
