import * as translations from "./translations";

class I18NService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.lang = config.lang;
    this.listeners = [];
  }

  /**
   * Выбор локали
   * @returns {String} локаль
   */
  getLang() {
    return this.lang;
  }

  /**
   * Изменение локали и заголовка в api
   * @param lang {String} Код языка
   * @returns {<void>}
   */
  changeLang(lang) {
    this.lang = lang;
    this.services.api.setHeader("X-lang", lang);
    for (const listener of this.listeners) listener(this.lang);
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Перевод фразы по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang = this.lang, text, plural) {
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18NService;
