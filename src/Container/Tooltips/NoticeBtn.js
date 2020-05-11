import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
// import Loader from 'react-loader-spinner';
import moment from 'moment';
import styled from 'styled-components';
import Image from '../../Common/Elements/Image';

import useInbox from '../../Presenter/Pages/MyPage/MyPageForm/Scroll/useInbox';
import { primary, greyscales, safeYellows } from '../../Common/Styles/Colors';

const View = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  width: ${({ size }) => (size ? size : '24px')};
  height: ${({ size }) => (size ? size : '24px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
  @media (max-width: 530px) {
    font-size: 24px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  min-width: 320px;
  height: fit-content;
  left: ${({ positionType }) => (positionType === 'left' ? '0px' : 'auto')};
  right: ${({ positionType }) => (positionType === 'right' ? '0px' : 'auto')};
  top: 46px;
  border: solid 1px ${greyscales[200]};
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  z-index: 1;
  ::before {
    background-color: #ffffff;
    position: absolute;
    right: 10px;
    width: 10px;
    height: 10px;
    border-top: solid 1px ${greyscales[200]};
    border-left: solid 1px ${greyscales[200]};
    bottom: 100%;
    left: ${props => props.arrowPosition};
    content: '';
    transform: rotate(45deg);
    margin-bottom: -4px;
  }

  @media (max-width: 530px) {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 56px;
    left: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${greyscales[200]};
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${greyscales[900]};
`;

const Main = styled.div`
  width: 100%;
  height: 700px;
  overflow-y: auto;
`;

const NoData = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[500]};
`;

const Content = styled.div`
  background-color: ${({ newMessage }) => newMessage && safeYellows[100]};
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

const Footer = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${greyscales[200]};
  .notification-footer-inbox {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: ${primary[600]};
    cursor: pointer;
  }
`;

/**
 *
 * @param {string} type
 */
const NoticeBtn = ({ history, type }) => {
  const positionType = type || 'right';
  const node = useRef();
  const observer = useRef();
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [idToken, setIdToken] = useState('');
  const { loading, error, dataList, hasMore } = useInbox(pageNumber, idToken);

  const notice = (
    <IconWrapper size="32px">
      <Icon className="budy-bell" size="20px" onClick={() => setOpen(!open)} />
    </IconWrapper>
  );

  const handleClick = e => {
    if (node.current.contains(e.target)) return;
    setOpen(false);
  };

  /**
   * @param {string} type
   * @param {string} id
   * @param {string} entityType
   */
  const movePage = (type, id, entityType) => {
    switch (type) {
      case 'settings':
        history.push(`/${type}/email-notification`);
        break;
      case 'users':
        history.push(`/userpage/${id}/profile`);
        break;
      case 'post':
        history.push(`/${entityType}/${id}`);
        break;
      case 'inbox':
        history.push(`/mypage/inbox`);
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const getIdToken = async () => {
    try {
      const response = await firebase.auth().currentUser.getIdToken();
      setIdToken(response);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    getIdToken();
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <View ref={node}>
      {notice}
      {open && (
        <Tooltip positionType={positionType}>
          <Header>
            <Title>Notifications</Title>
            <IconWrapper>
              <Icon
                className="budy-settings"
                size="16px"
                onClick={() => movePage('settings')}
              />
            </IconWrapper>
          </Header>

          {dataList.lengt === 0 && !loading ? (
            <NoData>Any notifications yet.</NoData>
          ) : (
            <Main>
              {dataList.map((data, index) => {
                // console.log('::Inbox dataList data check::', data);
                return (
                  <Content
                    ref={
                      index === dataList.length - 1 ? lastDataElementRef : null
                    }
                    key={index}
                    newMessage={data.IsRead === 0}
                  >
                    <div>
                      <Image
                        src={data.profileUrl}
                        type="profile"
                        width="32px"
                        height="32px"
                        onClick={() => movePage('users', data.BudyId)}
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
                                movePage('users', data.BudyId);
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
                                movePage(
                                  'post',
                                  data.ReceiverObjectId,
                                  checkMessageType(data.EntityType)
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
                                movePage('users', data.BudyId);
                              }}
                            >
                              {data.DisplayName}
                            </span>
                            {` ${data.Message} `}
                            <span
                              className="content-text-receiver"
                              onClick={e => {
                                e.preventDefault();
                                movePage(
                                  'post',
                                  data.ReceiverObjectId,
                                  checkMessageType(data.EntityType)
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
              })}
            </Main>
          )}

          {dataList.length !== 0 && (
            <Footer>
              <div
                className="notification-footer-inbox"
                onClick={() => movePage('inbox')}
              >
                View all
              </div>
            </Footer>
          )}
        </Tooltip>
      )}
    </View>
  );
};

NoticeBtn.propTypes = {
  type: PropTypes.string
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

export default withRouter(NoticeBtn);
