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

function QuestionPost({ history, question, scrapHandler, index }) {
  const [message, setMessage] = useState(false);

  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;
  const userBudyId = appState.user.budyId || 0;
  const questionId = question ? question.id : 0;
  const budyId = question ? question.BudyId : '';
  const topics = question ? JSON.parse(question.TopicNames) : [];
  const title = question ? question.Title : '';
  const userPhoto = question ? question.profileUrl : '';
  const userName = question ? question.DisplayName : '';
  const coverImage = question ? question.CoverImageUrl : '';
  const createdAt = question ? renderDate(question.createdAt) : '';
  const answerCount = question ? question.AnswerCount : 0;
  const isScrap = question && !!question.IsScrap;

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [report, setReport] = useState(false);
  const showReportModal = ()=> { setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  return (
    <View>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={questionId}></ReportPost>

      <MoreBtn className="more" type="right">
        <span onClick={ authentication ? showReportModal : showModal }>Report</span>
      </MoreBtn>
      <UserInfo name="userInfo">
        <img
          name="userInfo-img"
          className="image"
          src={userPhoto}
          alt=""
          onClick={() => {
            if (budyId === userBudyId) return history.push(`/mypage/profile`);
            return history.push(`/userpage/${budyId}/profile`);
          }}
        />
        <div>
          <div
            name="userInfo-userName"
            className="username"
            onClick={() => {
              if (budyId === userBudyId) return history.push(`/mypage/profile`);
              return history.push(`/userpage/${budyId}/profile`);
            }}
          >
            {userName}
          </div>
          <div name="userInfo-createAt" className="createAt">
            {createdAt}
          </div>
        </div>
      </UserInfo>
      <Title>
        <span
          onClick={() => history.push(`/question/${questionId}`)}
        >{`“${title}”`}</span>
      </Title>
      {coverImage && <CoverImage alt="" src={coverImage} style={{ cursor: "pointer" }} onClick={() => history.push(`/question/${questionId}`)} />}
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
        <AnswersLength>
          <span className="budy-edit" style={{ cursor: "pointer" }} onClick={() => { authentication ? history.push(`/question/${questionId}`) : showModal() }}/>
          <span className="label" style={{ cursor: "pointer" }} onClick={() => history.push(`/question/${questionId}`)}>Answer · {answerCount}</span>
        </AnswersLength>
        <div className="actions">
          <ScrapBtn
            clickHandler={
              authentication
                ? () => scrapHandler(questionId, isScrap, index)
                : showModal
            }
            isScrap={isScrap}
          />
          <ShareBtn postType="question" postId={questionId} />
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
  background-color: ${white};
  margin-bottom: 16px;
  padding: 16px 16px 8px 16px;
  border: solid 1px ${greyscales[200]};
  border-radius: 4px;
  .more {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  @media (max-width: 530px) {
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    border-radius: 0px;
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
  .createAt {
    font-size: 12px;
    line-height: 1.35;
    color: ${greyscales[400]};
  }
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.33;
  margin: 16px 0px;
  word-break: keep-all;
  word-wrap: break-word;
  span {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 16px;
  border-radius: 4px;
  @media (max-width: 530px) {
    height: 129px;
  }
`;

const AnswersLength = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .budy-edit {
    font-size: 16px;
    color: ${primary[500]};
    margin-right: 4px;
  }
  .label {
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[900]};
  }
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default withRouter(QuestionPost);
