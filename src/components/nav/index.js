import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { translate } from "../../utils";
import "./style.css";

function Nav({ lang, name }) {
  const cn = bem("Nav");
  return (
    <div className={cn()}>
      <Link to="/" className={cn("link")}>
        {translate(name, lang)}
      </Link>
    </div>
  );
}

Nav.propTypes = {
  lang: PropTypes.string,
  name: PropTypes.string,
};

Nav.defaultProps = {};

export default memo(Nav);
