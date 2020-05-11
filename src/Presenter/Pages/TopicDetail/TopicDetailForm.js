import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { primary, greyscales } from '../../../Common/Styles/Colors';

import TopicArticles from './TopicDetailForm/TopicArticles';
import TopicQuestions from './TopicDetailForm/TopicQuestions';
import TopicUser from './TopicDetailForm/TopicUsers';
import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const Main = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  margin-bottom: 40px;
  max-width: 1064px;
  min-height: 900px;
`;

const TitleHeader = styled.div`
  margin: 24px 0;
  padding: 16px 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  .topic-detail-title-sub {
    font-size: 14px;
    line-height: normal;
    color: ${primary[500]};
  }
  .topic-detail-title {
    font-size: 52px;
    font-weight: 600;
    line-height: 1.23;
    color: ${greyscales[900]};
  }

  @media (max-width: 530px) {
    margin: 0;
    padding: 16px;
    .topic-detail-title {
      font-size: 28px;
      line-height: 1.14;
      margin-top: 8px;
    }
  }
`;

const SelectorWrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 530px) {
    border-bottom: 1px solid ${greyscales[200]};
    margin-bottom: 24px;
    padding: 0 8px;
    height: fit-content;
  }
`;

const Selector = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  padding: 16px 0;
  margin: 0 16px;
  color: ${({ selected }) => (selected ? primary[500] : greyscales[500])};
  border-bottom: ${({ selected }) => selected && `2px solid ${primary[500]}`};
  &:hover {
    color: ${primary[500]};
  }

  @media (max-width: 530px) {
    margin: 0 8px;
    padding: 12px 0;
  }
`;

const ListWrapper = styled.div`
  padding: 0 24px;

  @media (max-width: 530px) {
    padding: 0;
  }
`;

/**
 *
 * @param {string} idToken
 * @param {string} path
 * @param {object} countData
 * @param {function} refreshNav
 * @param {function} followUser
 */
export default function TopicDetailForm({
  idToken,
  path,
  countData,
  refreshNav,
  followUser
}) {
  const location = useLocation();
  return (
    <>
      <Main>
        <TitleHeader>
          <div className="topic-detail-title-sub">On the topics of</div>
          <div className="topic-detail-title">{`"${path}"`}</div>
        </TitleHeader>

        <SelectorWrapper>
          <Selector
            to={`/topic/${path}/articles`}
            selected={location.pathname.includes('articles') ? true : null}
          >
            {`Articles (${countData.articles})`}
          </Selector>
          <Selector
            to={`/topic/${path}/questions`}
            selected={location.pathname.includes('questions') ? true : null}
          >
            {`Questions (${countData.questions})`}
          </Selector>
          <Selector
            to={`/topic/${path}/users`}
            selected={location.pathname.includes('users') ? true : null}
          >
            {`Users (${countData.users})`}
          </Selector>
        </SelectorWrapper>

        <ListWrapper>
          <Route
            path={`/topic/:topic/articles`}
            render={() => (
              <TopicArticles
                idToken={idToken}
                topicKeyword={path}
                refreshNav={refreshNav}
              />
            )}
          />
          <Route
            path={`/topic/:topic/questions`}
            render={() => (
              <TopicQuestions
                idToken={idToken}
                topicKeyword={path}
                refreshNav={refreshNav}
              />
            )}
          />
          <Route
            path={`/topic/:topic/users`}
            render={() => (
              <TopicUser
                idToken={idToken}
                topicKeyword={path}
                followUser={followUser}
              />
            )}
          />
        </ListWrapper>
      </Main>
      <GlobalFooter />
    </>
  );
}

TopicDetailForm.propTypes = {
  idToken: PropTypes.string,
  path: PropTypes.string.isRequired,
  countData: PropTypes.object.isRequired,
  refreshNav: PropTypes.func.isRequired,
  followUser: PropTypes.func
};
