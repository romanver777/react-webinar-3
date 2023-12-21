import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsLayout({ children }) {
  const cn = bem("CommentsLayout");
  return (
    <div className={cn()}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn("item")}>
          {child}
        </div>
      ))}
    </div>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
};

CommentsLayout.defaultProps = {};

export default memo(CommentsLayout);
