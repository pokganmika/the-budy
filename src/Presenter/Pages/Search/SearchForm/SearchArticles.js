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
  Article,
  Message,
  Icon,
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

  @media (max-width: 530px) {
    width: 100%;
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
 * @param {boolean} keywordChanged
 * @param {function} onChangeKeywordChanged
 */
function SearchArticles({
  history,
  idToken,
  keyword,
  topicsData,
  usersData,
  keywordChanged,
  onChangeKeywordChanged
}) {

  const [appState] = useContext(AppContext);
  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  const [message, setMessage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageNumberReset = () => setPageNumber(1);
  const { loading, error, articleList, hasMore, scrapArticle } = usePostList(
    keyword,
    pageNumber,
    idToken,
    'article',
    keywordChanged,
    onChangeKeywordChanged,
    pageNumberReset
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
    window.scrollTo(0, 0);
  };

  const clipboardHandler = id => {
    if (id) {
      const result = copy(`https://www.thebudy.com/article/${id}`);
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
      <MainWrapper>
        {articleList.length === 0 && !loading ? (
          <Message>NO ARTICLES</Message>
        ) : (
            articleList.map((article, index) => {
              // console.log('::SearchArticles articlsList:: ---> : ', article);
              return (
                <Article
                  ref={
                    index === articleList.length - 1 ? lastDataElementRef : null
                  }
                  key={index}
                >
                  <div className="content-type">ARTICLE BY</div>
                  <div className="content-profile">
                    <div className="content-profile-wrapper">
                      <div
                        className="content-display-name"
                        onClick={() => getUserPage(article.BudyId)}
                      >
                        {article.DisplayName}
                      </div>
                      <div className="content-created-at">
                        {moment(article.createdAt).fromNow()}
                      </div>
                    </div>

                    <div>
                      <MoreButton type="right">
                        <span onClick={ appState.user.authentication ? ()=>showReportModal(article.id) : showModal }>Report</span>
                      </MoreButton>
                    </div>
                  </div>

                  <div className="content-data-wrapper">
                    {article.CoverImageUrl && (
                      <Image
                        src={article.CoverImageUrl}
                        width="100%"
                        margin="16px 0"
                        onClick={()=> getDetailPage(article.id)}
                        cursor="pointer"
                      />
                    )}

                    <div
                      className="content-title"
                      onClick={() => getDetailPage(article.id)}
                    >
                      {article.Title}
                    </div>

                    <div className="content-topics">
                      {article.TopicNames === null
                        ? null
                        : JSON.parse(article.TopicNames).map(
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
                      onClick={() => getDetailPage(article.id)}
                    >
                      <div className="content-count-data-answer-count">
                        {article.CommentCount <= 0
                          ? `No comment yet`
                          : `${millify(article.CommentCount, {
                            precision: 1
                          })} Comments`}
                      </div>
                    </div>

                    <div className="content-count-data-icons">
                      <div className="content-count-data-icon">
                        {article.IsScrap === 0 ? (
                          <Icon
                            className="budy-archive"
                            size="24px"
                            color={greyscales[500]}
                            style={{cursor:"pointer"}} onClick={()=>{ appState.user.authentication ? scrapArticle(index) : showModal()}}
                          />
                        ) : (
                            <Icon
                              className="budy-archive-fill"
                              size="24px"
                              color={positiveBlues[500]}
                              style={{cursor:"pointer"}} onClick={()=>{ appState.user.authentication ? scrapArticle(index) : showModal()}}
                            />
                          )}
                      </div>
                      <div className="content-count-data-icon">
                        <ShareButton postType="article" postId={article.id} />
                      </div>
                    </div>
                  </div>
                </Article>
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

        {(!loading && !hasMore && articleList.length !== 0) &&
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

SearchArticles.propTypes = {
  idToken: PropTypes.string,
  keyword: PropTypes.string.isRequired,
  topicsData: PropTypes.array.isRequired,
  usersData: PropTypes.array.isRequired,
  keywordChanged: PropTypes.bool.isRequired,
  onChangeKeywordChanged: PropTypes.func.isRequired
};

export default withRouter(SearchArticles);

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;
