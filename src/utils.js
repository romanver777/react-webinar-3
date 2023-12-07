/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Массив страниц пагинации
 * @param active {Number}
 * @param total {Number}
 * @returns [Number, String]
 */
export function getPaginationNumbers(active, total){
  let numbers = [];
  const dots = "...";

  if (active < 3) {
    for (let i = 1; i <= 3; i++) {
      numbers.push(i);
    }
    numbers.push(dots);
    numbers.push(total);
  }
  if(active > total - 2 ){
    numbers.push(1);
    numbers.push(dots);
    for (let i = total - 2; i <= total; i++) {
        numbers.push(i);
      }
  }
  if(active >= 3 && active <= total - 2){
    numbers.push(1);
    if(active !== 3) numbers.push(dots);
    numbers.push(active - 1);
    numbers.push(active);
    numbers.push(active + 1);
    if(active !== total - 2) numbers.push(dots);
    numbers.push(total);
  }

  return numbers;
}
