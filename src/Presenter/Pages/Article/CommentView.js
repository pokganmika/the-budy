import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { white, greyscales, primary } from '../../../Common/Styles/Colors';
import MoreBtn from '../../../Common/Collections/Buttons/MoreBtn';
import AppContext from '../../../App/context';
import CreateReplyView from './CreateReplyView';
import useReply from '../../../Provider/Comment/useReply';
import Loader from 'react-loader-spinner';
import EditCommentView from './EditCommentView';
import VoteCountController from '../../../Common/Collections/VoteCountController';
import AccountRequiredAlert from '../../../Common/AccountRequiredAlert';
import ReportPost from '../../../Common/ReportPost';

const viewTypes = {
  comment: 'comment',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

function CommentView({
  parentIndex,
  type,
  postId,
  comment,
  history,
  getComments,
  voteHandler,
  presentAccountRequirePopup,
}) {
  const ReplyView = CommentView;
  const commentId = comment.id || 0;
  const ownerUserId = comment.ownerUserId || 0;
  const budyId = comment.budyId || 0;
  const userPhoto = comment.userPhoto || '';
  const userName = comment.userName || '';
  const message = comment.message || '';
  const level = comment.level || 0;
  const deleted = comment.deletedAt || '';
  const replyList = comment.replyList || [];
  const voteCount = comment.voteCount;
  const voteType = comment.voteType;

  const deletedMessage = `${level === 1 ? 'Comment' : 'Reply'} deleted by user`;

  const textEditorRef = useRef(null);
  const clientHeight =
    textEditorRef.current && `${textEditorRef.current.clientHeight}px`;

  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;
  const userBudyId = appState.user.budyId;
  const userId = appState.user.uid;

  const [replyState, handlers] = useReply(commentId);
  const { loading, currentView, text } = replyState;
  const {
    changeView,
    changeText,
    cancelView,
    editView,
    createReply,
    updateReply,
    deleteReply
  } = handlers;

  const getBorderList = (level, type) => {
    const borderList = [];
    let Level = 0;
    if (type === 'create') Level = level + 1;
    if (type === 'comment') Level = level - 1;

    for (let i = Level; i > 0; i--) {
      borderList.unshift({
        level: i
      });
    }
    return borderList;
  };

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [report, setReport] = useState(false);
  const showReportModal = ()=> { setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  if (level <= 4) {
    return (
      <View name={`${type}-view-level-${level}`} level={level}>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={commentId} reportType="comment"></ReportPost>

        <Comment name={type} currentView={currentView} viewTypes={viewTypes}>
          {getBorderList(level, 'comment').map(({ level }, id) => (
            <BorderBox className={`border-level-${level}`} key={id}>
              <div className="border" />
            </BorderBox>
          ))}
          {deleted ? (
            <DeletedMessageBox>
              <BorderBox className={`border-level-${level}`}>
                <div className="border" />
              </BorderBox>
              <div className="deleted-message">
                <span className="message">{deletedMessage}</span>
                <span className="bullet">·</span>
                <span className="deletedAt">30 sec ago</span>
              </div>
            </DeletedMessageBox>
          ) : currentView === 'delete' ? (
            <DeletingBox clientHeight={clientHeight}>
              <BorderBox className={`border-level-${level}`}>
                <div className="border" />
              </BorderBox>
              <div className="loading">
                <div className="loading-box">
                  <Loader
                    className="loader"
                    type="Oval"
                    color={greyscales[400]}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </DeletingBox>
          ) : currentView === 'edit' ? (
            <EditBox>
              <BorderBox className={`border-level-${level}`}>
                <div className="border" />
              </BorderBox>
              <EditCommentView
                loading={loading}
                text={text}
                changeText={changeText}
                cancelView={cancelView}
                updateReply={() => updateReply(getComments)}
              />
            </EditBox>
          ) : (
            <TextBox name="textEditor" ref={textEditorRef}>
              <div className="left">
                {/* <VoteCountController
                  parentIndex={parentIndex}
                  commentId={commentId}
                  postType={type}
                  voteType={voteType}
                  voteCount={voteCount}
                  voteHandler={voteHandler}
                /> */}
                <BorderBox className={`border-level-${level} vote`}>
                  <div className="border" />
                </BorderBox>
              </div>
              <div className="right">
                <UserPhoto>
                  <img
                    className="image"
                    src={userPhoto}
                    onClick={() => {
                      if (budyId === userBudyId)
                        return history.push(`/mypage/profile`);
                      return history.push(`/userpage/${budyId}/profile`);
                    }}
                    alt=""
                  />
                  <span
                    className="username"
                    onClick={() => {
                      if (budyId === userBudyId)
                        return history.push(`/mypage/profile`);
                      return history.push(`/userpage/${budyId}/profile`);
                    }}
                  >
                    {userName}
                  </span>
                  <span className="bullet">·</span>
                  <span className="createAt">Sep 24</span>
                </UserPhoto>
                <Message>{message}</Message>
                <ActionsBar currentView={currentView} viewTypes={viewTypes}>
                  {level < 4 && (
                    <div
                      className="reply"
                      onClick={() => {
                        if (authentication) return changeView('create');
                        presentAccountRequirePopup();
                      }}
                    >
                      Reply
                    </div>
                  )}
                  {userId === ownerUserId ? (
                    <MoreBtn>
                      <span
                        onClick={() => {
                          if (authentication) return editView(message);
                          presentAccountRequirePopup();
                        }}
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => {
                          if (authentication) return deleteReply(getComments);
                          presentAccountRequirePopup();
                        }}
                      >
                        Delete comment
                      </span>
                    </MoreBtn>
                  ) : (
                    <MoreBtn>
                      {/* <span>Report</span> */}
                      {/* <span onClick={showReportModal}>Share</span> */}
                      <span onClick={ authentication ? showReportModal : showModal }>Report</span>
                    </MoreBtn>
                  )}
                </ActionsBar>
              </div>
            </TextBox>
          )}
        </Comment>

        {currentView === viewTypes.create && (
          <CreateReplyView
            postId={postId}
            loading={loading}
            CommentUserName={userName}
            textLength={text.length}
            changeText={changeText}
            cancelView={cancelView}
            createReply={createReply}
            borderList={getBorderList(level, 'create') || []}
            getComments={getComments}
          />
        )}

        {replyList.map((reply, id) => {
          return (
            <ReplyView
              key={id}
              parentIndex={parentIndex}
              type="reply"
              postId={postId}
              comment={reply}
              history={history}
              getComments={getComments}
              voteHandler={voteHandler}
            />
          );
        })}
      </View>
    );
  } else {
    return null;
  }
}

const View = styled.div`
  position: relative;
`;

const Comment = styled.div`
  display: flex;
  background-color: ${white};
  .border-level-1 {
    visibility: hidden;
  }
`;

const TextBox = styled.div`
  display: flex;
  width: 100%;
  .left {
    display: flex;
    flex-direction: column;
    padding-top: 12px;
    .vote {
      height: 100%;
      padding-top: 12px;
    }
  }
  .right {
    padding: 8px;
    width: 100%;
  }

  @media (max-width: 530px) {
    .left {
      display:none;
    }
  }
`;

const BorderBox = styled.div`
  min-width: 40px;
  display: flex;
  justify-content: center;
  .border {
    border: solid 1px ${greyscales[200]};
  }
`;

const UserPhoto = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
  .image {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border-radius: 50%;
    cursor: pointer;
  }
  .username {
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[900]};
    cursor: pointer;
    line-height: 1.4;
    :hover {
      text-decoration: underline;
    }
    @media (max-width: 530px) {
      :hover {
        text-decoration: none;
      }
    }
  }
  .bullet {
    font-size: 14px;
    line-height: 1.4;
    color: ${greyscales[500]};
    padding: 0px 4px;
  }
  .createAt {
    font-size: 12px;
    color: ${greyscales[500]};
    line-height: 1.4;
    font-weight: 500;
  }
`;

const Message = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${greyscales[700]};
  padding: 4px 8px;
`;

const ActionsBar = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  .reply {
    cursor: ${({ currentView, viewTypes }) =>
      currentView === viewTypes.create ? 'auto' : 'pointer'};
    font-size: 14px;
    font-weight: 500;
    color: ${({ currentView }) =>
      currentView === viewTypes.create ? primary[300] : primary[500]};
    padding: 8px;
    margin-right: 8px;
    line-height: 1;
  }
`;

const DeletedMessageBox = styled.div`
  display: flex;
  .deleted-message {
    display: flex;
    align-items: center;
    min-height: 40px;
    font-size: 12px;
    background-color: ${greyscales[100]};
    padding: 0px 8px;
    margin: 8px 0px;
    .message {
      color: ${greyscales[400]};
    }
    .bullet {
      color: ${greyscales[400]};
      margin: 0px 4px;
    }
    .deletedAt {
      color: ${greyscales[500]};
      font-weight: 500;
    }
  }
`;

const DeletingBox = styled.div`
  display: flex;
  width: 100%;
  .loading {
    padding: 8px 0px;
    width: 100%;
    .loading-box {
      background-color: ${greyscales[100]};
      width: 100%;
      height: ${({ clientHeight }) => clientHeight || '104px'};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
    }
  }
`;

const EditBox = styled.div`
  display: flex;
  width: 100%;
`;

export default CommentView;
