import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import Item from "../item";
import CartItem from "../cart-item";
import "./style.css";

function List(props) {
  const cn = bem("List");

  if (!props.list.length)
    return <div className={cn("message")}>Товаров нет</div>;

  return (
    <div className={cn()}>
      {props.list.map((item) => (
        <div key={item.code} className={cn("item")}>
          {props.type == "main" && (
            <Item item={item} onAction={props.onAction} />
          )}
          {props.type == "cart" && (
            <CartItem item={item} onAction={props.onAction} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  type: PropTypes.string,
  onAction: PropTypes.func,
};

List.defaultProps = {
  type: "main",
  onAction: () => {},
};

export default React.memo(List);
