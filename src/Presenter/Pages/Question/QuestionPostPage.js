import React, { useState, useContext, Fragment } from 'react';
import styled from 'styled-components';
import QuestionDetailView from './QuestionDetailView';
import AnswerDetailView from './AnswerDetailView';
import AnswerListView from './AnswerListView';
import AnswerListMobileView from './AnswerListMobileView';
import { PostListContext } from '../../../Provider/Post/postContext';
import { white, primary } from '../../../Common/Styles/Colors';
import GlobalFooter from '../../../Common/Collections/GlobalFooter';
import copy from 'copy-to-clipboard';

function QuestionPostPage() {
  const [message, setMessage] = useState(false);
  const [state] = useContext(PostListContext);
  const { answerList, selectedAnswerId } = state;

  let index = null;
  for (let i = 0; i < answerList.length; ++i) {
    if (answerList[i].answerId === selectedAnswerId) {
      index = i;
      break;
    }
  }

  const clipboardHandler = questionId => {
    if (questionId) {
      const result = copy(`https://www.thebudy.com/question/${questionId}`);
      if (result) {
        setMessage(true);
        setTimeout(() => setMessage(false), 1000);
        return true;
      }
    }
    return false;
  };

  return (
    <Fragment>
      <Page name="qustionPost-page">
        <Contents name="qustionPost-page-contents">
          <Left name="qustionPost-page-contents-left">
            <QuestionDetailView clipboardHandler={clipboardHandler} />
            <AnswerListMobileView />
            {(index !== null) && <AnswerDetailView answer={answerList[index]} key={index} />}
          </Left>
          <Right name="qustionPost-page-contents-right">
            <AnswerListView />
          </Right>
        </Contents>
      </Page>
      <GlobalFooter />
      {message && (
        <Message>
          <span>Copyed to clipboard!</span>
        </Message>
      )}
    </Fragment>
  );
}

const Page = styled.main`
  position: relative;
  background-color: ${white};
  min-height: calc(100vh - 56px - 320px);
`;

const Contents = styled.div`
  max-width: 1064px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 40px 16px 120px 16px;
  @media (max-width: 530px) {
    padding: 16px 16px 120px 16px;
  }
`;

const Left = styled.div`
  width: 680px;
  @media (max-width: 930px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 328px;
  position: sticky;
  top: 97px;
  height: 100%;
  @media (max-width: 930px) {
    display: none;
  }
`;

const Message = styled.div`
  background-color: ${primary[500]};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  position: fixed;
  bottom: 16px;
  right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-radius: 4px;
`;

export default QuestionPostPage;
