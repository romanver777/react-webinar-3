import { memo } from "react";
import { Link } from "react-router-dom";
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
            <Link to={`/?page=${number}`} key={number} className={cName}>
              {number}
            </Link>
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
};

export default memo(Pagination);
