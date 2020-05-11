import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Summary from './MyPageForm/Summary';
import Profile from './MyPageForm/Profile';
import Questions from './MyPageForm/Questions';
import Articles from './MyPageForm/Articles';
import Inbox from './MyPageForm/Inbox';
import EditProfile from './MyPageForm/EditProfile';
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
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const MyPageForm = ({
  userInfo,
  budyId,
  idToken,
  addSocialLink,
  removeSocialLink,
  onChangeSetProfile,
  followUser,
  submitImageData,
  myPageChangeCount
}) => {
  return (
    <>
      <Main>
        <Container>
          <Summary
            userData={userInfo.user}
            imageData={userInfo.img}
            idToken={idToken}
            followUser={followUser}
          />

          <Route
            path="/mypage/profile"
            render={() => (
              <Profile
                idToken={idToken}
                addSocialLink={addSocialLink}
                removeSocialLink={removeSocialLink}
                myPageChangeCount={myPageChangeCount}
              />
            )}
          />
          <Route
            path="/mypage/questions"
            render={() => <Questions budyId={budyId} idToken={idToken} />}
          />
          <Route
            path="/mypage/articles"
            render={() => <Articles budyId={budyId} idToken={idToken} />}
          />
          <Route
            path="/mypage/inbox"
            render={() => <Inbox idToken={idToken} />}
          />
          <Route
            path="/mypage/edit-profile"
            render={() => (
              <EditProfile
                userData={userInfo.user}
                imageData={userInfo.img}
                onChangeSetProfile={onChangeSetProfile}
                submitImageData={submitImageData}
              />
            )}
          />
        </Container>
      </Main>
      <GlobalFooter />
    </>
  );
};

MyPageForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  budyId: PropTypes.string.isRequired,
  idToken: PropTypes.string.isRequired,
  addSocialLink: PropTypes.func.isRequired,
  removeSocialLink: PropTypes.func.isRequired,
  onChangeSetProfile: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  myPageChangeCount: PropTypes.func.isRequired
};

export default MyPageForm;
