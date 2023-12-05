import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import Button from "../button";
import "./style.css";

function CartItem(props) {
  const cn = bem("Item");

  const callbacks = {
    onClick: () => {
      props.onAction(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{props.item.price.toLocaleString()} ₽</div>
      <div className={cn("quantity")}>{props.item.quantity} шт.</div>
      <div className={cn("actions")}>
        <Button
          text="Удалить"
          onAction={callbacks.onClick}
        />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
};

CartItem.defaultProps = {
  onAction: () => {},
};

export default React.memo(CartItem);
