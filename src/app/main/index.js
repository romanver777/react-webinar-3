import { memo, useCallback, useEffect } from "react";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Lang from "../../components/lang";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { getPaginationNumbers, translate } from "../../utils";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, [store.state.catalog.page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.page,
    totalPage: state.catalog.totalPage,
    language: state.language.name,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Добавление текущего номера страницы
    addPage: useCallback((page) => store.actions.catalog.addPage(page), [store]),
    // Установка языка
    setLanguage: useCallback((name) => store.actions.language.setLanguage(name), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item lang={select.language} item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket, select.language]
    ),
  };

  if(!select.totalPage) return <div style={{"textAlign": "center", "color": "#fff"}}>{translate("Загружаем", select.language)}..</div>

  return (
    <PageLayout lang={select.language}>
      <Head title={translate("Магазин", select.language)}>
        <Lang active={select.language} onSetLanguage={callbacks.setLanguage}/>
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />
        <Pagination
          activePage={select.currentPage}
          totalPage={select.totalPage}
          numbers={getPaginationNumbers(select.currentPage, select.totalPage)}
          onPageClick={callbacks.addPage}
        />
    </PageLayout>
  );
}

export default memo(Main);
