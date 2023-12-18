import { useEffect, useLayoutEffect } from "react";
import useStore from "./use-store";
import useSelector from "./use-selector";

/**
 * Хук для проверки авторизации
 */
export default function useAuth() {
  const store = useStore();

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    error: state.user.error,
    waiting: state.user.waiting,
  }));

  useLayoutEffect(() => {
    store.actions.user.checkAuth();
  }, [select.isAuth]);

  return { error: select.error, waiting: select.waiting };
}
