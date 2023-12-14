import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserInfo(props) {
  const cn = bem("UserInfo");
  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{props.t("profile")}</h3>
      <div className={cn("info")}>
        <div className={cn("name")}>
        {props.t("name")}: <b>{props.name}</b>
        </div>
        <div className={cn("tel")}>
        {props.t("phone")}: <b>{props.phone}</b>
        </div>
        <div className={cn("email")}>
        {props.t("email")}: <b>{props.email}</b>
        </div>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func
};

UserInfo.defaultProps = {
  t: (text) => text
};

export default memo(UserInfo);
