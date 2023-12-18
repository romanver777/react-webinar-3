import { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useAuth from "../../hooks/use-auth";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import HeadTop from "../../containers/head-top";
import UserInfo from "../../components/user-info";
import Spinner from "../../components/spinner";

function Profile() {
  const location = useLocation();

  const {error, waiting} = useAuth();

  const select = useSelector((state) => ({
    user: state.user.user,
  }));

  const { t } = useTranslate();

  if(waiting) return <div style={{"color": "#fff", "textAlign": "center"}}>Waiting...</div>;
  if(error) return <Navigate to="/login" state={{from: location}}/>;

  return (
    <PageLayout head={<HeadTop />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={waiting}>
        <UserInfo
          name={select.user?.profile?.name}
          phone={select.user?.profile?.phone}
          email={select.user?.email}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
