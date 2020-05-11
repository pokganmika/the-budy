import React, { useContext, useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import parser from 'html-react-parser';
import AppContext from '../../../App/context';
import { white, greyscales, primary } from '../../../Common/Styles/Colors';
import CreateCommentView from '../Article/CreateCommentView';
import { PostListContext } from '../../../Provider/Post/postContext';
import VoteCountController from '../../../Common/Collections/VoteCountController';
import CommentListView from '../Article/CommentListView';
import MoreBtn from '../../../Common/Collections/Buttons/MoreBtn';
import useCommentList from '../../../Provider/Comment/useCommentList';
import EditAnswerView from './EditAnswerView';
import ShareBtn from '../../../Common/Collections/Buttons/ShareBtn';
import copy from 'copy-to-clipboard';
import AccountRequiredAlert from '../../../Common/AccountRequiredAlert';
import DeleteConfirmationAlert from '../../../Common/DeleteConfirmationAlert';
import Container from "../../../Common/Collections/CustomQuill/Container";
import Quill from "quill";
import ReportPost from '../../../Common/ReportPost';

function AnswerDetailView({ history, answer, match }) {
  const [message, setMessage] = useState(false);
  const questionId = match.params.postId;

  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;
  const userBudyId = appState.user ? appState.user.budyId : 0;
  const userId = appState.user.uid;

  const [answerListState, answerListHandlers] = useContext(PostListContext);
  const { selectedAnswerId } = answerListState;
  const {
    answerVoteHandler,
    updateViewCount,
    deleteAnswer
  } = answerListHandlers;
  const selectedAnswer = answer;
  const answerId = selectedAnswer.answerId;
  const answerUserId = selectedAnswer.answerUserId;
  const budyId = selectedAnswer.budyId;
  const userPhoto = selectedAnswer.userPhoto;
  const userName = selectedAnswer.userName;
  const body = selectedAnswer.body;
  const viewCount = selectedAnswer.viewCount;
  const voteCount = selectedAnswer.voteCount;
  const voteType = selectedAnswer.voteType;
  const commentsLength = selectedAnswer.commentsLength;
  const createdAt = selectedAnswer.createdAt;

  const [commentListState, commentListHandlers] = useCommentList();
  const { commentList } = commentListState;
  const { getComments, commentVoteHandler } = commentListHandlers;

  const [isOpen, setOpen] = useState(false);

  const editOpen = () => setOpen(true);
  const editClose = () => setOpen(false);
  const clipboardHandler = () => {
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

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [ask, setAsk] = useState(false);
  const askToUser = ()=> { setAsk(true); }
  const dismissModal = ()=> { setAsk(false); }

  const [report, setReport] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  const showReportModal = (postId)=> { setSelectedPostId(postId);  setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  useEffect(() => {
    if (selectedAnswerId === answerId) {
      updateViewCount(selectedAnswerId);
    }
  }, [selectedAnswerId]);

  useEffect(() => {
    const quillContainerForView = document.querySelector('#quillContainerIdForView');
    if (quillContainerForView) {
      const quill = new Quill(quillContainerForView, {
        modules: {
          toolbar: null
        },
        theme: 'snow'
      });

      quill.disable();
    }
  });

  return (
    <View
      name="answerDetail-view"
      selectedAnswerId={selectedAnswerId}
      currentAnswerId={answerId}
    >
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <DeleteConfirmationAlert isShown={ask} dismissHandler={dismissModal} history={history} deleteHandler={()=> { deleteAnswer(answerId, questionId); dismissModal(); }} ></DeleteConfirmationAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={selectedPostId}></ReportPost>

      <Answer name="answer">
        <div className="answer-left">
          <VoteCountController
            postId={answerId}
            postType="post"
            voteType={voteType}
            voteCount={voteCount}
            voteHandler={answerVoteHandler}
          />
        </div>
        <div className="answer-right">
          <div className="title">Answer</div>
          {isOpen ? (
              <EditAnswerView
              answerId={answerId}
              initialBody={body}
              close={editClose}
            />
          ) : (
            <Fragment>
              <UserInfo>
                <img
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
                    className="username"
                    onClick={() => {
                      if (budyId === userBudyId)
                        return history.push(`/mypage/profile`);
                      return history.push(`/userpage/${budyId}/profile`);
                    }}
                  >
                    {userName}
                  </div>
                  <div className="post-createAt">{createdAt}</div>
                </div>
              </UserInfo>
              <Container id="quillContainerIdForView">{parser(body)}</Container>
            </Fragment>
          )}
          <ViewCount>{viewCount} View</ViewCount>
          <ActionsBar>
            <VoteCountController
              className="mobile-voteController"
              postId={answerId}
              postType="post"
              voteType={voteType}
              voteCount={voteCount}
              voteHandler={answerVoteHandler}
            />
            <div className="left-actions wrapper">
              <div className="commentCount-box">
                <span className="budy-message" />
                <div className="commentCount">
                  <span>{commentsLength} </span>
                  <span>Comment</span>
                </div>
              </div>
            </div>
            <div className="right-actions wrapper">
              <ShareBtn
                className="shareBtn"
                postType="question"
                postId={questionId}
              />
              {authentication && answerUserId === userId ? (
                <MoreBtn type="right">
                  <span onClick={editOpen}>Edit</span>
                  <span onClick={askToUser}>
                    Delete
                  </span>
                </MoreBtn>
              ) : authentication && answerUserId !== userId ? (
                <MoreBtn type="right">
                  <span onClick={ appState.user.authentication ? ()=>showReportModal(answerId) : showModal }>Report</span>
                </MoreBtn>
              ) : (
                <MoreBtn type="right">
                  <span onClick={ appState.user.authentication ? ()=>showReportModal(answerId) : showModal }>Report</span>
                </MoreBtn>
              )}
            </div>
          </ActionsBar>
        </div>
      </Answer>
      <CreateCommentView
        className="createComment"
        postUserName={userName}
        postId={answerId}
        getComments={getComments}
        presentAccountRequirePopup={showModal}
      />
      <CommentListView
        className="listView"
        postId={answerId}
        history={history}
        commentList={commentList}
        getComments={getComments}
        voteHandler={commentVoteHandler}
        presentAccountRequirePopup={showModal}
      />
      {message && (
        <Message>
          <span>Copyed to clipboard!</span>
        </Message>
      )}
    </View>
  );
}

const View = styled.div`
  display: ${({ selectedAnswerId, currentAnswerId }) =>
    selectedAnswerId === currentAnswerId ? 'block' : 'none'};
  margin-top: 40px;
  background-color: ${white};
  .createComment {
    margin: 16px 0px 16px 56px;
  }
  .shareBtn {
    margin-right: 8px;
  }
  .listView {
    padding-left: 16px;
  }
  .mobile-voteController {
    display: none;
  }
  @media (max-width: 530px) {
    .createComment {
      margin: 8px 0px;
    }
    .listView {
      padding-left: 0px;
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

const Answer = styled.div`
  display: flex;
  .answer-left {
    margin-right: 8px;
    position: sticky;
    top: 97px;
    height: 100%;
    padding-bottom: 40px;
  }
  .answer-right {
    width: 100%;
    padding-bottom: 16px;
    border-bottom: solid 1px ${greyscales[400]};
    .title {
      font-size: 18px;
      font-weight: 600;
      color: ${greyscales[900]};
      margin-bottom: 24px;
      line-height: 1.34;
    }
  }
  @media (max-width: 530px) {
    .answer-left {
      display: none;
    }
    .answer-right {
      .title {
        display: none;
      }
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
  .post-createAt {
    font-size: 12px;
    line-height: 1.2;
    color: ${greyscales[400]};
  }
`;

const Body = styled.div`
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 0px;
  }
  img {
    width: 100%;
    height: 400px;
  }
`;

const ViewCount = styled.div`
  font-size: 12px;
  color: ${greyscales[400]};
  margin-top: 16px;
  text-align: end;
  line-height: 1.2;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  color: ${greyscales[500]};
  margin-top: 8px;
  .wrapper {
    display: flex;
  }
  .commentCount-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .budy-message {
      font-size: 16px;
      color: ${greyscales[700]};
    }
    .commentCount {
      font-size: 14px;
      font-weight: 500;
      color: ${greyscales[700]};
      margin-left: 6px;
      line-height: 1.2;
      span {
        @media (max-width: 530px) {
          :last-child {
            display: none;
          }
        }
      }
    }
  }
  .count {
    font-size: 14px;
    margin: 0px 8px;
    color: ${greyscales[500]};
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
  z-index: 500;
`;

export default withRouter(AnswerDetailView);
