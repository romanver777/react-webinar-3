import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import ItemComment from "../item-comment";
import CommentAdd from "../comment-add";

function ListComments(props) {

  const callbacks = {
    openForm: useCallback((id) => props.openForm(id), []),
    postCommentAnswer: useCallback((e, id) => props.postCommentAnswer(e, id), []),
  };

  return (
    <div
      className="ListComments"
      style={{
        marginTop: props.level > 1 && "30px",
      }}
    >
      {props.list.map((item) => {
        return (
          <div
            key={item._id}
            className="List-item"
            style={{
              marginLeft:
                props.level == 1 || props.level > props.maxCommentsLevel
                  ? "0px"
                  : "30px",
            }}
          >
            <ItemComment
              id={item._id}
              name={item.author?.profile?.name}
              isAuth={item.author?.profile?.name === props.sessionName}
              date={item.dateCreate}
              text={item.text}
              onOpenForm={callbacks.openForm}
              t={props.t}
            />
            <ListComments
              list={item.children}
              openFormId={props.openFormId}
              level={props.level + 1}
              maxCommentsLevel={props.maxCommentsLevel}
              sessionName={props.sessionName}
              sessionExists={props.sessionExists}
              openForm={callbacks.openForm}
              closeForm={props.closeForm}
              postCommentAnswer={callbacks.postCommentAnswer}
              t={props.t}
            />
            {props.openFormId === item._id && (
              <CommentAdd
                id={item._id}
                level={props.level}
                maxCommentsLevel={props.maxCommentsLevel}
                exists={props.sessionExists}
                isAnswer={true}
                isOpen={!!props.openFormId}
                onCloseForm={props.closeForm}
                onPostComment={callbacks.postCommentAnswer}
                t={props.t}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

ListComments.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  openFormId: PropTypes.string,
  level: PropTypes.number,
  maxCommentsLevel: PropTypes.number,
  sessionName: PropTypes.string,
  sessionExists: PropTypes.bool,
  openForm: PropTypes.func,
  closeForm: PropTypes.func,
  postCommentAnswer: PropTypes.func,
  t: PropTypes.func,
};

ListComments.defaultProps = {
  openForm: () => {},
  closeForm: () => {},
  postCommentAnswer: () => {},
  t: (text) => text,
};

export default memo(ListComments);
