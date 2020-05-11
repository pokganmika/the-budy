import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { USER_API } from '../../../../Config/api';
import { primary, greyscales } from '../../../../Common/Styles/Colors';
import { Title } from '../../MyPage/MyPageForm/style';

import ArticlePublished from './Scroll/ArticlesPublished';

const Wrapper = styled.div`
  width: 100%;
  /* width: 680px; */
  height: fit-content;
  padding: 40px 24px;

  @media (max-width: 530px) {
    padding: 0;
  }
`;

const StatusBarWrapper = styled.div`
  width: 100%;
  /* width: 600px; */
  height: 40px;
  display: flex;
  margin: 24px 0 16px 0;
  @media (max-width: 650px) {
    display: none;
  }
`;

const StatusBar = styled(Link)`
  padding: 8px 16px 12px 16px;
  text-decoration: none;
  border-bottom: ${({ selected }) => selected && `2px solid ${primary[500]}`};
  color: ${({ selected }) => (selected ? greyscales[900] : greyscales[500])};
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${primary[500]};
  }
`;

// Add more data set
const countDataInitState = {
  published: 0
};

/**
 *
 * @param {string} userId
 * @param {string} idToken
 */
const Articles = ({ userId, idToken }) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(countDataInitState);
  const location = useLocation();

  const getPublishedData = async () => {
    const result = await axios.get(
      `${USER_API}/users/${userId}/posts?type=article`
    );
    setCount(prevState => ({
      ...prevState,
      published: result.data.result.rowCount
    }));
  };

  useEffect(() => {
    getPublishedData();
    setLoading(false);
  }, []);

  return (
    <Wrapper>
      {!loading && (
        <>
          <Title>Articles</Title>

          <StatusBarWrapper>
            <StatusBar
              to={`/userpage/${userId}/articles/published`}
              selected={location.pathname.includes('published') ? true : null}
            >
              Published ({count.published})
            </StatusBar>
          </StatusBarWrapper>

          <Route
            path={`/userpage/:userId/articles/published`}
            render={() => (
              <ArticlePublished userId={userId} idToken={idToken} />
            )}
          />
        </>
      )}
    </Wrapper>
  );
};

Articles.propTypes = {
  userId: PropTypes.string.isRequired,
  idToken: PropTypes.string.isRequired
};

export default withRouter(Articles);
