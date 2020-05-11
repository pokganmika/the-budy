import React, { useEffect } from 'react';
import {
  PostProvider,
  PostListProvider
} from '../../Provider/Post/postContext';
import useQuestionDetail from '../../Provider/Post/useQuestionDetail';
import useAnswerList from '../../Provider/Post/useAnswerList';
import QuestionPostPage from '../../Presenter/Pages/Question/QuestionPostPage';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {primary} from '../../Common/Styles/Colors';

function Question({ match }) {
  const questionId = match.params.postId;
  const questionDetailStore = useQuestionDetail();
  const [questionDetailState, questionDetailHandlers] = questionDetailStore;
  const { getQuestionDetail } = questionDetailHandlers;

  const answerListStore = useAnswerList();
  const [answerListState, answerListHandlers] = answerListStore;
  const { getAnswers } = answerListHandlers;

  useEffect(() => {
    getQuestionDetail(questionId);
    getAnswers(questionId);
  }, []);

  if (questionDetailState.isLoaded && answerListState.isLoaded) {
    return (
      <PostProvider store={questionDetailStore}>
        <PostListProvider store={answerListStore}>
          <QuestionPostPage />
        </PostListProvider>
      </PostProvider>
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader type="ThreeDots" color={primary[500]} height={40} width={40} />
      </LoaderWrapper>
    );
  }
}

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default Question;
