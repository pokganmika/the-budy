import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  white,
  primary,
  alphaValues,
  greyscales
} from '../../../Common/Styles/Colors';
import { PostListContext } from '../../../Provider/Post/postContext';

function AnswerListView() {
  const [state, handlers] = useContext(PostListContext);
  const { answerList, selectedAnswerId } = state;
  const { selectAnswer } = handlers;

  return (
    <View>
      <Header answersState={answerList.length > 0}>
        <div className="answer-count">{answerList.length} ANSWERS</div>
        {answerList.length > 0 && <div className="view_all-btn">View all</div>}
      </Header>
      {answerList.length > 0 ? (
        answerList.map((answer, id) => {
          const answerState =
            answer.answerId === selectedAnswerId ? true : false;
          return (
            <Answer
              key={id}
              onClick={() => selectAnswer(answer.answerId)}
              answerState={answerState}
            >
              <div>
                <img className="userPhoto" src={answer.userPhoto} alt="" />
                <div className="userName">{answer.userName}</div>
              </div>
              <div className="voteCount">{answer.voteCount} upvotes</div>
            </Answer>
          );
        })
      ) : (
        <NotAnswer>No one answered yet</NotAnswer>
      )}
    </View>
  );
}

const View = styled.div`
  border: solid 1px ${alphaValues[100]};
  border-radius: 4px;
  background-color: ${white};
`;

const Header = styled.div`
  padding: 16px;
  font-size: 14px;
  line-height: 1;
  display: flex;
  justify-content: space-between;
  .answer-count {
    font-weight: 600;
    color: ${({ answersState }) =>
      answersState ? greyscales[900] : greyscales[500]};
  }
  .view_all-btn {
    font-weight: 500;
    color: ${primary[500]};
    cursor: pointer;
  }
`;

const NotAnswer = styled.div`
  height: 136px;
  font-size: 14px;
  color: ${greyscales[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;

const Answer = styled.div`
  cursor: ${({ answerState }) => (answerState ? 'not-allowed' : 'pointer')};
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 16px;
  background-color: ${({ answerState }) =>
    answerState ? primary[100] : white};
  border-left: solid 2px
    ${({ answerState }) => (answerState ? primary[500] : white)};
  .userPhoto {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .userName {
    display: inline-block;
    margin: 0px 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[900]};
  }
  .voteCount {
    font-size: 12px;
    font-weight: 500;
    color: ${greyscales[500]};
  }
  :hover {
    background-color: ${primary[100]};
    border-left: solid 2px ${primary[500]};
  }
`;

export default AnswerListView;
