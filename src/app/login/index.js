import { memo, useCallback, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import HeadTop from "../../containers/head-top";
import LoginForm from "../../components/login-form";

function Login() {
  const store = useStore();
  const location = useLocation();

  const select = useSelector((state) => ({
    isAuth: state.session.isAuth,
    error: state.session.error,
    waiting: state.session.waiting,
  }));

  useEffect(
    () => () => {
      if (select.error) store.actions.session.clearError();
    },
    [select.error]
  );

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(
      (login, pass) => store.actions.session.login(login, pass),
      [store]
    ),
  };

  if(select.isAuth) return <Navigate to={location.state?.from?.pathname || "/profile"}/>;

  return (
    <PageLayout head={<HeadTop />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm t={t} error={select.error} onLogin={callbacks.onLogin} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
