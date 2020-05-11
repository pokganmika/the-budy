import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { white, greyscales, primary } from '../../../Common/Styles/Colors';
import AppContext from '../../../App/context';
import MoreBtn from '../../../Common/Collections/Buttons/MoreBtn';
import renderDate from '../../../Common/Functions/renderDate';
import Topic from '../../../Common/Elements/Tags/Topic';
import ScrapBtn from '../../../Common/Collections/Buttons/ScrapBtn';
import ShareBtn from '../../../Common/Collections/Buttons/ShareBtn';
import copy from 'copy-to-clipboard';
import AccountRequiredAlert from '../../../Common/AccountRequiredAlert'
import ReportPost from '../../../Common/ReportPost'

function ArticlePost({ history, article, scrapHandler, index }) {
  const [message, setMessage] = useState(false);

  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;
  const userBudyId = appState.user.budyId || 0;
  const articleId = article ? article.id : 0;
  const coverImage = article ? article.CoverImageUrl : '';
  const topics = article ? JSON.parse(article.TopicNames) : [];
  const title = article ? article.Title : '';
  const userName = article ? article.DisplayName : '';
  const budyId = article ? article.BudyId : 0;
  const commentsLength = article ? article.CommentCount : 0;
  const createdAt = article ? renderDate(article.createdAt) : '';
  const isScrap = article && !!article.IsScrap;

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [report, setReport] = useState(false);
  const showReportModal = ()=> { setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  return (
    <View>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={articleId}></ReportPost>

      <MoreBtn className="more" type="right">
        <span onClick={ authentication ? showReportModal : showModal }>Report</span>
      </MoreBtn>
      <PostType>ARTICLE BY</PostType>
      <UserInfo>
        <div
          className="username"
          onClick={() => {
            if (budyId === userBudyId) return history.push(`/mypage/profile`);
            return history.push(`/userpage/${budyId}/profile`);
          }}
        >
          {userName}
        </div>
        <div className="date-created">{createdAt}</div>
      </UserInfo>
      {coverImage && <CoverImage alt="" style={{cursor:"pointer"}} src={coverImage} onClick={() => history.push(`/article/${articleId}`)}/>}
      <Title>
        <span onClick={() => history.push(`/article/${articleId}`)}>
          {title}
        </span>
      </Title>
      <TopicList>
        {topics ? (
          topics.map((topicName, id) => (
            <Topic key={id} topicName={topicName} type="link" />
          ))
        ) : (
          <Topic topicName="Topic not set." />
        )}
      </TopicList>
      <ActionsBar>
        <div className="commentsLength" style={{cursor:"pointer"}} onClick={() => history.push(`/article/${articleId}`)}>{commentsLength} Comments</div>
        <div className="actions">
          <ScrapBtn
            clickHandler={
              authentication
                ? () => scrapHandler(articleId, isScrap, index)
                : showModal
            }
            isScrap={isScrap}
          />
          <ShareBtn postType="article" postId={articleId} />
        </div>
      </ActionsBar>
      {message && (
        <Message>
          <span>Copyed to clipboard!</span>
        </Message>
      )}
    </View>
  );
}

const View = styled.div`
  position: relative;
  /* z-index: 8; */
  box-shadow: 0 4px 40px 0 rgba(0, 40, 45, 0.08);
  background-color: ${white};
  margin-bottom: 40px;
  border-radius: 4px;
  padding: 16px 16px 8px 16px;
  .more {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  @media (max-width: 530px) {
    box-shadow: none;
    margin-bottom: 40px;
  }
`;

const PostType = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  color: ${greyscales[500]};
  display: inline-block;
  margin-bottom: 8px;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  margin-bottom: 16px;
  @media (max-width: 530px) {
    height: 120px;
  }
`;

const UserInfo = styled.div`
  .username {
    font-size: 14px;
    font-weight: 600;
    color: ${greyscales[900]};
    line-height: 1.2;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  .date-created {
    font-size: 12px;
    color: ${greyscales[500]};
    line-height: 1.4;
  }
  margin-bottom: 16px;
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  word-break: keep-all;
  word-wrap: break-word;
  span {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 530px) {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.09;
    :hover {
      text-decoration: none;
    }
  }
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .commentsLength {
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[900]};
    line-height: 1.2;
  }
  .actions {
    display: flex;
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

export default withRouter(ArticlePost);
