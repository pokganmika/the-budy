import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Summary from './UserPageForm/Summary';
import Profile from './UserPageForm/Profile';
import Questions from './UserPageForm/Questions';
import Articles from './UserPageForm/Articles';
import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const Main = styled.main`
  background-color: #ffffff;
  margin: 0 auto;
  margin-bottom: 40px;
  max-width: 1064px;
  min-height: 900px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 64px;
  padding: 0 16px;
  display: flex;
  @media (max-width: 650px) {
    /* @media (max-width: 530px) { */
    flex-direction: column;
    margin: 0;
    padding: 0;
    top: 56px;
    left: 0;
    /* position: static; */
    overflow: auto;
  }
`;

/**
 *
 * @param {object} userInfo
 * @param {string} budyId
 * @param {string} userId
 * @param {string} idToken
 * @param {function} followPageOwner
 * @param {function} followListUser
 */
const UserPageForm = ({
  userInfo,
  budyId,
  userId,
  idToken,
  followPageOwner,
  followListUser
}) => {
  return (
    <>
      <Main>
        <Container>
          <Summary
            idToken={idToken}
            userData={userInfo.user}
            imageData={userInfo.img}
            userId={userId}
            follow={userInfo.follow}
            followPageOwner={followPageOwner}
            followListUser={followListUser}
          />
          <Route
            path={`/userpage/:userId/profile`}
            // path={`/userpage/${userId}/profile`}
            render={() => <Profile userId={userId} idToken={idToken} />}
          />
          <Route
            path={`/userpage/:userId/questions`}
            // path={`/userpage/${userId}/questions`}
            render={() => <Questions userId={userId} idToken={idToken} />}
          />
          <Route
            path={`/userpage/:userId/articles`}
            // path={`/userpage/${userId}/articles`}
            render={() => <Articles userId={userId} idToken={idToken} />}
          />
        </Container>
      </Main>
      <GlobalFooter />
    </>
  );
};

UserPageForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  budyId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  idToken: PropTypes.string.isRequired,
  followPageOwner: PropTypes.func.isRequired,
  followListUser: PropTypes.func.isRequired
};

export default UserPageForm;
