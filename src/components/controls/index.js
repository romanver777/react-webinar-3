import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import { plural, getTotalPrice } from "../../utils";
import Button from "../button";
import "./style.css";

function Controls(props) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине:{" "}
        <b>
          {!!props.cart.length
            ? `${props.cart.length} ${plural(props.cart.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${getTotalPrice(props.cart)} ₽`
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
  onToggleCart: PropTypes.func,
};

Controls.defaultProps = {
  onToggleCart: () => {},
};

export default React.memo(Controls);
