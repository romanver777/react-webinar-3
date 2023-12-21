import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ItemComment from "../../components/item-comment";
import CommentAdd from "../../components/comment-add";

function CommentBlock(props) {
  const cn = bem("CommentBlock");

  const callbacks = {
    openForm: useCallback((id) => props.openForm(id), []),
    postCommentAnswer: useCallback((e, id) => props.postCommentAnswer(e, id), []),
  };

  return (
    <div
      className={cn()}
      key={props.item._id}
      style={{ marginLeft: (props.level - 1) * 30 + "px" }}
    >
      <ItemComment
        id={props.item._id}
        name={props.item.item.author?.profile?.name}
        isAuth={props.item.item.author?.profile?.name === props.sessionName}
        date={props.item.item.dateCreate}
        text={props.item.item.text}
        onOpenForm={callbacks.openForm}
        t={props.t}
      />
      {props.openFormId === props.item._id && (
        <CommentAdd
          id={props.item._id}
          exists={props.sessionExists}
          isAnswer={true}
          onCloseForm={props.closeForm}
          onPostComment={callbacks.postCommentAnswer}
          t={props.t}
        />
      )}
    </div>
  );
}

CommentBlock.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  openFormId: PropTypes.string,
  sessionName: PropTypes.string,
  sessionExists: PropTypes.bool,
  openForm: PropTypes.func,
  closeForm: PropTypes.func,
  postCommentAnswer: PropTypes.func,
  t: PropTypes.func,
};
CommentBlock.defaultTypes = {
  openForm: () => {},
  closeForm: () => {},
  postCommentAnswer: () => {},
  t: (text) => text,
};

export default memo(CommentBlock);
