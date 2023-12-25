import { memo, useMemo, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { useDispatch } from "react-redux";
import { useSelector as useSelectorR } from "react-redux";
import shallowEqual from "shallowequal";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import CommentsLayout from "../../components/comments-layout";
import ListComments from "../../components/list-comments";
import CommentsTitle from "../../components/comments-title";
import CommentAdd from "../../components/comment-add";
import listToTree from "../../utils/list-to-tree";
import commentsActions from "../../store-redux/comments/actions";

function Comments() {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { t } = useTranslate();

  const maxCommentsLevel = 15;
  const [openId, setOpenId] = useState("");

  const select = useSelectorR((state) => {
    return {
      items: state.comments.data.items || [],
      count: state.comments.data.count,
      waiting: state.comments.waiting,
    };
  }, shallowEqual);

  const selectStore = useSelector((state) => ({
    exists: state.session.exists,
    sessionName: state.session.user.profile?.name,
  }));

  const callbacks = {
    redirect: useCallback(
      () => navigate("/login", { state: { back: location.pathname } }), []),

    openForm: useCallback((id) => setOpenId(id), [openId]),

    closeForm: useCallback(() => setOpenId(""), [openId]),

    postComment: useCallback((e) => {
      e.preventDefault();
      if (e.target[0].value.trim()) {
        dispatch(commentsActions.postComment(e.target[0].value, params.id));
      }
    }, []),

    postCommentAnswer: useCallback((e, id) => {
      e.preventDefault();
      if (e.target[0].value.trim()) {
        dispatch(commentsActions.postCommentAnswer(e.target[0].value, id));
        setOpenId("");
      }
    }, []),
  };

  const comments = {
    tree: useMemo(() => listToTree(select.items), [select.items]),
  };

  return (
    <CommentsLayout>
      <Spinner active={select.waiting}>
        <CommentsTitle count={select.count} t={t} />
        <ListComments
          list={comments.tree[0]?.children || []}
          openFormId={openId}
          level={1}
          maxCommentsLevel={maxCommentsLevel}
          sessionName={selectStore.sessionName}
          sessionExists={selectStore.exists}
          openForm={callbacks.openForm}
          closeForm={callbacks.closeForm}
          postCommentAnswer={callbacks.postCommentAnswer}
          t={t}
        />
        {!openId ? (
          <CommentAdd
            exists={selectStore.exists}
            onPostComment={callbacks.postComment}
            t={t}
          />
        ) : (
          ""
        )}
      </Spinner>
    </CommentsLayout>
  );
}

export default memo(Comments);
