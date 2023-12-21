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
import List from "../../components/list";
import CommentsTitle from "../../components/comments-title";
import CommentAdd from "../../components/comment-add";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import commentsActions from "../../store-redux/comments/actions";
import CommentBlock from "../../components/comment-block";

function Comments() {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  const { t } = useTranslate();

  const [openId, setOpenId] = useState("");

  const select = useSelectorR(
    (state) => ({
      items: state.comments.data.items || [],
      count: state.comments.data.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const selectStore = useSelector((state) => ({
    exists: state.session.exists,
    sessionName: state.session.user.profile?.name,
  }));

  const callbacks = {
    redirect: useCallback(() => navigate("/login", { state: { back: location.pathname } }), []),
    openForm: useCallback((id) => setOpenId(id), [openId]),

    closeForm: useCallback(() => setOpenId(""), [openId]),

    postComment: useCallback((e) => {
      e.preventDefault();
      if (e.target[0].value.trim()) {
        dispatch(commentsActions.postComment(e.target[0].value, params.id));
        dispatch(commentsActions.load(params.id));
      }
    }, []),

    postCommentAnswer: useCallback((e, id) => {
      e.preventDefault();
      if (e.target[0].value.trim()) {
        dispatch(commentsActions.postCommentAnswer(e.target[0].value, id));
        dispatch(commentsActions.load(params.id));
        setOpenId("");
      }
    }, []),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <CommentBlock
            item={item}
            level={item.level}
            openFormId={openId}
            sessionName={selectStore.sessionName}
            sessionExists={selectStore.exists}
            openForm={callbacks.openForm}
            closeForm={callbacks.closeForm}
            postCommentAnswer={callbacks.postCommentAnswer}
            t={t}
          />
        );
      },
      [openId, selectStore.sessionName, t]
    ),
  };

  const comments = {
    items: useMemo(() =>
        treeToList(listToTree(select.items), (item, level) => ({
          _id: item._id,
          item,
          level,
        })).slice(1), [select.items]),
  };

  return (
    <CommentsLayout>
      <Spinner active={select.waiting}>
        <CommentsTitle count={select.count} t={t}/>
        <List list={comments.items} renderItem={renders.item} />
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
