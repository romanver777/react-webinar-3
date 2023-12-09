import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural, translate } from "../../utils";
import "./style.css";

function BasketTool({ lang, sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Link to="/" className={cn("homeLink")}>
        {translate("Главная", lang)}
      </Link>
      <div className={cn("info")}>
        <span className={cn("label")}>{translate("В корзине", lang)}:</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: translate("товар one", lang),
                few: translate("товар few", lang),
                many: translate("товар many", lang),
              })} / ${numberFormat(sum)} ${translate("валюта", lang)}`
            : `${translate("пусто", lang)}`}
        </span>
        <button onClick={onOpen}>{translate("Перейти", lang)}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  lang: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
