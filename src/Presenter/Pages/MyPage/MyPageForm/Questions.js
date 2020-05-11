import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import { USER_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primary, greyscales } from '../../../../Common/Styles/Colors';
import { Title } from './style';

import QuestionsAsked from './Scroll/QuestionsAsked';
import QuestionsStored from './Scroll/QuestionsStored';
import QuestionsAnswered from './Scroll/QuestionsAnswered';

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
  asked: 0,
  stored: 0,
  answered: 0
};

/**
 *
 * @param {string} idToken
 */
const Questions = ({ idToken }) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(countDataInitState);
  const [changeCount, setChangeCount] = useState(0);
  const [appState] = useContext(AppContext);
  const { budyId } = appState.user;
  const location = useLocation();

  // GET Data
  const getQuestionsData = () => {
    getAskedData();
    getStoredData();
    getAnsweredData();
  };

  const getAskedData = async () => {
    const response = await axios.get(
      `${USER_API}/users/${budyId}/posts?type=question`
    );
    setCount(prevState => ({
      ...prevState,
      asked: response.data.result.rowCount
    }));
  };

  const getStoredData = async () => {
    const tokenData = { 'x-access-token': idToken };
    const response = await axios.get(
      `${USER_API}/users/me/posts/stored?type=question`,
      {
        headers: tokenData
      }
    );
    setCount(prevState => ({
      ...prevState,
      stored: response.data.result.rowCount
    }));
  };

  const getAnsweredData = async () => {
    const response = await axios.get(
      `${USER_API}/users/${budyId}/posts?type=answer`
    );
    setCount(prevState => ({
      ...prevState,
      answered: response.data.result.rowCount
    }));
  };

  // UPDATE Questions Nav (Scrap Question and Drop Question)
  const updateQuestionsNav = () => setChangeCount(prevCount => prevCount + 1);

  useEffect(() => {
    getQuestionsData();
    setLoading(false);
  }, [changeCount]);

  return (
    <Wrapper>
      {!loading && (
        <>
          <Title>Questions</Title>

          <StatusBarWrapper>
            <StatusBar
              to="/mypage/questions/asked"
              selected={location.pathname.includes('asked') ? true : null}
            >
              Asked ({count.asked})
            </StatusBar>
            <StatusBar
              to="/mypage/questions/stored"
              selected={location.pathname.includes('stored') ? true : null}
            >
              Stored ({count.stored})
            </StatusBar>
            <StatusBar
              to="/mypage/questions/answered"
              selected={location.pathname.includes('answered') ? true : null}
            >
              Answered ({count.answered})
            </StatusBar>
          </StatusBarWrapper>

          <Route
            path="/mypage/questions/asked"
            render={() => (
              <QuestionsAsked idToken={idToken} countData={count.asked} />
            )}
          />
          <Route
            path="/mypage/questions/stored"
            render={() => (
              <QuestionsStored
                idToken={idToken}
                budyId={budyId}
                countData={count.stored}
                updateQuestionsNav={updateQuestionsNav}
              />
            )}
          />
          <Route
            path="/mypage/questions/answered"
            render={() => (
              <QuestionsAnswered
                idToken={idToken}
                budyId={budyId}
                countData={count.answered}
                updateQuestionsNav={updateQuestionsNav}
              />
            )}
          />
        </>
      )}
    </Wrapper>
  );
};

Questions.propTypes = {
  idToken: PropTypes.string.isRequired
};

export default withRouter(Questions);
