import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ListComments from "../list-comments";
import ItemComment from "../../components/item-comment";
import CommentAdd from "../../components/comment-add";

function CommentBlock(props) {
  const cn = bem("CommentBlock");
  const maxCommentsLevel = 20;

  const callbacks = {
    openForm: useCallback((id) => props.openForm(id), []),
    postCommentAnswer: useCallback(
      (e, id) => props.postCommentAnswer(e, id),
      []
    ),
  };

  return (
    <div
      key={item._id}
      className="List-item"
      style={{
        marginLeft:
          level > maxCommentsLevel
            ? maxCommentsLevel * 30 + "px"
            : (level - 1) * 30 + "px",
      }}
    >
      <ItemComment
        id={item._id}
        name={item.author?.profile?.name}
        isAuth={item.author?.profile?.name === sessionName}
        date={item.dateCreate}
        text={item.text}
        onOpenForm={callbacks.openForm}
        t={t}
      />
      <ListComments
        list={item.children}
        openFormId={openFormId}
        level={level + 1}
        sessionName={sessionName}
        sessionExists={sessionExists}
        openForm={callbacks.openForm}
        closeForm={closeForm}
        t={t}
      />
      {openFormId === item._id && (
        <CommentAdd
          id={item._id}
          exists={sessionExists}
          isAnswer={true}
          onCloseForm={closeForm}
          onPostComment={postCommentAnswer}
          t={t}
        />
      )}
    </div>  
    );
}

    //  <div
    //   className={cn()}
    //   key={props.item._id}
    //   style={{
    //     marginLeft:
    //       props.level > maxCommentsLevel
    //         ? maxCommentsLevel * 30 + "px"
    //         : (props.level - 1) * 30 + "px",
    //   }}
    // >
    //   <ItemComment
    //     id={props.item._id}
    //     name={props.item.item.author?.profile?.name}
    //     isAuth={props.item.item.author?.profile?.name === props.sessionName}
    //     date={props.item.item.dateCreate}
    //     text={props.item.item.text}
    //     onOpenForm={callbacks.openForm}
    //     t={props.t}
    //     />
    //   props.openFormId === props.item._id && !props.item.item.children.length && (
    //     <CommentAdd
    //       id={props.item._id}
    //       exists={props.sessionExists}
    //       isAnswer={true}
    //       onCloseForm={props.closeForm}
    //       onPostComment={callbacks.postCommentAnswer}
    //       t={props.t}
    //     />
    //   )
    // </div>


CommentBlock.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  openFormId: PropTypes.string,
  openItemLevel: PropTypes.string,
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
