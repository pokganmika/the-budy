import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import { USER_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primary, greyscales } from '../../../../Common/Styles/Colors';
import { Title } from '../../MyPage/MyPageForm/style';

import QuestionsAsked from './Scroll/QuestionsAsked';
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
  answered: 0
};

/**
 *
 * @param {string} userId
 * @param {string} idToken
 */
const Questions = ({ userId, idToken }) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(countDataInitState);
  const [appState] = useContext(AppContext);
  const location = useLocation();

  const getAskedData = async () => {
    const response = await axios.get(
      `${USER_API}/users/${userId}/posts?type=question`
    );
    setCount(prevState => ({
      ...prevState,
      asked: response.data.result.rowCount
    }));
  };

  const getAnsweredData = async () => {
    const response = await axios.get(
      `${USER_API}/users/${userId}/posts?type=answer`
    );
    setCount(prevState => ({
      ...prevState,
      answered: response.data.result.rowCount
    }));
  };

  useEffect(() => {
    getAskedData();
    getAnsweredData();
    setLoading(false);
  }, []);

  return (
    <Wrapper>
      {!loading && (
        <>
          <Title>Questions</Title>

          <StatusBarWrapper>
            <StatusBar
              to={`/userpage/${userId}/questions/asked`}
              selected={location.pathname.includes('asked') ? true : null}
            >
              Asked ({count.asked})
            </StatusBar>
            <StatusBar
              to={`/userpage/${userId}/questions/answered`}
              selected={location.pathname.includes('answered') ? true : null}
            >
              Answered ({count.answered})
            </StatusBar>
          </StatusBarWrapper>

          <Route
            path={`/userpage/:userId/questions/asked`}
            render={() => <QuestionsAsked userId={userId} idToken={idToken} />}
          />
          <Route
            path={`/userpage/:userId/questions/answered`}
            render={() => (
              <QuestionsAnswered userId={userId} idToken={idToken} />
            )}
          />
        </>
      )}
    </Wrapper>
  );
};

Questions.propTypes = {
  userId: PropTypes.string.isRequired,
  idToken: PropTypes.string.isRequired
};

export default withRouter(Questions);
