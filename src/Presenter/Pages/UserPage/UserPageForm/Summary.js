import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import millify from 'millify';
import { greyscales, primary, sub } from '../../../../Common/Styles/Colors';
import Image from '../../../../Common/Elements/Image';
import { PrimaryBtn as FollowButton } from '../../../../Common/Elements/Buttons/SolidButton';
import { DefaultBtn as FollowingButton } from '../../../../Common/Elements/Buttons/BorderButton';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import FollowerModal from '../UserPageModal/Scroll/FollowerModal';
import FollowingModal from '../UserPageModal/Scroll/FollowingModal';

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  background-color: #ffffff;
  width: 328px;
  height: fit-content;
  padding: ${({ userPage }) =>
    userPage ? '40px 24px' : '20px 24px 40px 24px'};
  margin-right: 24px;
  @media (max-width: 650px) {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 16px;
    margin-top: 36px;
  }
`;

const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-text-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    .mypage-budy-username {
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      color: #000000;
      margin-top: 24px;
    }
    .mypage-budy-id {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      color: ${sub[500]};
      margin-bottom: 16px;
    }
  }
  .profile-follow-button {
    margin-bottom: 40px;
  }
  /* @media (max-width: 650px) {
    flex-direction: row;
    .profile-text-data {
      display: block;
      margin: 24px;
      .mypage-budy-username {
        margin: 0;
      }
    }
  } */
`;

const CountData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  .profile-count-wrapper {
    cursor: pointer;
    .profile-count {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: ${greyscales[900]};
    }
    .profile-count-name {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      color: ${greyscales[400]};
    }
  }
  .profile-count-wrapper-upvote {
    cursor: default;
  }
  @media (max-width: 650px) {
    margin: 0;
    justify-content: space-between;
    .profile-count-wrapper {
      width: 80px;
      margin-right: 16px;
    }
  }
`;

const BioData = styled.div`
  width: 280px;
  height: auto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #000000;
  padding: 24px 0;
  word-break: keep-all;
  word-wrap: break-word;
`;

const SelectorWrapper = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 650px) {
    display: none;
  }
`;

const Selector = styled(Link)`
  width: 100%;
  height: 32px;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ selected }) => selected && sub[100]};
  color: ${({ selected }) => (selected ? primary[500] : greyscales[500])};
  &:hover {
    background-color: ${sub[100]};
    color: ${primary[500]};
    font-weight: 500;
  }
`;

const MobileSelectorWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid ${greyscales[200]};
  @media (min-width: 651px) {
    display: none;
    padding: 30px;
  }
  padding: 0px 8px;
`;

const MobileSelector = styled(Link)`
  display: inline-block;
  margin: 0 8px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: ${({ selected }) => (selected ? primary[500] : greyscales[500])};
  border-bottom: ${({ selected }) => selected && `2px solid ${primary[500]}`};
  &:hover {
    color: ${primary[500]};
  }
`;

const followInitToggleState = {
  followerToggleSwitch: false,
  followingToggleSwitch: false
};

/**
 *
 * @param {object} userData
 * @param {object} imageData
 * @param {string} userId
 * @param {bool} follow
 * @param {function} followPageOwner
 * @param {function} followListUser
 */
const Summary = ({
  match,
  idToken,
  userData,
  imageData,
  userId,
  follow,
  followPageOwner,
  followListUser
}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [toggle, setToggle] = useState(followInitToggleState);
  const location = useLocation();
  const targetRef = useRef();
  let targetElement = null;

  const onChangeFollowerToggle = e => {
    e.preventDefault();
    disableBodyScroll(targetElement);
    setToggle({
      followerToggleSwitch: true,
      followingToggleSwitch: false
    });
  };

  const onChangeFollowingToggle = e => {
    e.preventDefault();
    disableBodyScroll(targetElement);
    setToggle({
      followerToggleSwitch: false,
      followingToggleSwitch: true
    });
  };

  const onChangeCloseToggle = e => {
    e.preventDefault();
    enableBodyScroll(targetElement);
    setToggle({
      followerToggleSwitch: false,
      followingToggleSwitch: false
    });
  };

  const checkCurrentUserPage = () => {
    if (currentUser === '') {
      setCurrentUser(userId);
    } else {
      if (currentUser !== userId) {
        setToggle({
          followerToggleSwitch: false,
          followingToggleSwitch: false
        });
      }
    }
  };

  /**
   *
   * @param {number} countNumber
   */
  const showCountData = countNumber => {
    return countNumber < 0 ? 0 : millify(countNumber, { precision: 1 });
  };

  useEffect(() => {
    checkCurrentUserPage();
    targetElement = targetRef.current;
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [userId]);

  return (
    <>
      {toggle.followerToggleSwitch && (
        <FollowerModal
          idToken={idToken}
          userId={userId}
          userData={userData}
          onChangeCloseToggle={onChangeCloseToggle}
          followListUser={followListUser}
        />
      )}
      {toggle.followingToggleSwitch && (
        <FollowingModal
          idToken={idToken}
          userId={userId}
          userData={userData}
          onChangeCloseToggle={onChangeCloseToggle}
          followListUser={followListUser}
        />
      )}
      <Wrapper userPage="userPage">
        <ProfileData>
          <Image
            src={imageData && imageData.small}
            type="profile"
            width="80px"
            height="80px"
          />

          <div className="profile-text-data">
            <div className="mypage-budy-username">{userData.DisplayName}</div>
            <div className="mypage-budy-id">{userData.BudyId}</div>
          </div>

          <div className="profile-follow-button">
            {follow ? (
              <FollowingButton
                text="Following"
                size="small"
                width="120px"
                onClick={followPageOwner}
              />
            ) : (
              <FollowButton
                text="Follow"
                size="small"
                width="120px"
                onClick={followPageOwner}
              />
            )}
          </div>
        </ProfileData>

        <CountData>
          <div
            className="profile-count-wrapper"
            onClick={onChangeFollowerToggle}
          >
            <div className="profile-count">
              {showCountData(userData.FollowerCount)}
            </div>
            <div className="profile-count-name">FOLLOWERS</div>
          </div>
          <div
            className="profile-count-wrapper"
            onClick={onChangeFollowingToggle}
          >
            <div className="profile-count">
              {showCountData(userData.FollowingCount)}
            </div>
            <div className="profile-count-name">FOLLOWINGS</div>
          </div>
          <div className="profile-count-wrapper profile-count-wrapper-upvote">
            <div className="profile-count">
              {showCountData(userData.UpVoteCount)}
            </div>
            <div className="profile-count-name">UPVOTES</div>
          </div>
        </CountData>

        <BioData>{userData.AboutMe ? userData.AboutMe : 'No Bio'}</BioData>

        <SelectorWrapper>
          <Selector
            to={`/userpage/${userId}/profile`}
            selected={location.pathname.includes('profile') ? true : null}
          >
            Profile
          </Selector>
          <Selector
            to={`/userpage/${userId}/questions/asked`}
            selected={location.pathname.includes('questions') ? true : null}
          >
            Questions
          </Selector>
          <Selector
            to={`/userpage/${userId}/articles/published`}
            selected={location.pathname.includes('articles') ? true : null}
          >
            Articles
          </Selector>
        </SelectorWrapper>
      </Wrapper>

      <MobileSelectorWrapper>
        <MobileSelector
          to={`/userpage/${userId}/profile`}
          selected={location.pathname.includes('profile') ? true : null}
        >
          Profile
        </MobileSelector>
        <MobileSelector
          to={`/userpage/${userId}/questions/asked`}
          selected={location.pathname.includes('questions/asked') ? true : null}
        >
          Asked questions
        </MobileSelector>
        <MobileSelector
          to={`/userpage/${userId}/questions/answered`}
          selected={
            location.pathname.includes('questions/answered') ? true : null
          }
        >
          Answered questions
        </MobileSelector>
        <MobileSelector
          to={`/userpage/${userId}/articles/published`}
          selected={location.pathname.includes('articles') ? true : null}
        >
          Published articles
        </MobileSelector>
      </MobileSelectorWrapper>
    </>
  );
};

Summary.propTypes = {
  userData: PropTypes.object.isRequired,
  imageData: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  follow: PropTypes.bool.isRequired,
  followPageOwner: PropTypes.func.isRequired,
  followListUser: PropTypes.func.isRequired
};

export default withRouter(Summary);
