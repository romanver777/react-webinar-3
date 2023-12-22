import { useState, useEffect, useMemo } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());
 
  const unsubscribe = useMemo(() => i18n.subscribe((lang) => setLang(lang)), []);

  useEffect(() => unsubscribe, [unsubscribe]);

  const obj = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang: (l) => {
        i18n.changeLang(l);
        setLang(i18n.getLang());
      } ,
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => i18n.translate(lang, text, number),
    }),
    [lang]
  );

  return obj;
}
