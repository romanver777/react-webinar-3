import { default as arrayToTree } from "array-to-tree";

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Приведение списка категорий в нужный формат
 * @param [items] {Array} Список категорий
 * @returns {Array<Object>}
 */
export function getCategoriesList(items) {
  const formattedList = items.map((it) => ({
    ...it,
    parent: it.parent == null ? it.parent : it.parent._id,
  }));

  const tree = arrayToTree(formattedList, {
    parentProperty: "parent",
    customID: "_id",
  });

  const list = [{ value: "", title: "Все" }];

  setList(tree);

  function setList(tree, level = 0) {
    for (let obj of tree) {
      list.push({
        value: obj._id,
        title: "- ".repeat(level) + obj.title,
      });

      if (obj.hasOwnProperty("children")) {
        setList(obj.children, level + 1);
      }
    }
  }
  return list;
}
