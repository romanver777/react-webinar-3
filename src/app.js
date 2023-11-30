import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";

import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
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

  const callbacks = {
    onToggleCart: useCallback(() => {
      setShowModal(!showModal);
    }, [showModal]),

    onAddToCart: useCallback(
      (item) => {
        store.addToCart(item);
      }, [store]),

    onRemoveFromCart: useCallback(
      (item) => {
        store.removeFromCart(item);
      }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls cart={cart} onToggleCart={callbacks.onToggleCart} />
        <List list={list} onAction={callbacks.onAddToCart} />
      </PageLayout>
      {showModal &&
        createPortal(
          <Cart
            cart={cart}
            onToggleCart={callbacks.onToggleCart}
            onRemoveFromCart={callbacks.onRemoveFromCart}
          />,
          document.body
        )}
    </>
  );
}

export default App;
