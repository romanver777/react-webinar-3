import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";

import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [showModal, setShowModal] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartLength = store.getState().cartLength;
  const totalPrice = store.getState().totalPrice;

  const callbacks = {
    onToggleCart: useCallback(() => {
      setShowModal(!showModal);
    }, [showModal]),

    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),

    onRemoveFromCart: useCallback(
      (code) => {
        store.removeFromCart(code);
      },
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          cartLength={cartLength}
          totalPrice={totalPrice}
          onToggleCart={callbacks.onToggleCart}
        />
        <List list={list} onAction={callbacks.onAddToCart} />
      </PageLayout>
      {showModal &&
        createPortal(
          <ModalLayout>
            <Cart
              cart={cart}
              cartLength={cartLength}
              totalPrice={totalPrice}
              onToggleCart={callbacks.onToggleCart}
              onRemoveFromCart={callbacks.onRemoveFromCart}
            />
          </ModalLayout>,
          document.body
        )}
    </>
  );
}

export default App;
