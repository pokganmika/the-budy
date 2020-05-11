import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import parser from 'html-react-parser';
import AppContext from '../../../App/context';
import { PostContext } from '../../../Provider/Post/postContext';
import {
  white,
  greyscales,
  alphaValues,
  primary
} from '../../../Common/Styles/Colors';
import MoreBtn from '../../../Common/Collections/Buttons/MoreBtn';
import VoteCountController from '../../../Common/Collections/VoteCountController';
import CreateCommentView from './CreateCommentView';
import CommentListView from './CommentListView';
import useCommentList from '../../../Provider/Comment/useCommentList';
import Topic from '../../../Common/Elements/Tags/Topic';
import ScrapBtn from '../../../Common/Collections/Buttons/ScrapBtn';
import ShareBtn from '../../../Common/Collections/Buttons/ShareBtn';
import AccountRequiredAlert from '../../../Common/AccountRequiredAlert';
import DeleteConfirmationAlert from '../../../Common/DeleteConfirmationAlert';
import ReportPost from '../../../Common/ReportPost';

import Quill from 'quill';
import Container from '../../../Common/Collections/CustomQuill/Container';

function ArticleDetailView({ history, clipboardHandler }) {
  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;
  const userBudyId = appState.user.budyId || 0;
  const userId = appState.user.uid;

  const [articleState, articleHandlers] = useContext(PostContext);
  const articleId = articleState.articleId;
  const articleUserId = articleState.articleUserId;
  const budyId = articleState.budyId;
  const coverImg = articleState.coverImg;
  const topics = articleState.topics;
  const title = articleState.title;
  const userPhoto = articleState.userPhoto;
  const articleUserName = articleState.userName;
  const body = articleState.body;
  const viewCount = articleState.viewCount;
  const voteType = articleState.voteType;
  const voteCount = articleState.voteCount;
  const commentsLength = articleState.commentsLength;
  const createdAt = articleState.createdAt;
  const isScrap = articleState.isScrap;
  const { articleVoteHandler, deleteArticle, scrapHandler } = articleHandlers;

  const [commentListState, commentListHandlers] = useCommentList();
  const { commentList } = commentListState;
  const { getComments, commentVoteHandler } = commentListHandlers;

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [ask, setAsk] = useState(false);
  const askToUser = ()=> { setAsk(true); }
  const dismissModal = ()=> { setAsk(false); }

  const [report, setReport] = useState(false);
  const showReportModal = ()=> { setReport(true); }
  const hideReportModal = ()=> { setReport(false); }
  useEffect(() => {
    const quill = new Quill('#quillContainerId', {
      modules: {
        toolbar: null
      },
      theme: 'snow'
    });

    quill.disable();
  });

  return (
    <View name="articleDetail-view">
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <DeleteConfirmationAlert isShown={ask} dismissHandler={dismissModal} history={history} deleteHandler={()=> {deleteArticle(articleId, history); dismissModal(); }} ></DeleteConfirmationAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={articleId}></ReportPost>

      <HeadLine>
        {coverImg && <img className="coverImage" src={coverImg} />}
        {<div className="background" />}
        <div className="wrapper">
          <div className="content">
            <Title coverImg={coverImg}>{title}</Title>
            <UserInfo coverImg={coverImg}>
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
                  {articleUserName}
                </div>
                <div className="post-date_read-time">{createdAt}</div>
              </div>
            </UserInfo>
          </div>
        </div>
      </HeadLine>
      <Article>
        <div className="left">
          <VoteCountController
            postId={articleId}
            postType="post"
            voteType={voteType}
            voteCount={voteCount}
            voteHandler={articleVoteHandler}
          />
        </div>
        <div className="right">
          <Container id="quillContainerId">{parser(body)}</Container>
          <TopicList>
            {topics ? (
              topics.map((topic, id) => (
                <Topic key={id} topicName={topic.TopicName} type="link" />
              ))
            ) : (
              <Topic topicName="Topic not set." />
            )}
          </TopicList>
          <ViewCount>{viewCount} View</ViewCount>
          <ActionsBar>
            <VoteCountController
              className="mobile-voteController"
              postId={articleId}
              postType="post"
              voteType={voteType}
              voteCount={voteCount}
              voteHandler={articleVoteHandler}
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
              <ScrapBtn
                clickHandler={
                  authentication
                    ? () => scrapHandler(articleId, isScrap)
                    : showModal
                }

                isScrap={isScrap}
              />
              <ShareBtn
                className="shareBtn"
                postType="article"
                postId={articleId}
              />
              {authentication && articleUserId === userId ? (
                <MoreBtn type="right">
                  <span
                    onClick={() =>
                      history.push(`/write-article?id=${articleId}`)
                    }
                  >
                    Edit
                  </span>
                  <span onClick={askToUser}>
                    Delete
                  </span>
                </MoreBtn>
              ) : authentication && articleUserId !== userId ? (
                <MoreBtn type="right">
                  <span onClick={ authentication ? showReportModal : showModal }>Report</span>
                </MoreBtn>
              ) : (
                <>
                </>
              )}
            </div>
          </ActionsBar>
        </div>
      </Article>
      <Comment>
        <CreateCommentView
          className="createComment"
          postUserName={articleUserName}
          postId={articleId}
          getComments={getComments}
          presentAccountRequirePopup={showModal}
        />
        <CommentListView
          postId={articleId}
          history={history}
          commentList={commentList}
          getComments={getComments}
          voteHandler={commentVoteHandler}
          presentAccountRequirePopup={showModal}
        />
      </Comment>
    </View>
  );
}

const View = styled.div`
  .shareBtn {
    margin-right: 8px;
  }
  .createComment {
    margin: 16px 0px 16px 64px;
  }
  .mobile-voteController {
    display: none;
  }
  @media (max-width: 930px) {
    .createComment {
      margin: 24px 0px 8px;
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

const HeadLine = styled.div`
  position: relative;
  z-index: 1;
  height: 400px;
  border-bottom: solid 1px ${greyscales[200]};
  margin-bottom: 40px;
  .coverImage {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: ${alphaValues[300]};
    width: 100%;
    height: 100%;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    .content {
      width: 1032px;
      padding-left: 128px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
  @media (max-width: 930px) {
    .wrapper {
      .content {
        padding: 0px 16px;
      }
    }
  }
  @media (max-width: 530px) {
    height: 320px;
    margin-bottom: 24px;
    .wrapper {
      .content {
        padding: 0px 16px;
      }
    }
  }
`;

const Article = styled.div`
  display: flex;
  max-width: 1032px;
  margin: 0 auto;
  padding-left: 72px;
  padding-right: 128px;
  .left {
    margin-right: 8px;
    position: sticky;
    top: 97px;
    height: 100%;
    padding-bottom: 40px;
  }
  .right {
    width: 100%;
    padding-bottom: 16px;
    border-bottom: solid 1px ${greyscales[200]};
  }
  @media (max-width: 930px) {
    padding: 0px 16px;
    .left {
      display: none;
    }
    .right {
      padding: 0px;
      border-bottom: none;
    }
  }
`;

const Comment = styled.div`
  max-width: 1032px;
  margin: 0 auto;
  padding: 0px 128px 120px 64px;
  @media (max-width: 930px) {
    padding: 0px 16px 120px 16px;
  }
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 40px;
  margin-top: 16px;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 500;
  line-height: 1.17;
  // color: ${({ coverImg }) => (coverImg ? white : greyscales[900])};
  color: ${white};
  word-break: break-word;
  max-width: 776px;
  @media (max-width: 530px) {
    font-size: 28px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 40px;
  max-width: 776px;
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
    // color: ${({ coverImg }) => (coverImg ? white : greyscales[900])};
    color: ${white};
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
  .post-date_read-time {
    font-size: 14px;
    line-height: 1.2;
    color: ${greyscales[400]};
  }
  @media (max-width: 530px) {
    margin: 16px 0;
  }
`;

const ViewCount = styled.div`
  font-size: 14px;
  color: ${greyscales[400]};
  margin-top: 16px;
  margin-bottom: 8px;
  text-align: end;
  line-height: 1.2;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  color: ${greyscales[500]};
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
`;

export default withRouter(ArticleDetailView);
