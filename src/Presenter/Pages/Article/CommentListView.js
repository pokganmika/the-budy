import React, { useEffect } from 'react';
import styled from 'styled-components';
import { greyscales } from '../../../Common/Styles/Colors';
import CommentView from './CommentView';

function CommentListView({
  className,
  postId,
  history,
  commentList,
  getComments,
  voteHandler,
  presentAccountRequirePopup,
}) {
  const _getComments = () => getComments(postId);

  useEffect(() => {
    _getComments();
  }, [postId]);

  return (
    <View className={className} name="commentList-view">
      {commentList.length > 0 ? (
        commentList.map((comment, id) => {
          return (
            <CommentView
              key={id}
              parentIndex={id}
              type="comment"
              postId={postId}
              comment={comment}
              history={history}
              getComments={_getComments}
              voteHandler={voteHandler}
              presentAccountRequirePopup={presentAccountRequirePopup}
            />
          );
        })
      ) : commentList.length === 0 ? (
        <NotComments>No comments yet</NotComments>
      ) : (
        <Loading>...Loading</Loading>
      )}
    </View>
  );
}

const View = styled.div`
  padding-left: 24px;
  @media (max-width: 530px) {
    padding: 0px;
  }
`;

const NotComments = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  font-size: 14px;
  color: ${greyscales[400]};
  margin-left: 56px;
  @media (max-width: 530px) {
    margin-left: 0px;
  }
`;

const Loading = styled.div`
  text-align: center;
  margin-left: 40px;
`;

export default CommentListView;
