import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import millify from 'millify';
import Loader from 'react-loader-spinner';
import copy from 'copy-to-clipboard';
import Image from '../../../../../Common/Elements/Image';
import {
  primary,
  negativeReds,
  greyscales,
  positiveBlues
} from '../../../../../Common/Styles/Colors';
import MoreButton from '../../../../../Common/Collections/Buttons/MoreBtn';
import ShareButton from '../../../../../Common/Collections/Buttons/ShareBtn';

import useArticlePublished from './useArticlesPublished';
import {
  Wrapper,
  Article,
  Message,
  Icon,
  CopyMessage
} from '../../../MyPage/MyPageForm/Scroll/style';

/**
 *
 * @param {object} history
 * @param {string} userId
 * @param {string} idToken
 */
const ArticlePublished = ({ history, userId, idToken }) => {
  const [message, setMessage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    loading,
    error,
    dataList,
    hasMore,
    scrapArticle
  } = useArticlePublished(pageNumber, userId, idToken);
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

  const getDetailPage = id => {
    history.push(`/article/${id}`);
  };

  const moveTopicDetail = topicName => {
    history.push(`/topic/${topicName}/articles`);
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

  return (
    <Wrapper>
      {dataList.length === 0 && !loading ? (
        <>
          <Message>No published articles yet.</Message>
          {/* <Message>No data</Message> */}
        </>
      ) : (
        dataList.map((data, index) => {
          console.log('::ArticlePublished dataList data:: ---> : ', data);
          return (
            <Article
              ref={index === dataList.length - 1 ? lastDataElementRef : null}
              key={index}
              borderWidth = {index === dataList.length - 1 ? "0px" : "1px"}
            >
              <div className="content-type">ARTICLE BY</div>
              <div className="content-profile">
                <div className="content-profile-wrapper">
                  <div className="content-display-name">{data.DisplayName}</div>
                  <div className="content-created-at">
                    {moment(data.createdAt).fromNow()}
                  </div>
                </div>

                <div>
                  <MoreButton type="right">
                    <span>Store</span>
                    <span>Share</span>
                    <span>Report</span>
                  </MoreButton>
                </div>
              </div>

              <div className="content-data-wrapper">
                {data.CoverImageUrl && (
                  <Image
                    src={data.CoverImageUrl}
                    width="100%"
                    margin="16px 0"
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
                              onClick={() => moveTopicDetail(topic)}
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
                        onClick={() => scrapArticle(index)}
                      />
                    ) : (
                      <Icon
                        className="budy-archive-fill"
                        size="24px"
                        color={positiveBlues[500]}
                        onClick={() => scrapArticle(index)}
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
    </Wrapper>
  );
};

ArticlePublished.propTypes = {
  userId: PropTypes.string.isRequired,
  idToken: PropTypes.string
};

export default withRouter(ArticlePublished);
