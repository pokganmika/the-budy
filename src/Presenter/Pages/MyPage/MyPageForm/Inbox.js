import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import moment from 'moment';
import { USER_API } from '../../../../Config/api';
import Image from '../../../../Common/Elements/Image';
import {
  greyscales,
  primary,
  negativeReds
} from '../../../../Common/Styles/Colors';

import useInbox from './Scroll/useInbox';
import { Message } from './Scroll/style';
import { Title } from './style';

const Wrapper = styled.div`
  width: 680px;
  height: fit-content;
  padding: 40px 24px;
  .content-status {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 650px) {
    width: 100%;
    height: 100%;
    padding: 24px 16px;
  }
`;

const SubTitle = styled.div`
  border-bottom: 1px solid ${greyscales[200]};
  width: 100%;
  height: auto;
  margin: 24px 0 0 0;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .inbox-subtitle-notification {
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${greyscales[900]};
  }
`;

const SubtitleSetting = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: center;
  color: ${primary[500]};
  &:hover {
    color: ${primary[600]};
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 12px 16px;
  border-bottom: 1px solid ${greyscales[200]};
  display: flex;
  .content-text {
    margin: 0 16px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    color: ${greyscales[900]};
    .content-text-state {
      display: flex;
      align-items: center;
      .content-text-state-name {
        font-weight: 600;
        cursor: pointer;
      }
    }
    .content-text-receiver {
      margin: 8px 0;
      font-weight: 600;
      cursor: pointer;
    }
    .content-text-sender {
      margin: 8px 0;
      font-style: italic;
      color: ${greyscales[500]};
    }
    .content-text-date {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.17;
      color: ${greyscales[600]};
    }
  }
`;

/**
 *
 * @param {string} idToken
 */
const Inbox = ({ history, idToken }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, dataList, hasMore } = useInbox(pageNumber, idToken);
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
   * @param {string} userId
   */
  const moveUserPage = userId => {
    history.push(`/userpage/${userId}/profile`);
  };

  /**
   *
   * @param {string} entityType
   * @param {number} postId
   */
  const movePostPage = (entityType, postId) => {
    history.push(`/${entityType}/${postId}`);
  };

  const confirmInboxMessage = async () => {
    try {
      const result = await axios({
        method: 'PATCH',
        url: `${USER_API}/users/me/inbox`,
        headers: { 'x-access-token': idToken }
      });
      console.log('confirmInboxMessage result check : ', result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    confirmInboxMessage();
  }, []);

  return (
    <Wrapper>
      <Title>Inbox</Title>

      <SubTitle>
        <div className="inbox-subtitle-notification">Notifications</div>
        <SubtitleSetting to="/settings/account-setting">
          Setting
        </SubtitleSetting>
      </SubTitle>

      <>
        {dataList.length === 0 && !loading ? (
          <Message>No notifications yet.</Message>
        ) : (
          dataList.map((data, index) => {
            console.log('::Inbox dataList data check:: ---> : ', data);
            return (
              <Content
                ref={index === dataList.length - 1 ? lastDataElementRef : null}
                key={index}
              >
                <div>
                  <Image
                    src={data.profileUrl}
                    type="profile"
                    width="32px"
                    height="32px"
                    onClick={() => moveUserPage(data.BudyId)}
                  />
                </div>

                <div className="content-text">
                  <div className="content-text-state">
                    {data.EntityType.includes('/') ? (
                      <div>
                        <span
                          className="content-text-state-name"
                          onClick={e => {
                            e.preventDefault();
                            moveUserPage(data.BudyId);
                          }}
                        >
                          {data.DisplayName}
                        </span>
                        {` ${data.Message}  ${addMessageType(
                          data.EntityType
                        )} `}
                        <span
                          className="content-text-receiver"
                          onClick={e => {
                            e.preventDefault();
                            movePostPage(
                              checkMessageType(data.EntityType),
                              data.ReceiverObjectId
                            );
                          }}
                        >
                          {data.ReceiverObjectBody}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span
                          className="content-text-state-name"
                          onClick={e => {
                            e.preventDefault();
                            moveUserPage(data.BudyId);
                          }}
                        >
                          {data.DisplayName}
                        </span>
                        {` ${data.Message} `}
                        <span
                          className="content-text-receiver"
                          onClick={e => {
                            e.preventDefault();
                            movePostPage(
                              checkMessageType(data.EntityType),
                              data.ReceiverObjectId
                            );
                          }}
                        >
                          {data.ReceiverObjectBody}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="content-text-sender">
                    {data.SenderObjectBody}
                  </div>
                  <div className="content-text-date">
                    {moment(data.createdAt).fromNow()}
                  </div>
                </div>
              </Content>
            );
          })
        )}

        {loading ? (
          <div className="content-status">
          <Loader
            type="ThreeDots"
            color={primary[500]}
            height={40}
            width={40}
          />
        </div>
        ) : (
          error && (
            <Loader
              type="ThreeDots"
              color={negativeReds[500]}
              height={40}
              width={40}
            />
            )
          )
        }
        

        {/* {error ? (
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
        )} */}
      </>
    </Wrapper>
  );
};

Inbox.propTypes = {
  idToken: PropTypes.string.isRequired
};

/**
 *
 * @param {string} type
 */
const addMessageType = type => {
  // console.log('::entityType check:: ---> :', type);
  if (type.slice(0, 12) === 'PostComments') {
    return type.slice(13);
  }
  return '';
};

/**
 *
 * @param {string} type
 */
const checkMessageType = type => {
  console.log('1.', type);
  for (let i = 0; i < type.length; i++) {
    if (type[i] === '/') {
      // console.log(type.slice(i + 1));
      return type.slice(i + 1);
    }
  }
};

export default withRouter(Inbox);
