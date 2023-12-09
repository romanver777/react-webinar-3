import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { translate } from "../../utils";
import "./style.css";


function ArticleInfo(props) {
  const cn = bem("ArticleInfo");

  return (
    <div className={cn()}>
      <div className={cn("description")}>{props.article.description}</div>
      <div className={cn("country")}>{translate("Страна производитель", props.lang)}: <b>{props.article.madeIn.title} ({props.article.madeIn.code})</b></div>
      <div className={cn("category")}>{translate("Категория", props.lang)}: <b>{props.article.category.title}</b></div>
      <div className={cn("year")}>{translate("Год выпуска", props.lang)}: <b>{props.article.edition}</b></div>
      <div className={cn("price")}>{translate("Цена", props.lang)}: {props.article.price} {translate("валюта",props.lang)}</div>
      <button className={cn("btn")} onClick={() => props.addToBasket(props.article._id)}>
        {translate("Добавить", props.lang)}
      </button>
    </div>
  );
}

ArticleInfo.propTypes = {
  lang: PropTypes.string,
  article: PropTypes.object,
  addToBasket: PropTypes.func,
};

ArticleInfo.defaultProps = {
  addToBasket: () => {},
};

export default memo(ArticleInfo);
