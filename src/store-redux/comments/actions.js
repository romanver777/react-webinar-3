export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  postComment: (value, articleId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comment/post-start" });

      const post = {
        text: value,
        parent: { _id: articleId, _type: "article" },
      };

      try {
        const res = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify(post),
        });

        dispatch({ type: "comment/post-success" });
      } catch (e) {
        dispatch({ type: "comment/post-error" });
      }
    };
  },
  
  postCommentAnswer: (value, parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comment/post-start" });

      const post = {
        text: value,
        parent: { _id: parentId, _type: "comment" },
      };

      try {
        const res = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify(post),
        });

        dispatch({ type: "comment/post-success" });
      } catch (e) {
        dispatch({ type: "comment/post-error" });
      }
    };
  },
};
