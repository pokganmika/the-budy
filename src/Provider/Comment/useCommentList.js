import { useState } from 'react';
import { getCommentList, postVoteCount } from '../../API/Post';
import produce from 'immer';

function useCommentList() {
  const initialState = {
    isLoaded: false,
    commentList: [],
    commentCount: 0
  };

  const [state, setState] = useState(initialState);

  let isWaiting = false;

  const updateState = newState => {
    return setState(prevState => {
      return {
        ...prevState,
        ...newState
      };
    });
  };

  const mapCommentList = commentList => {
    if (commentList.length === 0) return [];
    return commentList.map(comment => {
      const voteType =
        comment.VoteType === 1 ? 'up' : comment.VoteType === 2 ? 'down' : null;
      return {
        id: comment.id,
        ownerUserId: comment.OwnerUserId,
        budyId: comment.BudyId,
        userPhoto: comment.profileUrl,
        userName: comment.DisplayName,
        message: comment.Contents,
        level: Number(comment.level),
        deletedAt: comment.DeletedAt,
        replyList: mapReplyList(comment.subComment),
        voteCount: comment.UpvoteCount - comment.DownvoteCount,
        voteType
      };
    });
  };

  const mapReplyList = replyList => {
    if (replyList.length === 0) return [];
    return replyList.map(comment => {
      const voteType =
        comment.VoteType === 1 ? 'up' : comment.VoteType === 2 ? 'down' : null;
      return {
        parentId: comment.ParentId,
        id: comment.id,
        ownerUserId: comment.OwnerUserId,
        budyId: comment.BudyId,
        userPhoto: comment.profileUrl,
        userName: comment.DisplayName,
        message: comment.Contents,
        level: Number(comment.level),
        deletedAt: comment.DeletedAt,
        voteCount: comment.UpvoteCount - comment.DownvoteCount,
        voteType
      };
    });
  };

  const handlers = {
    getComments: async postId => {
      try {
        const data = await getCommentList(postId);
        if (data.success) {
          const commentList = data.result.Comments;
          const mapComments = mapCommentList(commentList);
          console.log(mapComments);
          const newState = {
            isLoaded: true,
            commentList: mapComments,
            commentCount: mapComments.length
          };
          setState(newState);
          return true;
        }
        if (data.errors) {
          console.log('error', data);
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    commentVoteHandler: async (
      commentId,
      voteType,
      action,
      postType,
      parentIndex
    ) => {
      console.log(commentId, voteType, action, postType, parentIndex);
      if (isWaiting) {
        return;
      }

      isWaiting = true;

      const data = await postVoteCount(commentId, action, postType);
      console.log(data);

      isWaiting = false;

      if (data.success) {
        const upvoteCount = data.result.VotesCount.UpvoteCount;
        const downvoteCount = data.result.VotesCount.DownvoteCount;
        return setState(prevState => {
          let prevCommentList = prevState.commentList;
          let nextCommentList = [];

          if (postType === 'comment') {
            nextCommentList = produce(prevCommentList, draftList => {
              draftList[parentIndex].voteType =
                voteType === action ? null : action;
              draftList[parentIndex].voteCount = upvoteCount - downvoteCount;
            });
          }

          if (postType === 'reply') {
            const replyList = prevCommentList[parentIndex].replyList;
            const replyIndex = replyList.findIndex(
              reply => reply.id === commentId
            );
            nextCommentList = produce(prevCommentList, draftList => {
              draftList[parentIndex].replyList[replyIndex].voteType =
                voteType === action ? null : action;
              draftList[parentIndex].replyList[replyIndex].voteCount =
                upvoteCount - downvoteCount;
            });
          }

          return {
            ...prevState,
            commentList: nextCommentList
          };
        });
      }
    }
  };

  return [state, handlers];
}

export default useCommentList;
