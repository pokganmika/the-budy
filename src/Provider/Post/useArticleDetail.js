import { useState } from 'react';
import {
  getPostDetail,
  postVoteCount,
  deletePost,
  postScrap,
  deleteScrap
} from '../../API/Post';
import renderDate from '../../Common/Functions/renderDate';

function useArticleDetail() {
  const initialState = {
    isLoaded: false,
    articleId: null,
    coverImg: null,
    topics: [],
    budyId: '',
    title: '',
    userPhoto: '',
    userName: '',
    createdAt: '',
    body: '',
    viewCount: 0,
    voteType: null,
    voteCount: 0,
    commentsLength: 0,
    isScrap: false
  };

  const [state, setState] = useState(initialState);

  let isWaiting = false;

  const handlers = {
    articleVoteHandler: async (postId, voteType, action, postType) => {
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
    },
    getArticleDetail: async postId => {
      try {
        const data = await getPostDetail(postId, 'article');
        if (data.success) {
          const [post] = data.result.Posts;
          const topicList = data.result.Topics;
          console.log('article', data);
          const _voteType =
            post.VoteType === 1 ? 'up' : post.VoteType === 2 ? 'down' : null;
          setState({
            isLoaded: true,
            articleId: post.id || null,
            articleUserId: post.OwnerUserId,
            coverImg: post.CoverImageUrl || null,
            topics: topicList || [],
            budyId: post.BudyId || null,
            title: post.Title || '',
            userPhoto: post.profileUrl || '',
            userName: post.DisplayName || '',
            createdAt: renderDate(post.createdAt) || '',
            body: post.Body || '',
            viewCount: post.ViewCount || 0,
            voteType: _voteType || null,
            voteCount: post.UpvoteCount - post.DownvoteCount || 0,
            commentsLength: post.CommentCount || 0,
            isScrap:
              post.IsScrap === 0 ? false : post.IsScrap === 1 ? true : false
          });
          return true;
        }
        if (data.errors) {
          console.log('error', data);
          return false;
        }
      } catch (err) {
        console.log('request-error', err);
        return false;
      }
    },
    deleteArticle: async (articleId, history) => {
      console.log('deleteArticle');
      const data = await deletePost(articleId);
      if (data.success) {
        return history.push('/');
      }
    }
  };

  return [state, handlers];
}

export default useArticleDetail;
