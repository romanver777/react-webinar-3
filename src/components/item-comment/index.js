import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import dateFormat from "../../utils/date-format";
import "./style.css";

function ItemComment(props) {
  const cn = bem("ItemComment");

  const callbacks = {
    openForm: useCallback(() => props.onOpenForm(props.id), []),
  };

  return (
    <div className={cn()}>
      <div className={cn("header")}>
        <div className={` ${cn("name", {colorLight: props.isAuth}) }`}>{props.name}</div>
        <div className={cn("date")}>{dateFormat(props.date)}</div>
      </div>
      <div className={cn("text")}>{props.text}</div>
      <div className={cn("cell")}>
        <button onClick={callbacks.openForm}>{props.t("comment.reply")}</button>
      </div>
    </div>
  );
}

ItemComment.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  onOpenForm: PropTypes.func,
  isAuth: PropTypes.bool,
  t: PropTypes.func,
};

ItemComment.defaultProps = {
  onOpenForm: () => {},
  t: (text) => text,
};

export default memo(ItemComment);
