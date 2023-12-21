/**
 * Форматирование даты
 * @param value {Date String}
 * @returns {String}
 */
export default function dateFormat(value) {
  const newDate = new Date(value);

  let date = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(newDate);

  return date.replace("г.", "");
}
