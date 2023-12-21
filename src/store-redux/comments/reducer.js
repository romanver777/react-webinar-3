// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false };

    case "comment/post-start":
      return { ...state, waiting: true };

    case "comment/post-success":
      return { ...state, waiting: false };

    case "comment/post-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
