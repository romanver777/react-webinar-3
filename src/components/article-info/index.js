import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function ArticleInfo(props) {
  const cn = bem("ArticleInfo");

  return (
    <div className={cn()}>
      <div className={cn("description")}>{props.article.description}</div>
      <div className={cn("country")}>Страна производитель: <b>{props.article.madeIn.title} ({props.article.madeIn.code})</b></div>
      <div className={cn("category")}>Категория: <b>{props.article.category.title}</b></div>
      <div className={cn("year")}>Год выпуска: <b>{props.article.edition}</b></div>
      <div className={cn("price")}>Цена: {props.article.price} ₽</div>
      <button className={cn("btn")} onClick={() => props.addToBasket(props.article._id)}>
        Добавить
      </button>
    </div>
  );
}

ArticleInfo.propTypes = {
  article: PropTypes.object,
  addToBasket: PropTypes.func,
};

ArticleInfo.defaultProps = {
  addToBasket: () => {},
};

export default memo(ArticleInfo);
