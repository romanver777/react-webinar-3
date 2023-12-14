import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserTool({ name, onAction, t }) {
  const cn = bem("UserTool");

  return (
    <div className={cn()}>
      {name && (
        <Link to="/profile" className={cn("link")}>
          {name}
        </Link>
      )}
      <button onClick={onAction}>{name ? t("user.logout") : t("user.login")}</button>
    </div>
  );
}

UserTool.propTypes = {
  name: PropTypes.string,
  onAction: PropTypes.func.isRequired,
  t: PropTypes.func,
};

UserTool.defaultProps = {
  onAction: () => {},
  t: (text) => text,
};

export default memo(UserTool);
