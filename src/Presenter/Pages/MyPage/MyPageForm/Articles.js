import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { USER_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';
import { primary, greyscales } from '../../../../Common/Styles/Colors';
import { Title } from './style';

import ArticlesPublished from './Scroll/ArticlesPublished';
import ArticlesStored from './Scroll/ArticlesStored';

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

const countDataInitState = {
  published: 0,
  stored: 0
};

const Articles = ({ idToken }) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(countDataInitState);
  const [changeCount, setChangeCount] = useState(0);
  const [appState] = useContext(AppContext);
  const { budyId } = appState.user;
  const location = useLocation();

  // GET Data
  const getArticlesData = () => {
    getPublishedData();
    getStoredData();
  };

  const getPublishedData = async () => {
    const result = await axios.get(
      `${USER_API}/users/${budyId}/posts?type=article`
    );
    console.log('published data check : ', result);
    setCount(prevState => ({
      ...prevState,
      published: result.data.result.rowCount
    }));
  };

  const getStoredData = async () => {
    const tokenData = { 'x-access-token': idToken };
    const result = await axios.get(
      `${USER_API}/users/me/posts/stored?type=article`,
      {
        headers: tokenData
      }
    );
    console.log('stored data check : ', result);
    setCount(prevState => ({
      ...prevState,
      stored: result.data.result.rowCount
    }));
  };

  // UPDATE Artilcse Nav (Drop Article)
  const updateArticlesNav = () => setChangeCount(prevCount => prevCount + 1);

  useEffect(() => {
    getArticlesData();
    setLoading(false);
  }, [changeCount]);

  return (
    <Wrapper>
      {!loading && (
        <>
          <Title>Articles</Title>

          <StatusBarWrapper>
            <StatusBar
              to="/mypage/articles/published"
              selected={location.pathname.includes('published') ? true : null}
            >
              Published ({count.published})
            </StatusBar>
            <StatusBar
              to="/mypage/articles/stored"
              selected={location.pathname.includes('stored') ? true : null}
            >
              Stored ({count.stored})
            </StatusBar>
          </StatusBarWrapper>

          <Route
            path="/mypage/articles/published"
            render={() => <ArticlesPublished />}
          />
          <Route
            path="/mypage/articles/stored"
            render={() => (
              <ArticlesStored
                idToken={idToken}
                budyId={budyId}
                updateArticlesNav={updateArticlesNav}
              />
            )}
          />
        </>
      )}
    </Wrapper>
  );
};

Articles.propTypes = {
  idToken: PropTypes.string.isRequired
};

export default withRouter(Articles);
