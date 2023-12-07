import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ArticleInfo from '../../components/article-info';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Article() {

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.actions.article.load(id);
  }, [id]);

  const select = useSelector(state => ({
    article: state.article.article,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  if(!select.article || select.article._id != id) return <div style={{"textAlign": "center", "color": "#fff"}}>Загружаем..</div>

  return (
    <PageLayout>
      <Head title={select.article.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ArticleInfo article={select.article} addToBasket={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(Article);
