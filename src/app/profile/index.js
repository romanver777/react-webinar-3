import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import HeadTop from "../../components/head-top";
import UserInfo from "../../components/user-info";
import Spinner from "../../components/spinner";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const tk = localStorage.getItem("tk");

  const select = useSelector((state) => ({
    error: state.user.tokenError,
    user: state.user.user,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    store.actions.user.checkToken();
  }, []);

  useEffect(() => {
    if (select.error || !tk) {
      store.actions.user.logout();
      navigate("/login");
    }
  }, [select.error, tk]);

  const { t } = useTranslate();

  return (
    <PageLayout head={<HeadTop />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <UserInfo
          name={select.user.profile?.name}
          phone={select.user.profile?.phone}
          email={select.user.email}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
