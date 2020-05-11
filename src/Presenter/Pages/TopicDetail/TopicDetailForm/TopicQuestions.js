import React, { useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import millify from 'millify';
import Loader from 'react-loader-spinner';
import copy from 'copy-to-clipboard';
import Image from '../../../../Common/Elements/Image';
import MoreButton from '../../../../Common/Collections/Buttons/MoreBtn';
import ShareButton from '../../../../Common/Collections/Buttons/ShareBtn';
import {
  primary,
  negativeReds,
  greyscales,
  positiveBlues
} from '../../../../Common/Styles/Colors';

import usePostList from './usePostList';
import {
  Wrapper,
  Content,
  Message,
  Icon,
  AnswerButton,
  CopyMessage
} from '../../MyPage/MyPageForm/Scroll/style';
import styled from 'styled-components';
import AccountRequiredAlert from '../../../../Common/AccountRequiredAlert';
import AppContext from '../../../../App/context';
import ReportPost from '../../../../Common/ReportPost'

/**
 *
 * @param {string} idToken
 * @param {string} topicKeyword
 * @param {function} refreshNav
 */
const TopicQuestions = ({ history, idToken, topicKeyword, refreshNav }) => {
  const [message, setMessage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [changedTopic, setChangedTopic] = useState(false);
  const onChangeChangedTopicState = () => setChangedTopic(false);
  const {
    loading,
    error,
    dataList,
    hasMore,
    voteQuestion,
    scrapQuestion
  } = usePostList(
    topicKeyword,
    pageNumber,
    idToken,
    'question',
    changedTopic,
    onChangeChangedTopicState
  );
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

  const [appState] = useContext(AppContext);
  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const getDetailPage = id => {
    history.push(`/question/${id}`);
  };

  const getUserPage = id => {
    history.push(`/userpage/${id}/profile`);
    // userId !== id && history.push(`/userpage/${id}/profile`);
  };

  const getTopicDetailList = topic => {
    history.push(`/topic/${topic}/articles`);
    setChangedTopic(true);
    setPageNumber(1);
    refreshNav();
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

  const [report, setReport] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  const showReportModal = (postId)=> { setSelectedPostId(postId);  setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  return (
    <Wrapper>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={selectedPostId}></ReportPost>

      {dataList.length === 0 && !loading ? (
        <Message>No asked questions yet.</Message>
      ) : (
        dataList.map((data, index) => {
          console.log('::QuestionsAnswered dataList data:: ---> : ', data);
          return (
            <Content
              ref={index === dataList.length - 1 ? lastDataElementRef : null}
              borderWidth = {index === dataList.length - 1 ? "0px" : "1px"}
              key={index}
            >
              <div className="content-profile">
                <div className="content-profile-outter-wrapper">
                  <Image
                    src={data.profileUrl}
                    type="profile"
                    width="32px"
                    height="32px"
                    onClick={() => getUserPage(data.BudyId)}
                  />
                  <div className="content-profile-inner-wrapper">
                    <div
                      className="content-display-name"
                      onClick={() => getUserPage(data.BudyId)}
                    >
                      {data.DisplayName}
                    </div>
                    <div className="content-created-at">
                      {moment(data.createdAt).fromNow()}
                    </div>
                  </div>
                </div>

                <div>
                  <MoreButton type="right">
                    <span onClick={ appState.user.authentication ? ()=>showReportModal(data.id) : showModal }>Report</span>
                    <span style={{cursor:"pointer"}} onClick={() => { appState.user.authentication ? getDetailPage(data.id) : showModal() }}>Add answer</span>
                  </MoreButton>
                </div>
              </div>

              <div className="content-data-wrapper">
                <div
                  className="content-title"
                  onClick={() => getDetailPage(data.id)}
                >
                  {`"${data.Title}"`}
                </div>

                {data.CoverImageUrl && (
                  <Image
                    src={data.CoverImageUrl}
                    width="100%"
                    margin="16px 0"
                    cursor="pointer"
                    onClick={()=>getDetailPage(data.id)}
                  />
                )}

                <div className="content-topics">
                  {data.TopicNames === null
                    ? null
                    : JSON.parse(data.TopicNames).map(
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
                    onClick={() => { appState.user.authentication ? getDetailPage(data.id) : showModal() }}
                  />
                  <div className="content-count-data-detail" style={{cursor:"pointer"}} onClick={()=>getDetailPage(data.id)}>
                    Answer • {millify(data.AnswerCount, { precision: 1 })}
                  </div>
                </AnswerButton>

                <div className="content-count-data-icons">
                  {/* {data.VoteType === null ? (
                    <div className="content-count-data-icon">
                      <Icon
                        className="budy-vote-up"
                        size="24px"
                        color={greyscales[500]}
                        onClick={() => voteQuestion(index, 'up')}
                      />
                    </div>
                  ) : data.VoteType === 1 ? (
                    <div className="content-count-data-icon-count">
                      <Icon
                        className="budy-vote-up-fill"
                        size="24px"
                        color={primary[500]}
                        onClick={() => voteQuestion(index, 'up')}
                      />
                      <div className="content-count-data-icon-vote">
                        {data.UpvoteCount - data.DownvoteCount}
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
                        {data.UpvoteCount - data.DownvoteCount}
                      </div>
                    </div>
                  )} */}

                  <div
                    className="content-count-data-icon"
                    style={{ marginLeft: '8px' }}
                  >
                    {data.IsScrap === 0 ? (
                      <Icon
                        className="budy-archive"
                        size="24px"
                        color={greyscales[500]}
                        onClick={()=>{ appState.user.authentication ? scrapQuestion(index) : showModal()}}
                      />
                    ) : (
                      <Icon
                        className="budy-archive-fill"
                        size="24px"
                        color={positiveBlues[500]}
                        onClick={()=>{ appState.user.authentication ? scrapQuestion(index) : showModal()}}
                      />
                    )}
                  </div>
                  <div
                    className="content-count-data-icon"
                    style={{ marginLeft: '8px' }}
                  >
                    <ShareButton postType="question" postId={data.id} />
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

      { (!loading && !hasMore && dataList.length !== 0) &&
        (<EndOfList>
          No more contents
        </EndOfList>)
      }


      {message && (
        <CopyMessage>
          <span>Copyed to clipboard!</span>
        </CopyMessage>
      )}
    </Wrapper>
  );
};

TopicQuestions.propTypes = {
  idToken: PropTypes.string,
  topicKeyword: PropTypes.string.isRequired,
  refreshNav: PropTypes.func.isRequired
};

export default withRouter(TopicQuestions);

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;
