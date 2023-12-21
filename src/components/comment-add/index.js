import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Field from "../../components/field";
import "./style.css";

function CommentAdd(props) {
  const cn = bem("CommentAdd");

  const callbacks = {
    postComment: useCallback((e) => props.onPostComment(e, props.id), []),
  };

  return (
    <div className={cn()}>
      {!props.exists ? (
        <div className={cn("redirectText")}>
          <Link
            className={cn("redirectLink")}
            to="/login"
            state={{ back: location.pathname }}
          >
            Войдите
          </Link>
          {!props.isAnswer ? (
            <span>, {props.t("comment.toComment")} </span>
          ) : (
            <>
              <span>, {props.t("comment.toReply")} </span>
              <button
                onClick={props.onCloseForm}
                className={cn({ btn: "cancel" })}
              >
                {props.t("comment.cancel")}
              </button>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={callbacks.postComment}>
          <Field
            label={`${
              props.isAnswer
                ? props.t("comment.newreply")
                : props.t("comment.new")
            }`}
          >
            <textarea
              className={cn("textarea")}
              placeholder={props.t("comment.text")}
            ></textarea>
          </Field>
          <div className={cn("cell")}>
            <button className={cn("btn")}>{props.t("comment.send")}</button>
            {props.isAnswer && (
              <button
                type="button"
                className={cn("btn")}
                onClick={props.onCloseForm}
              >
                {props.t("comment.cancel")}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

CommentAdd.propTypes = {
  id: PropTypes.string,
  exists: PropTypes.bool,
  isAnswer: PropTypes.bool,
  onCloseForm: PropTypes.func,
  onPostComment: PropTypes.func,
  t: PropTypes.func,
};
CommentAdd.defaultProps = {
  id: "",
  isAnswer: false,
  onCloseForm: () => {},
  onPostComment: () => {},
  t: (text) => text,
};
export default memo(CommentAdd);
