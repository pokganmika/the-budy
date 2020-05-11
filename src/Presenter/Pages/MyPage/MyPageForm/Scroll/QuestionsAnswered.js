import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import millify from 'millify';
import Loader from 'react-loader-spinner';
import Image from '../../../../../Common/Elements/Image';
import MoreButton from '../../../../../Common/Collections/Buttons/MoreBtn';
import ShareButton from '../../../../../Common/Collections/Buttons/ShareBtn';
import copy from 'copy-to-clipboard';
import {
  primary,
  negativeReds,
  positiveBlues,
  greyscales
} from '../../../../../Common/Styles/Colors';

import useQuestionsAnswered from './useQuestionsAnswered';
import {
  Wrapper,
  Content,
  Message,
  Icon,
  AnswerButton,
  CopyMessage
} from './style';

/**
 *
 * @param {string} idToken
 * @param {function} updateQuestionsNav
 */
const QuestionsAnswered = ({
  history,
  idToken,
  budyId,
  updateQuestionsNav
}) => {
  const [message, setMessage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    loading,
    error,
    dataList,
    hasMore,
    scrapQuestion,
    voteQuestion
  } = useQuestionsAnswered(pageNumber, idToken);
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
    history.push(`/question/${id}`);
  };

  const getUserPage = id => {
    budyId !== id && history.push(`/userpage/${id}/profile`);
  };

  const moveTopicDetail = topicName => {
    history.push(`/topic/${topicName}/articles`);
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
      {dataList.length === 0 && !loading ? (
        <>
          <Message>No answered questions yet.</Message>
          {/* <Message>No data</Message> */}
        </>
      ) : (
        dataList.map((data, index) => {
          console.log('::QuestionAnswered dataList data:: ---> : ', data);
          console.log(
            '::QuestionAnswered QuestionBudyId:: ---> : ',
            data.QuestionBudyId
          );
          console.log('===== budy ===== : ', budyId);
          return (
            <Content
              ref={index === dataList.length - 1 ? lastDataElementRef : null}
              key={index}
            >
              <div className="content-profile">
                <div className="content-profile-outter-wrapper">
                  <Image
                    src={data.QuestionProfileUrl}
                    type="profile"
                    width="32px"
                    height="32px"
                    onClick={() => getUserPage(data.QuestionBudyId)}
                  />
                  <div className="content-profile-inner-wrapper">
                    <div
                      className="content-display-name"
                      onClick={() => getUserPage(data.QuestionBudyId)}
                    >
                      {data.QuestionDisplayName}
                    </div>
                    <div className="content-created-at">
                      {moment(data.QuestionCreatedAt).fromNow()}
                    </div>
                  </div>
                </div>

                <div>
                  <MoreButton type="right">
                    <span onClick={() => getDetailPage(data.QuestionId)} >
                      View my answer
                    </span>
                  </MoreButton>
                </div>
              </div>

              <div className="content-data-wrapper">
                <div
                  className="content-title"
                  onClick={() => getDetailPage(data.QuestionId)}
                >
                  {`"${data.Title}"`}
                </div>

                {data.CoverImageUrl && (
                  <Image
                    src={data.CoverImageUrl}
                    width="100%"
                    margin="16px 0"
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
                              onClick={() => moveTopicDetail(topic)}
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
                    onClick={() => getDetailPage(data.QuestionId)}
                  />
                  <div className="content-count-data-detail">
                    Answer • {millify(data.AnswerCount, { precision: 1 })}
                  </div>
                </AnswerButton>

                <div className="content-count-data-icons">
                  {budyId !== data.QuestionBudyId && (
                    <div
                      className="content-count-data-icon"
                      style={{ marginLeft: '8px' }}
                    >
                      {data.IsScrap === 0 ? (
                        <Icon
                          className="budy-archive"
                          size="24px"
                          color={greyscales[500]}
                          onClick={() =>
                            scrapQuestion(index, updateQuestionsNav)
                          }
                        />
                      ) : (
                        <Icon
                          className="budy-archive-fill"
                          size="24px"
                          color={positiveBlues[500]}
                          onClick={() =>
                            scrapQuestion(index, updateQuestionsNav)
                          }
                        />
                      )}
                    </div>
                  )}

                  <div
                    className="content-count-data-icon"
                    style={{ marginLeft: '8px' }}
                  >
                    <ShareButton postType="question" postId={data.QuestionId} />
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
    </Wrapper>
  );
};

QuestionsAnswered.propTypes = {
  idToken: PropTypes.string.isRequired,
  updateQuestionsNav: PropTypes.func.isRequired
};

export default withRouter(QuestionsAnswered);
