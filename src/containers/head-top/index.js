import { memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import UserTool from "../../components/user-tool";
import useTranslate from "../../hooks/use-translate";

function HeadTop() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    name: state.session.user?.profile?.name,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.session.logout();
      store.actions.user.resetUser();
    }, [store]),
  };

  const onAction = () => !select.name ? navigate("/login", {state: {from: location}}) : callbacks.onLogout();

  return (
    <SideLayout side="end" border="bottom">
      <UserTool
        name={select.name ? select.name : ""}
        t={t}
        onAction={onAction}
      />
    </SideLayout>
  );
}

export default memo(HeadTop);
