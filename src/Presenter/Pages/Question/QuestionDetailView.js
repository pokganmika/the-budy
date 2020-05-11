import React, {useState, useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../../../App/context';
import {
  PostContext,
  PostListContext
} from '../../../Provider/Post/postContext';
import { white, sub, greyscales, primary } from '../../../Common/Styles/Colors';
import Icon from '../../../Common/Elements/Icon';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import { SecondaryBtn } from '../../../Common/Elements/Buttons/BorderButton';
import MoreBtn from '../../../Common/Collections/Buttons/MoreBtn';
import VoteCountController from '../../../Common/Collections/VoteCountController';
import CreateAnswerView from './CreateAnswerView';
import Topic from '../../../Common/Elements/Tags/Topic';
import ScrapBtn from '../../../Common/Collections/Buttons/ScrapBtn';
import ShareBtn from '../../../Common/Collections/Buttons/ShareBtn';
import AccountRequiredAlert from '../../../Common/AccountRequiredAlert'
import ReportPost from '../../../Common/ReportPost';

function QuestionDetailView({ history, clipboardHandler }) {
  const [isOpen, setOpen] = useState(false);

  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;
  const userBudyId = appState.user.budyId || 0;
  const userId = appState.user.uid;

  const [questionState, questionHandlers] = useContext(PostContext);
  const questionUserId = questionState.userId;
  const questionId = questionState.questionId;
  const budyId = questionState.budyId;
  const topics = questionState.topics;
  const title = questionState.title;
  const userName = questionState.userName;
  const userPhoto = questionState.userPhoto;
  const createdAt = questionState.createdAt;
  const coverImg = questionState.coverImg;
  const viewCount = questionState.viewCount;
  const voteType = questionState.voteType;
  const voteCount = questionState.voteCount;
  const isScrap = questionState.isScrap;
  const {
    questionVoteHandler,
    scrapHandler
  } = questionHandlers;

  const [answerListState] = useContext(PostListContext);
  const answerListLength = answerListState.answerListLength;
  const selectedAnswerId = answerListState.selectedAnswerId;

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [report, setReport] = useState(false);
  const showReportModal = ()=> { setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  return (
    <View name="questionDetail-view">
    <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
    <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={questionId}></ReportPost>

      <Question name="questionDetail-view-question">
        <div name="questionDetail-view-question-left" className="left">
          <VoteCountController
            postId={questionId}
            postType="post"
            voteType={voteType}
            voteCount={voteCount}
            voteHandler={questionVoteHandler}
          />
        </div>
        <div name="questionDetail-view-question-right" className="right">
          <Title name="title">{`“${title}”`}</Title>
          <UserInfo name="userInfo">
            <img
              name="userInfo-img"
              className="image"
              src={userPhoto}
              alt=""
              onClick={() => {
                if (budyId === userBudyId)
                  return history.push(`/mypage/profile`);
                return history.push(`/userpage/${budyId}/profile`);
              }}
            />
            <div>
              <div
                name="userInfo-userName"
                className="username"
                onClick={() => {
                  if (budyId === userBudyId)
                    return history.push(`/mypage/profile`);
                  return history.push(`/userpage/${budyId}/profile`);
                }}
              >
                {userName}
              </div>
              <div name="userInfo-createAt" className="createdAt">
                {createdAt}
              </div>
            </div>
          </UserInfo>
          {coverImg && (
            <CoverImg name="coverImg">
              <img name="coverImg-img" src={coverImg} alt="" />
            </CoverImg>
          )}
          <TopicList name="topicTagList">
            {topics.length > 0 ? (
              topics.map((topicName, id) => (
                <Topic key={id} topicName={topicName} type="link" />
              ))
            ) : (
              <Topic topicName="Topic not set." />
            )}
          </TopicList>
          <ViewCount name="viewCount">{viewCount} View</ViewCount>
          <ActionsBar name="actionsBar">
            <div name="actionsBar-left" className="wrapper">
              {questionUserId !== userId ? (
                <PrimaryBtn
                  className="addAnswerBtn"
                  width="96px"
                  size="small"
                  text="Answer"
                  Icon={<Icon name="edit" size="16px" color={white} />}
                  state={isOpen ? 'disabled' : 'hovered'}
                  onClick={ authentication ? () => (isOpen ? null : setOpen(true)) : showModal}
                />
              ) : null}
              <VoteCountController
                className="mobile-voteController"
                postId={questionId}
                postType="post"
                voteType={voteType}
                voteCount={voteCount}
                voteHandler={questionVoteHandler}
              />
            </div>
            <div name="actionsBar-right" className="wrapper">
              <ScrapBtn
                clickHandler={
                  authentication
                    ? () => scrapHandler(questionId, isScrap)
                    : showModal
                }
                isScrap={isScrap}
              />
              <ShareBtn
                className="shareBtn"
                postType="question"
                postId={questionId}
              />

              {authentication && questionUserId === userId ? (
                <MoreBtn type="right">
                  <span onClick={() => (isOpen ? null : setOpen(true))}>
                    Write answer
                  </span>
                </MoreBtn>
              ) : authentication && questionUserId !== userId ? (
                <MoreBtn type="right">
                  <span onClick={() => (isOpen ? null : setOpen(true))}>
                    Write answer
                  </span>
                  <span onClick={ authentication ? showReportModal : showModal }>Report</span>
                </MoreBtn>
              ) : (
                <>
                </>
              )}
            </div>
          </ActionsBar>
        </div>
      </Question>

      {isOpen && <CreateAnswerView questionId={questionId} setOpen={setOpen} />}

      {answerListLength === 0 && !selectedAnswerId && (
        <NotAnswer name="questionDetail-view-notAnswer">
          <div className="message-1">No answer yet</div>
          <div className="message-2">
            Be the first one who share
            <br /> the brilliant answer with!
          </div>
        </NotAnswer>
      )}
    </View>
  );
}

const View = styled.div`
  background-color: ${white};
  .shareBtn {
    margin-right: 8px;
  }
  .mobile-voteController {
    display: none;
  }
  .mobile-addAnswerBtn {
    display: none;
    height: 40px;
    width: 100%;
    margin: 16px 0px;
  }
  @media (max-width: 530px) {
    .mobile-addAnswerBtn {
      display: flex;
    }
    .addAnswerBtn {
      display: none;
    }
    .mobile-voteController {
      display: flex;
      flex-direction: row;
      width: 120px;
      height: 24px;
      .voteCount {
        line-height: 1.2;
        width: 56px;
      }
    }
  }
`;

const Question = styled.div`
  display: flex;
  .left {
    margin-right: 8px;
    position: sticky;
    top: 97px;
    height: 100%;
    padding-bottom: 40px;
  }
  .right {
    max-width: 624px;
    width: 100%;
    border-bottom: solid 1px ${greyscales[400]};
  }
  @media (max-width: 930px) {
    .right {
      max-width: none;
    }
  }
  @media (max-width: 530px) {
    .right {
      border-bottom: none;
    }
    .left {
      display: none;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  .image {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 50%;
  }
  .username {
    font-size: 14px;
    font-weight: 600;
    color: ${greyscales[900]};
    cursor: pointer;
    line-height: 1.2;
    :hover {
      text-decoration: underline;
    }
    @media (max-width: 530px) {
      :hover {
        text-decoration: none;
      }
    }
  }
  .createdAt {
    font-size: 12px;
    line-height: 1.35;
    color: ${greyscales[400]};
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  color: ${greyscales[900]};
  margin-bottom: 16px;
  word-break: keep-all;
  word-wrap: break-word;
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 24px;
  margin: 16px 0px;
`;

const ViewCount = styled.div`
  font-size: 12px;
  color: ${greyscales[400]};
  text-align: end;
  line-height: 1.4;
  @media (max-width: 530px) {
    margin-bottom: 8px;
  }
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  margin: 8px 0px;
  color: ${greyscales[500]};
  .wrapper {
    display: flex;
    align-items: center;
    .arrow-background {
      width: 32px;
      height: 32px;
      background-color: ${sub[100]};
      border-radius: 16px;
      padding: 6px;
      cursor: pointer;
    }
    .count {
      font-size: 14px;
      margin: 0px 8px;
      color: ${greyscales[500]};
    }
    .icon {
      margin: 0px 28px;
    }
  }
  @media (max-width: 530px) {
    margin: 0px;
  }
`;

const CoverImg = styled.div`
  padding: 16px;
  margin-top: 16px;
  img {
    width: 100%;
  }
`;

const NotAnswer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 144px;
  margin-left: 56px;
  .message-1 {
    font-size: 16px;
    font-weight: 500;
    color: ${greyscales[900]};
    margin-bottom: 8px;
  }
  .message-2 {
    font-size: 14px;
    color: ${greyscales[500]};
    line-height: 1.2;
    text-align: center;
  }
  @media (max-width: 530px) {
    margin-left: 0px;
  }
`;

export default withRouter(QuestionDetailView);
