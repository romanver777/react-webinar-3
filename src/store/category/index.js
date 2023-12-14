import StoreModule from "../module";
import {getCategoriesList} from "../../utils";

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
        list: getCategoriesList(json.result.items),
        waiting: false,
      },
      "Загружен список категорий из АПИ"
    );
  }
}

export default CategoryState;
