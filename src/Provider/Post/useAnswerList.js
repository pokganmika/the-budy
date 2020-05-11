import { useState } from 'react';
import {
  getAnswerList,
  postReadAnswer,
  postVoteCount,
  deletePost,
  patchChangeAnswer
} from '../../API/Post';
import produce from 'immer';
import renderDate from '../../Common/Functions/renderDate';

function useAnswerList() {
  const initialState = {
    isLoaded: false,
    loading: false,
    answerList: [],
    answerListLength: 0,
    selectedAnswerId: null
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

  const mapAnswerList = answerList => {
    if (answerList.length === 0) return [];
    return answerList.map(answer => {
      const voteType =
        answer.VoteType === 1 ? 'up' : answer.VoteType === 2 ? 'down' : null;
      return {
        answerId: answer.id,
        answerUserId: answer.OwnerUserId,
        budyId: answer.BudyId,
        userPhoto: answer.profileUrl,
        userName: answer.DisplayName,
        body: answer.Body,
        viewCount: answer.ViewCount,
        voteCount: answer.UpvoteCount - answer.DownvoteCount,
        voteType,
        commentsLength: answer.CommentCount,
        createdAt: renderDate(answer.createdAt)
      };
    });
  };

  const handlers = {
    selectAnswer: answerId =>
      updateState({
        selectedAnswerId: answerId
      }),
    updateViewCount: async answerId => {
      try {
        const data = await postReadAnswer(answerId);
        if (data.success) {
          const viewCount = data.result.ViewCount;
          setState(prevState => {
            const answerList = prevState.answerList;
            const findIndex = answerList.findIndex(
              answer => answer.answerId === answerId
            );
            const nextAnswerList = produce(answerList, draftList => {
              draftList[findIndex].viewCount = viewCount;
            });
            return {
              ...prevState,
              answerList: nextAnswerList
            };
          });
        }
        if (data.errors) {
          console.log('error', data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    getAnswers: async (questionId, answerId) => {
      try {
        const data = await getAnswerList(questionId, 1, 100);
        if (data.success) {
          const answerList = data.result.Answers;
          const mapAnswers = mapAnswerList(answerList);
          const initialAnswerId =
            mapAnswers.length > 0 ? mapAnswers[0].answerId : null;
          console.log(mapAnswers);
          const newState = {
            isLoaded: true,
            answerList: mapAnswers,
            answerListLength: mapAnswers.length,
            selectedAnswerId: answerId || initialAnswerId
          };
          setState(newState);
          return true;
        }
        if (data.errors) {
          console.log('error', data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    editAnswer: async (answerId, body, bodyText) => {
      updateState({ loading: true });
      const result = await patchChangeAnswer(answerId, body, bodyText);
      if (result.success) {
        console.log(result.success);
        setState(prevState => {
          const answerList = prevState.answerList;
          const findIndex = answerList.findIndex(
            answer => answer.answerId === answerId
          );
          const nextAnswerList = produce(answerList, draftList => {
            draftList[findIndex].body = body;
          });
          return {
            ...prevState,
            answerList: nextAnswerList
          };
        });
        updateState({ loading: false });
        return true;
      }
    },
    deleteAnswer: async (answerId, questionId) => {
      const result = await deletePost(answerId);
      if (result.success) {
        const data = await getAnswerList(questionId, 1, 100);
        if (data.success) {
          const answerList = data.result.Answers;
          const mapAnswers = mapAnswerList(answerList);
          console.log(mapAnswers);
          return setState(prevState => {
            return {
              ...prevState,
              answerList: mapAnswers,
              answerListLength: mapAnswers.length,
              selectedAnswerId:
                mapAnswers.length !== 0
                  ? mapAnswers[mapAnswers.length - 1].answerId
                  : null
            };
          });
        }
      }
    },
    answerVoteHandler: async (answerId, voteType, action, postType) => {
      console.log(answerId, voteType, action, postType);
      if (isWaiting) {
        return;
      }

      isWaiting = true;

      const data = await postVoteCount(answerId, action, postType);
      console.log(data);

      isWaiting = false;

      if (data.success) {
        const upvoteCount = data.result.VotesCount.UpvoteCount;
        const downvoteCount = data.result.VotesCount.DownvoteCount;
        return setState(prevState => {
          const answerList = prevState.answerList;
          const findIndex = answerList.findIndex(
            answer => answer.answerId === answerId
          );
          const nextAnswerList = produce(answerList, draftList => {
            draftList[findIndex].voteType = voteType === action ? null : action;
            draftList[findIndex].voteCount = upvoteCount - downvoteCount;
          });
          return {
            ...prevState,
            answerList: nextAnswerList
          };
        });
      }
    }
  };

  return [state, handlers];
}

export default useAnswerList;
