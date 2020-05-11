import React, { useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import millify from 'millify';
import Loader from 'react-loader-spinner';
import copy from 'copy-to-clipboard';
import Image from '../../../../Common/Elements/Image';
import MoreButton from '../../../../Common/Collections/Buttons/MoreBtn';
import ShareButton from '../../../../Common/Collections/Buttons/ShareBtn';
import {
  primary,
  greyscales,
  positiveBlues,
  negativeReds
} from '../../../../Common/Styles/Colors';

import SideTopicsList from './SideTopicsList';
import SideUsersList from './SideUsersList';
import usePostList from './usePostList';
import {
  Content,
  Message,
  Icon,
  AnswerButton,
  CopyMessage
} from '../../MyPage/MyPageForm/Scroll/style';

import AccountRequiredAlert from '../../../../Common/AccountRequiredAlert';
import AppContext from '../../../../App/context';
import ReportPost from '../../../../Common/ReportPost'

const Wrapper = styled.div`
  display: flex;
`;

const MainWrapper = styled.div`
  width: 632px;
  .content-status {
    display: flex;
    justify-content: center;
  }
`;

const SideWrapper = styled.div`
  width: 328px;
  margin-left: 24px;

  @media (max-width: 530px) {
    display: none;
  }
`;

/**
 *
 * @param {string} idToken
 * @param {string} keyword
 * @param {array} topicsData
 * @param {array} usersData
 */
function SearchQuestions({ history, idToken, keyword, topicsData, usersData }) {

  const [appState] = useContext(AppContext);
  const [show, setShow] = useState(false);
  const showModal = () => { setShow(true); }
  const hideModal = () => { setShow(false); }

  const [report, setReport] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  const showReportModal = (postId)=> { setSelectedPostId(postId);  setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  const [message, setMessage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    loading,
    error,
    questionList,
    hasMore,
    scrapQuestion,
    voteQuestion
  } = usePostList(keyword, pageNumber, idToken, 'question');
  const observer = useRef();
  const lastDataElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  /**
   *
   * @param {string} id
   */
  const getDetailPage = id => {
    history.push(`/question/${id}`);
    window.scrollTo(0, 0);
  };
  /**
   *
   * @param {string} id
   */
  const getUserPage = id => {
    history.push(`/userpage/${id}/profile`);
    window.scrollTo(0, 0);
  };
  /**
   *
   * @param {string} topic
   */
  const getTopicDetailList = topic => {
    history.push(`/topic/${topic}/articles`);
    window.scrollTo(0, 0);
  };

  const clipboardHandler = id => {
    if (id) {
      const result = copy(`https://www.thebudy.com/question/${id}`);
      if (result) {
        setMessage(true);
        setTimeout(() => setMessage(false), 1000);
        return true;
      }
    }
    return false;
  };

  return (
    <Wrapper>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={selectedPostId}></ReportPost>
      <MainWrapper>
        {questionList.length === 0 && !loading ? (
          <Message>NO QUESTIONS</Message>
        ) : (
            questionList.map((question, index) => {
              console.log('::SearchQuestions question::', question);
              return (
                <Content
                  ref={
                    index === questionList.length - 1 ? lastDataElementRef : null
                  }
                  key={index}
                  borderWidth = {index === questionList.length - 1 ? "0px" : "1px"}
                >
                  <div className="content-profile">
                    <div className="content-profile-outter-wrapper">
                      <Image
                        src={question.profileUrl}
                        type="profile"
                        width="32px"
                        height="32px"
                        onClick={() => getUserPage(question.BudyId)}
                      />
                      <div className="content-profile-inner-wrapper">
                        <div
                          className="content-display-name"
                          onClick={() => getUserPage(question.BudyId)}
                        >
                          {question.DisplayName}
                        </div>
                        <div className="content-created-at">
                          {moment(question.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <MoreButton type="right">
                        <span onClick={ appState.user.authentication ? ()=>showReportModal(question.id) : showModal }>Report</span>
                        <span style={{ cursor: "pointer" }} onClick={() => { appState.user.authentication ? getDetailPage(question.id) : showModal() }}>Add answer</span>
                      </MoreButton>
                    </div>
                  </div>

                  <div className="content-data-wrapper">
                    <div
                      className="content-title"
                      onClick={() => getDetailPage(question.id)}
                    >
                      {`"${question.Title}"`}
                    </div>

                    {question.CoverImageUrl && (
                      <Image
                        src={question.CoverImageUrl}
                        width="100%"
                        margin="16px 0"
                        onClick={()=> getDetailPage(question.id)}
                        cursor="pointer"
                      />
                    )}

                    <div className="content-topics">
                      {question.TopicNames === null
                        ? null
                        : JSON.parse(question.TopicNames).map(
                          (topic, i) =>
                            topic !== null && (
                              <div
                                className="content-topic"
                                key={i}
                                onClick={() => getTopicDetailList(topic)}
                              >
                                {topic}
                              </div>
                            )
                        )}
                    </div>
                  </div>

                  <div className="content-count-data-wrapper">
                    <AnswerButton>
                      <Icon
                        className="budy-edit"
                        size="16px"
                        color={primary[500]}
                        style={{ cursor: "pointer" }} onClick={() => { appState.user.authentication ? getDetailPage(question.id) : showModal() }}
                      />
                      <div className="content-count-data-detail" style={{cursor:"pointer"}} onClick={() => getDetailPage(question.id)}>
                        Answer • {millify(question.AnswerCount, { precision: 1 })}
                      </div>
                    </AnswerButton>

                    <div className="content-count-data-icons">
                      {/* {question.VoteType === null ? (
                        <div className="content-count-data-icon">
                          <Icon
                            className="budy-vote-up"
                            size="24px"
                            color={greyscales[500]}
                            onClick={() => voteQuestion(index, 'up')}
                          />
                        </div>
                      ) : question.VoteType === 1 ? (
                        <div className="content-count-data-icon-count">
                          <Icon
                            className="budy-vote-up-fill"
                            size="24px"
                            color={primary[500]}
                            onClick={() => voteQuestion(index, 'up')}
                          />
                          <div className="content-count-data-icon-vote">
                            {question.UpvoteCount - question.DownvoteCount}
                          </div>
                        </div>
                      ) : (
                            <div className="content-count-data-icon-count">
                              <Icon
                                className="budy-vote-down-fill"
                                size="24px"
                                color={negativeReds[500]}
                                onClick={() => voteQuestion(index, 'down')}
                              />
                              <div className="content-count-data-icon-vote">
                                {question.UpvoteCount - question.DownvoteCount}
                              </div>
                            </div>
                          )} */}

                      <div
                        className="content-count-data-icon"
                        style={{ marginLeft: '8px' }}
                      >
                        {question.IsScrap === 0 ? (
                          <Icon
                            className="budy-archive"
                            size="24px"
                            color={greyscales[500]}
                            onClick={() => { appState.user.authentication ? scrapQuestion(index) : showModal() }}
                          />
                        ) : (
                            <Icon
                              className="budy-archive-fill"
                              size="24px"
                              color={positiveBlues[500]}
                              onClick={() => { appState.user.authentication ? scrapQuestion(index) : showModal() }}
                            />
                          )}
                      </div>
                      <div
                        className="content-count-data-icon"
                        style={{ marginLeft: '8px' }}
                      >
                        <ShareButton postType="question" postId={question.id} />
                      </div>
                    </div>
                  </div>
                </Content>
              );
            })
          )}
        {error ? (
          <div className="content-status">
            <Loader
              type="ThreeDots"
              color={negativeReds[500]}
              height={40}
              width={40}
            />
          </div>
        ) : (
            loading && (
              <div className="content-status">
                <Loader
                  type="ThreeDots"
                  color={primary[500]}
                  height={40}
                  width={40}
                />
              </div>
            )
          )}

        {message && (
          <CopyMessage>
            <span>Copyed to clipboard!</span>
          </CopyMessage>
        )}

        {(!loading && !hasMore && questionList.length !== 0) &&
          (<EndOfList>
            No more contents
          </EndOfList>)
        }
      </MainWrapper>

      <SideWrapper>
        <SideTopicsList keyword={keyword} topicsData={topicsData} />
        <SideUsersList keyword={keyword} usersData={usersData} />
      </SideWrapper>
    </Wrapper>
  );
}

SearchQuestions.propTypes = {
  idToken: PropTypes.string,
  keyword: PropTypes.string.isRequired,
  topicsData: PropTypes.array.isRequired,
  usersData: PropTypes.array.isRequired
};

export default withRouter(SearchQuestions);

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;