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
  Article,
  Message,
  Icon,
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
const TopicArticles = ({ history, idToken, topicKeyword, refreshNav }) => {
  const [appState] = useContext(AppContext);
  const [message, setMessage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [changedTopic, setChangedTopic] = useState(false);
  const onChangeChangedTopicState = () => setChangedTopic(false);
  const { loading, error, dataList, hasMore, scrapArticle } = usePostList(
    topicKeyword,
    pageNumber,
    idToken,
    'article',
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

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [report, setReport] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  const showReportModal = (postId)=> { setSelectedPostId(postId);  setReport(true); }
  const hideReportModal = ()=> { setReport(false); }

  /**
   *
   * @param {string} id
   */
  const getDetailPage = id => {
    history.push(`/article/${id}`);
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
    setChangedTopic(true);
    setPageNumber(1);
    refreshNav();
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>
      <ReportPost isShown={report} dismissHandler={hideReportModal} history={history} reportedContentId={selectedPostId}></ReportPost>

      {dataList.length === 0 && !loading ? (
        <Message>No published articles yet.</Message>
      ) : (
        dataList.map((data, index) => {
          console.log('::TopicDetail TopicArticles data:: ---> : ', data);
          return (
            <Article
              ref={index === dataList.length - 1 ? lastDataElementRef : null}
              key={index}
            >
              <div className="content-type">ARTICLE BY</div>
              <div className="content-profile">
                <div className="content-profile-wrapper">
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

                <div>
                  <MoreButton type="right">
                    <span onClick={ appState.user.authentication ? ()=>showReportModal(data.id) : showModal }>Report</span>
                  </MoreButton>
                </div>
              </div>

              <div className="content-data-wrapper">
                {data.CoverImageUrl && (
                  <Image
                    src={data.CoverImageUrl}
                    width="100%"
                    margin="16px 0"
                    cursor="pointer"
                    onClick={()=>getDetailPage(data.id)}
                  />
                )}

                <div
                  className="content-title"
                  onClick={() => getDetailPage(data.id)}
                >
                  {data.Title}
                </div>

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
                <div
                  className="content-count-data-answer"
                  onClick={() => getDetailPage(data.id)}
                >
                  <div className="content-count-data-answer-count">
                    {data.CommentCount <= 0
                      ? `No comment yet`
                      : `${millify(data.CommentCount, {
                          precision: 1
                        })} Comments`}
                  </div>
                </div>

                <div className="content-count-data-icons">
                  <div className="content-count-data-icon">
                    {data.IsScrap === 0 ? (
                      <Icon
                        className="budy-archive"
                        size="24px"
                        color={greyscales[500]}
                        onClick={()=>{ appState.user.authentication ? scrapArticle(index) : showModal()}}
                      />
                    ) : (
                      <Icon
                        className="budy-archive-fill"
                        size="24px"
                        color={positiveBlues[500]}
                        onClick={()=>{ appState.user.authentication ? scrapArticle(index) : showModal()}}
                      />
                    )}
                  </div>
                  <div className="content-count-data-icon">
                    <ShareButton postType="article" postId={data.id} />
                  </div>
                </div>
              </div>
            </Article>
          );
        }) // end of map
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

      { (!loading && !hasMore) &&
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

TopicArticles.propTypes = {
  idToken: PropTypes.string,
  topicKeyword: PropTypes.string.isRequired,
  refreshNav: PropTypes.func.isRequired
};

export default withRouter(TopicArticles);

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;
