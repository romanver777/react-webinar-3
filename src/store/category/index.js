import { default as arrayToTree } from "array-to-tree";
import StoreModule from "../module";

/**
 * Состояние списка категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  /**
   * Загрузка списка категорий
   * @returns {Promise<void>}
   */
  async setCategories() {
    // Установка признака загрузки
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Ждем загрузки списка категорий"
    );

    const res = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await res.json();

    this.setState(
      {
        ...this.getState(),
        list: this.getCategoriesList(json.result.items),
        waiting: false,
      },
      "Загружен список категорий из АПИ"
    );
  }

  /**
   * Приведение списка категорий в нужный формат
   * @param [items] {Array} Список категорий
   * @returns {Promise<void>}
   */
  getCategoriesList(items) {
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
          title: "-".repeat(level) + obj.title,
        });

        if (obj.hasOwnProperty("children")) {
          setList(obj.children, level + 1);
        }
      }
    }
    return list;
  }
}

export default CategoryState;
