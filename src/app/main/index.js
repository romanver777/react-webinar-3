import { memo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Lang from "../../components/lang";
import Nav from "../../components/nav";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { getPaginationNumbers, translate } from "../../utils";

function Main() {
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading,
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
    // Установка языка
    setLanguage: useCallback((name) => store.actions.language.setLanguage(name), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item lang={select.language} item={item} onAdd={callbacks.addToBasket} path="/article" />;
      },
      [callbacks.addToBasket, select.language]
    ),
  };

  if(select.isLoading || !select.totalPage) return <div style={{"textAlign": "center", "color": "#fff"}}>{translate("Загружаем", select.language)}..</div>


  return (
    <PageLayout lang={select.language}>
      <Head title={translate("Магазин", select.language)}>
        <Lang active={select.language} onSetLanguage={callbacks.setLanguage}/>
      </Head>
      <Menu>
        <Nav name="Главная" />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Menu>
      <List list={select.list} renderItem={renders.item} />
        <Pagination
          activePage={select.currentPage}
          totalPage={select.totalPage}
          numbers={getPaginationNumbers(select.currentPage, select.totalPage)}
        />
    </PageLayout>
  );
}

export default memo(Main);
