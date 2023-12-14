import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../side-layout";
import UserTool from "../user-tool";
import useTranslate from "../../hooks/use-translate";

function HeadTop() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    name: state.user.user?.profile?.name,
    tokenError: state.user.tokenError,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const onAction = () => !select.name ? navigate("/login") : callbacks.onLogout();

  return (
    <SideLayout side="end" border="bottom">
      <UserTool
        name={select.name ? select.name : ""}
        t={t}
        onAction={onAction}
        error={select.tokenError}
      />
    </SideLayout>
  );
}

export default memo(HeadTop);
