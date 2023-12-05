import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function CartTotal(props) {
  const cn = bem("CartTotal");

  return (
    <div className={cn()}>
      <div className={cn("title")}>Итого</div>
      <div className={cn("price")}>
        {props.totalPrice.toLocaleString() + " ₽"}
      </div>
    </div>
  );
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number,
};

export default React.memo(CartTotal);
