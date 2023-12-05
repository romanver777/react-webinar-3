import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import { plural } from "../../utils";
import Button from "../button";
import "./style.css";

function Controls(props) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине:{" "}
        <b>
          {!!props.cartLength
            ? `${props.cartLength} ${plural(props.cartLength, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${props.totalPrice.toLocaleString() + ' ₽'}`
            : "пусто"}
        </b>
      </div>
      <div className={cn("actions")}>
        <Button text="Перейти" onAction={props.onToggleCart} />
      </div>
    </div>
  );
}

Controls.propTypes = {
  cartLength: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onToggleCart: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onToggleCart: () => {},
};

export default React.memo(Controls);
