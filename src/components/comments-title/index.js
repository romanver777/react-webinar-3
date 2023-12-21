import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsTitle(props) {
  const cn = bem("CommentsTitle");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{props.t("comments")} ({props.count})</h2>
    </div>
  );
}

CommentsTitle.propType = {
  count: PropTypes.number,
  t: PropTypes.func,
};
CommentsTitle.defaultProps = {
  t: (text) => text,
}

export default memo(CommentsTitle);
