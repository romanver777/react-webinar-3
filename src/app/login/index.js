import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import HeadTop from '../../components/head-top';
import LoginForm from '../../components/login-form';

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.error,
    waiting: state.user.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    onLogin: useCallback( (login, pass) => store.actions.user.login(login, pass), [store]),
  }

  return (
    <PageLayout head={<HeadTop/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm t={t} error={select.error} onLogin={callbacks.onLogin}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
