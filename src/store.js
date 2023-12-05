import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись" },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
  /**
   * Добавление записи в корзину
   * @param code
   */
  addToCart(code) {
    const isIncludeItem = this.state.cart.some((it) => it.code === code);

    this.setState({
      ...this.state,
      cart: isIncludeItem
        ? this.state.cart.map((cartItem) => {
            if (cartItem.code === code) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          })
        : [
            ...this.state.cart,
            {
              ...this.state.list.filter((el) => el.code === code)[0],
              quantity: 1,
            },
          ],
    });

    this.state.cartLength = this.state.cart.length;
    this.state.totalPrice = this.state.cart.reduce(
      (a, item) => a + item.price * item.quantity,
      0
    );
  }
  /**
   * Удаление записи из корзины
   * @param code
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((it) => it.code !== code),
    });

    this.state.cartLength = this.state.cart.length;
    this.state.totalPrice = this.state.cart.reduce(
      (a, item) => a + item.price * item.quantity,
      0
    );
  }
}

export default Store;
