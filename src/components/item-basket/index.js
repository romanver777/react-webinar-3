import {memo, useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat, translate} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <Link 
        to={`/article/${props.item._id}`} 
        className={cn('link')}
        onClick={props.onClose}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} {translate("валюта", props.lang)}</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate("шт", props.lang)}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate("Удалить", props.lang)}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  lang: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  onClose: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {}
}

export default memo(ItemBasket);
