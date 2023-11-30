import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import { getTotalPrice } from "../../utils";
import PageLayout from "../page-layout";
import Head from "../head";
import List from "../list";
import Button from "../button";
import "./style.css";

function Cart(props) {
  const cn = bem("Cart");

  const callbacks = {
    onClick: () => {
      props.onToggleCart();
    },
  };

  return (
    <PageLayout page="Cart">
      <Head title="Корзина">
        <div className={cn("actions")}>
          <Button text="Закрыть" onAction={callbacks.onClick} />
        </div>
      </Head>
      <div className={cn("products")}>
        <List list={props.cart} onAction={props.onRemoveFromCart} />
        {!!props.cart.length && (
          <div className={cn("total")}>
            <div className={cn("totalTitle")}>Итого</div>
            <div className={cn("totalPrice")}>
              {getTotalPrice(props.cart)} ₽
            </div>
          </div>
        )}
      </div>
    </PageLayout>
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
  onToggleCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};
Cart.defaultProps = {
  onToggleCart: () => {},
  onRemoveFromCart: () => {},
};

export default React.memo(Cart);
