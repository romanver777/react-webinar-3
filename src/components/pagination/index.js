import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function Pagination(props) {
  const cn = bem("Pagination");

  return (
    <div className={cn()}>
      <ul className={cn("list")}>
        {props.numbers.map((number, i) => {
          if (number === "...") {
            return (
              <li
                key={number + i}
                className={cn("dots")}
              >
                {number}
              </li>
            );
          }

          let cName =
            number === props.activePage
              ? "Pagination-item Pagination-item_active"
              : "Pagination-item";
          cName +=
            number.toString().length > 1 ? " Pagination-item_padding" : "";

          return (
            <li key={number} className={cName} onClick={() => props.onPageClick(number)}>
              {number}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number,
  totalPage: PropTypes.number,
  numbers: PropTypes.array,
  onPageClick: PropTypes.func,
};

Pagination.defaultProps = {
  onPageClick: () => {},
};

export default memo(Pagination);
