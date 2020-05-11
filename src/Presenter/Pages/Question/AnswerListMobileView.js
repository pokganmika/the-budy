import React, { useContext } from 'react';
import styled from 'styled-components';
import { white, primary, greyscales } from '../../../Common/Styles/Colors';
import { PostListContext } from '../../../Provider/Post/postContext';

function AnswerListMobileView() {
  const [state, handlers] = useContext(PostListContext);
  const { answerList, selectedAnswerId } = state;
  const { selectAnswer } = handlers;

  if (answerList.length > 0) {
    return (
      <View>
        <div className="header">
          <span className="label">Answers</span>
          <span className="budy-list-bullet" />
        </div>
        <div className="answers">
          {answerList.map((answer, id) => {
            const answerState =
              answer.answerId === selectedAnswerId ? true : false;
            return (
              <Answer
                key={id}
                onClick={() => selectAnswer(answer.answerId)}
                answerState={answerState}
              >
                <img className="userPhoto" src={answer.userPhoto} alt="" />
                <div className="userName">{`${answer.userName.slice(
                  0,
                  7
                )} ...`}</div>
              </Answer>
            );
          })}
        </div>
      </View>
    );
  } else {
    return null;
  }
}

const View = styled.div`
  min-height: 56px;
  background-color: ${white};
  display: none;
  align-items: center;
  position: sticky;
  top: 56px;
  z-index: 5;
  border-bottom: solid 1px ${greyscales[200]};
  .header {
    display: flex;
    justify-content: space-between;
    min-height: 40px;
    align-items: center;
    margin-bottom: 16px;
    .label {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
      color: ${greyscales[900]};
    }
    .budy-list-bullet {
      font-size: 24px;
      color: ${greyscales[500]};
    }
  }
  .answers {
    display: flex;
    align-items: center;
    min-height: 126px;
    overflow-x: auto;
  }
  @media (max-width: 530px) {
    display: block;
  }
`;

const Answer = styled.div`
  min-width: 80px;
  min-height: 104px;
  margin-right: 8px;
  background-color: ${({ answerState }) =>
    answerState ? greyscales[100] : white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  .userPhoto {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 8px;
  }
  .userName {
    font-size: 12px;
    font-weight: 500;
    color: ${greyscales[900]};
    line-height: 2;
    width: 100%;
    text-align: center;
  }
`;

export default AnswerListMobileView;
