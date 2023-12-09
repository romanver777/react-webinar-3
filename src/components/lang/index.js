import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Lang(props) {
  const cn = bem("Lang");

  return (
    <div className={cn()}>
      <span
        className={cn("item", { active: props.active === "Ru" })}
        onClick={() => props.onSetLanguage("Ru")}
      >
        Ru
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span
        className={cn("item", { active: props.active === "En" })}
        onClick={() => props.onSetLanguage("En")}
      >
        En
      </span>
    </div>
  );
}

Lang.propTypes = {
  active: PropTypes.string,
  onSetLanguage: PropTypes.func,
};

Lang.defaultProps = {
  onSetLanguage: () => {},
};

export default memo(Lang);
