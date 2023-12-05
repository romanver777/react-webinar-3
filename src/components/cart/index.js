import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import Head from "../head";
import List from "../list";
import Button from "../button";
import CartTotal from "../cart-total";
import "./style.css";

function Cart(props) {
  const cn = bem("Cart");

  const callbacks = {
    onClick: () => {
      props.onToggleCart();
    },
  };

  return (
    <div className={cn()}>
      <Head title="Корзина">
        <div className={cn("actions")}>
          <Button text="Закрыть" onAction={callbacks.onClick} />
        </div>
      </Head>
      <div className={cn("products")}>
        <List type="cart" list={props.cart} onAction={props.onRemoveFromCart} />
        {!!props.cartLength && <CartTotal totalPrice={props.totalPrice} />}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  cartLength: PropTypes.number,
  totalPrice: PropTypes.number,
  onToggleCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};
Cart.defaultProps = {
  onToggleCart: () => {},
  onRemoveFromCart: () => {},
};

export default React.memo(Cart);
