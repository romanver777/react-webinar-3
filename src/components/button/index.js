import React from "react";
import PropTypes from "prop-types";

function Button(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onAction();
    },
  };

  return <button onClick={callbacks.onClick}>{props.text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  onAction: PropTypes.func,
};

Button.defaultProps = {
  onAction: () => {},
};

export default React.memo(Button);
