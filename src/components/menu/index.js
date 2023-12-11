import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Menu({ lang, children }) {
  const cn = bem("Menu");
  return (
    <div className={cn()}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { lang })
      )}
    </div>
  );
}

Menu.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Menu);
