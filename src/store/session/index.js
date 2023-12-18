import StoreModule from "../module";

/**
 * Состояние User
 */
class SessionState extends StoreModule {
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
   * Сброс ошибки
   * @returns {<void>}
   */
  clearError() {
    this.setState({
      ...this.getState(),
      error: null,
    }, "Сброс ошибки");
  }

  /**
   * Проверка токена
   * @param [token] {string} token
   * @returns {<void>}
   */
  checkAuth() {
    if (localStorage.getItem("tk")) {
      this.loginWithToken(localStorage.getItem("tk"));
    }
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
          user: json.result,
          waiting: false,
        },
        "Авторизация по токену выполнена"
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          user: {},
          // error: json.error.message,
          waiting: false,
        },
        "Ошибка авторизации по токену"
      );
    }
  }

  /**
   * Авторизация по логину и паролю
   * @param [login] {string} Логин
   * @param [password] {string} Пароль
   * @returns {Promise<void>}
   */
  async login(login, password) {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    });

    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("tk", json.result.token);

      this.setState(
        {
          ...this.getState(),
          isAuth: true,
          user: json.result.user,
          error: null,
          waiting: false,
        },
        "Авторизация по логину и паролю выполнена"
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          isAuth: false,
          error: json.error.data.issues[0].message,
          waiting: false,
        },
        "Ошибка авторизации по логину и паролю"
      );
    }
  }

  /**
   * Отмена авторизации для удаления токена
   * @returns {<void>}
   */
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": localStorage.getItem("tk"),
      },
    });

    localStorage.removeItem("tk");

    this.setState({
      ...this.initState(),
    }, "logout");
  }
}

export default SessionState;
