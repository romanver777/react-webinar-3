import {memo, useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, translate} from "../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <Link 
        to={`${props.path}/${props.item._id}`} 
        className={cn('link')}
      >
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} {translate("валюта", props.lang)}</div>
        <button onClick={callbacks.onAdd}>{translate("Добавить", props.lang)}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  lang: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  path: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  path: "/article",
  onAdd: () => {},
}

export default memo(Item);
