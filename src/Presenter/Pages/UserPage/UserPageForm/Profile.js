import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { USER_API } from '../../../../Config/api';
import linkChecker from '../../../../Service/linkCheck';
import { primary, greyscales } from '../../../../Common/Styles/Colors';
import Icon from '../../../../Common/Modules/Icon';
import { Title } from '../../MyPage/MyPageForm/style';
import {
  Medium,
  Facebook,
  Youtube,
  Twitter
} from '../../../../Service/socialIcons';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 40px;
  @media (max-width: 650px) {
    width: 100%;
    height: 100%;
    padding: 24px 16px;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: ${greyscales[800]};
  padding: 8px 0;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${greyscales[400]};
  margin: 32px 0 0 0;
`;

const SocialLinkWrapper = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[400]};
`;

const SocialLinkIconWrapper = styled.div`
  display: flex;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.5);
  padding: 8px 0;
  margin-bottom: 24px;
`;

const TopicsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const profileInitState = {
  knowsAbout: [],
  interests: [],
  url: []
};

/**
 *
 * @param {string} userId
 * @param {string} idToken
 */
const Profile = ({ history, userId, idToken }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(profileInitState);

  const getProfileData = async () => {
    try {
      setLoading(true);
      const tokenData = { 'x-access-token': idToken };
      const result = await axios.get(`${USER_API}/users/${userId}/info`, {
        headers: tokenData
      });
      const { knowsAbout, interests, url } = result.data.result;
      setData(prevState => ({
        ...prevState,
        knowsAbout,
        interests,
        url
      }));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const moveTopicDetail = topicName => {
    history.push(`/topic/${topicName}/articles`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      {!loading && (
        <Wrapper>
          <Title>Profile</Title>

          <SubtitleWrapper>
            <Subtitle>Knows About</Subtitle>
            <SocialLinkWrapper>
              {data.knowsAbout.length === 0
                ? 'No Attributed Topics yet.'
                : `${data.knowsAbout.length} Topics`}
            </SocialLinkWrapper>
          </SubtitleWrapper>
          {data.knowsAbout ? (
            <TopicsWrapper>
              {data.knowsAbout.map((topic, i) => (
                <Topic
                  topic={topic.topicName}
                  key={i}
                  onClick={() => moveTopicDetail(topic.topicName)}
                />
              ))}
            </TopicsWrapper>
          ) : (
            <Message>No Attributed Topic yet.</Message>
          )}

          <SubtitleWrapper>
            <Subtitle>Interests</Subtitle>
            <SocialLinkWrapper>
              {data.interests.length === 0
                ? 'No Attributed Topics yet.'
                : `${data.interests.length} Topics`}
            </SocialLinkWrapper>
          </SubtitleWrapper>
          {data.interests ? (
            <TopicsWrapper>
              {data.interests.map((topic, i) => (
                <Topic
                  topic={topic.topicName}
                  key={i}
                  onClick={() => moveTopicDetail(topic.topicName)}
                />
              ))}
            </TopicsWrapper>
          ) : (
            <Message>No Attributed Topic yet.</Message>
          )}

          <SubtitleWrapper>
            <Subtitle>Social Links</Subtitle>
            <SocialLinkWrapper>
              {data.url.length === 0
                ? 'No social links yet.'
                : `${data.url.length} Links`}
            </SocialLinkWrapper>
          </SubtitleWrapper>

          <SocialLinkIconWrapper>
            {data.url.map((link, i) => {
              if (linkChecker(link.Url) === 'medium') {
                return (
                  <Medium
                    key={i}
                    color="#000000"
                    margin="14px 20px 0 0"
                    onClick={e => {
                      e.preventDefault();
                      if (link.Url.slice(0, 4) !== 'http') {
                        window.open(`http://${link.Url}`);
                      } else {
                        window.open(link.Url);
                      }
                    }}
                    linkUrl={link.Url}
                  />
                );
              } else if (linkChecker(link.Url) === 'facebook') {
                return (
                  <Facebook
                    key={i}
                    color="#356bc4"
                    margin="14px 20px 0 0"
                    onClick={e => {
                      e.preventDefault();
                      if (link.Url.slice(0, 4) !== 'http') {
                        window.open(`http://${link.Url}`);
                      } else {
                        window.open(link.Url);
                      }
                    }}
                    linkUrl={link.Url}
                  />
                );
              } else if (linkChecker(link.Url) === 'youtube') {
                return (
                  <Youtube
                    key={i}
                    color="#e62117"
                    margin="14px 20px 0 0"
                    onClick={e => {
                      e.preventDefault();
                      if (link.Url.slice(0, 4) !== 'http') {
                        window.open(`http://${link.Url}`);
                      } else {
                        window.open(link.Url);
                      }
                    }}
                    linkUrl={link.Url}
                  />
                );
              } else if (linkChecker(link.Url) === 'twitter') {
                return (
                  <Twitter
                    key={i}
                    color="#1da1fe"
                    margin="14px 20px 0 0"
                    onClick={e => {
                      e.preventDefault();
                      if (link.Url.slice(0, 4) !== 'http') {
                        window.open(`http://${link.Url}`);
                      } else {
                        window.open(link.Url);
                      }
                    }}
                    linkUrl={link.Url}
                  />
                );
              } else {
                return (
                  <Icon
                    key={i}
                    type="globe-outline"
                    size="20px"
                    cursor="pointer"
                    margin="14px 20px 0 0"
                    color={primary[500]}
                    onClick={e => {
                      e.preventDefault();
                      if (link.Url.slice(0, 4) !== 'http') {
                        window.open(`http://${link.Url}`);
                      } else {
                        window.open(link.Url);
                      }
                    }}
                  />
                );
              }
            })}
          </SocialLinkIconWrapper>
        </Wrapper>
      )}
    </>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  idToken: PropTypes.string.isRequired
};

const TopicWrapper = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${primary[500]};
  background-color: ${primary[100]};
  margin: 8px 2px 0 0;
  cursor: pointer;
`;

const Topic = ({ topic, onClick }) => (
  <TopicWrapper onClick={onClick}>{topic}</TopicWrapper>
);

export default withRouter(Profile);
