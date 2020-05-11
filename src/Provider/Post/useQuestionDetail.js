import { useState } from 'react';
import {
  getPostDetail,
  postVoteCount,
  deletePost,
  postScrap,
  deleteScrap
} from '../../API/Post';
import renderDate from '../../Common/Functions/renderDate';

function useQuestionDetail() {
  const initialState = {
    isLoaded: false,
    questionId: null,
    budyId: null,
    topics: [],
    title: '',
    userPhoto: '',
    userName: '',
    createdAt: '',
    coverImg: '',
    viewCount: 0,
    voteType: null,
    voteCount: 0,
    answerCount: 0,
    isScrap: false
  };

  const [state, setState] = useState(initialState);

  let isWaiting = false;

  const handlers = {
    questionVoteHandler: async (postId, voteType, action, postType) => {
      console.log(postId, voteType, action, postType);
      if (isWaiting) {
        return;
      }

      isWaiting = true;

      const data = await postVoteCount(postId, action, postType);
      console.log(data);

      isWaiting = false;

      if (data.success) {
        const upvoteCount = data.result.VotesCount.UpvoteCount;
        const downvoteCount = data.result.VotesCount.DownvoteCount;
        return setState(prevState => {
          return {
            ...prevState,
            voteType: voteType === action ? null : action,
            voteCount: upvoteCount - downvoteCount
          };
        });
      }
    },
    getQuestionDetail: async questionId => {
      try {
        const data = await getPostDetail(questionId, 'question');
        if (data.success) {
          const [post] = data.result.Posts;
          const voteType =
            post.VoteType === 1 ? 'up' : post.VoteType === 2 ? 'down' : null;
          const voteCount = post.UpvoteCount - post.DownvoteCount;
          console.log('question', post);
          setState({
            isLoaded: true,
            userId: post.OwnerUserId || null,
            questionId: post.id || null,
            budyId: post.BudyId || null,
            topics: post.TopicNames ? JSON.parse(post.TopicNames) : [],
            title: post.Title || '',
            userPhoto: post.profileUrl || '',
            userName: post.DisplayName || '',
            createdAt: renderDate(post.createdAt) || '',
            coverImg: post.CoverImageUrl || '',
            viewCount: post.ViewCount || 0,
            voteType,
            voteCount,
            answerCount: post.AnswerCount || 0,
            isScrap:
              post.IsScrap === 0 ? false : post.IsScrap === 1 ? true : false
          });
        }
        if (data.erros) {
          console.log();
        }
      } catch (err) {
        console.log(err);
      }
    },
    deleteQuestion: async (questionId, history) => {
      console.log('deleteQuestion');
      const data = await deletePost(questionId);
      if (data.success) {
        return history.push('/questions');
      }
    },
    scrapHandler: async (articleId, isScrap) => {
      console.log('scrapHandler', articleId, isScrap);
      let updateIsScrap = null;

      if (isScrap) {
        const payload = await deleteScrap(articleId);
        if (payload.success) {
          updateIsScrap = false;
        } else {
          return false;
        }
      } else {
        const payload = await postScrap(articleId);
        if (payload.success) {
          updateIsScrap = true;
        } else {
          return false;
        }
      }
      setState(prevState => {
        return {
          ...prevState,
          isScrap: updateIsScrap
        };
      });
      return true;
    }
  };

  return [state, handlers];
}

export default useQuestionDetail;
