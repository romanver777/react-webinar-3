import StoreModule from "../module";

/**
 * Состояние User
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isAuth: false,
      user: {},
      error: null,
      waiting: false,
    };
  }

  /**
   * Проверка токена
   * @param [token] {string} token
   * @returns {<void>}
   */
  checkAuth() {
    if (localStorage.getItem("tk")) {
      this.loginWithToken(localStorage.getItem("tk"));
      return;
    }

    this.setState({
      ...this.getState(),
      error: "Error",
    });
  }
  
  /**
   * Удаление пользователя
   * @returns {<void>}
   */
  resetUser() {
    this.setState({
      ...this.initState()
    }, "Удаление пользователя");
  }

  /**
   * Авторизация по токену
   * @param [tk] {string} Токен
   * @returns {Promise<void>}
   */
  async loginWithToken(tk) {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    });

    const response = await fetch(`/api/v1/users/self?fields=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": tk,
      },
    });
    const json = await response.json();

    if (response.ok) {
      this.setState(
        {
          ...this.getState(),
          isAuth: true,
          user: json.result,
          waiting: false,
        },
        "Авторизация по токену выполнена"
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          isAuth: false,
          user: {},
          error: json.error.message,
          waiting: false,
        },
        "Ошибка авторизации по токену"
      );
    }
  }
}

export default UserState;
