import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import millify from 'millify';
import { greyscales, primary, sub } from '../../../../Common/Styles/Colors';
import Image from '../../../../Common/Elements/Image';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import FollowerModal from '../MyPageModal/Scroll/FollowerModal';
import FollowingModal from '../MyPageModal/Scroll/FollowingModal';

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
  margin: 4px 0;
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
  }
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

const Icon = styled.span`
  display: inline-block;
  color: ${({ color }) => (color ? color : greyscales[800])};
`;

const followInitToggleState = {
  followerToggleSwitch: false,
  followingToggleSwitch: false
};

/**
 *
 * @param {object} userData
 * @param {object} imageData
 * @param {string} idToken
 * @param {function} followUser
 */
const Summary = ({ userData, imageData, idToken, followUser }) => {
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

  /**
   *
   * @param {number} countNumber
   */
  const showCountData = countNumber => {
    return countNumber < 0 ? 0 : millify(countNumber, { precision: 1 });
  };

  useEffect(() => {
    targetElement = targetRef.current;
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <>
      {toggle.followerToggleSwitch && (
        <FollowerModal
          onChangeCloseToggle={onChangeCloseToggle}
          idToken={idToken}
          userData={userData}
          followUser={followUser}
        />
      )}
      {toggle.followingToggleSwitch && (
        <FollowingModal
          onChangeCloseToggle={onChangeCloseToggle}
          idToken={idToken}
          userData={userData}
          followUser={followUser}
        />
      )}
      <Wrapper>
        <ProfileData>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Link to="/mypage/edit-profile">
              <Icon className="budy-edit-2" color={greyscales[800]} />
            </Link>
          </div>
          <Link to="/mypage/edit-profile">
            <Image
              src={imageData ? imageData.small : null}
              type="profile"
              width="80px"
              height="80px"
            />
          </Link>

          <div className="profile-text-data">
            <div className="mypage-budy-username">{userData.DisplayName}</div>
            <div className="mypage-budy-id">{userData.BudyId}</div>
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
            to="/mypage/profile"
            selected={location.pathname.includes('profile') ? true : null}
          >
            Profile
          </Selector>
          <Selector
            to="/mypage/questions/asked"
            selected={location.pathname.includes('questions') ? true : null}
          >
            Questions
          </Selector>
          <Selector
            to="/mypage/articles/published"
            selected={location.pathname.includes('articles') ? true : null}
          >
            Articles
          </Selector>
          <Selector
            to="/mypage/inbox"
            selected={location.pathname.includes('inbox') ? true : null}
          >
            Inbox
          </Selector>
        </SelectorWrapper>
      </Wrapper>

      <MobileSelectorWrapper>
        <MobileSelector
          to="/mypage/profile"
          selected={location.pathname.includes('profile') ? true : null}
        >
          Profile
        </MobileSelector>
        <MobileSelector
          to="/mypage/questions/asked"
          selected={location.pathname.includes('questions/asked') ? true : null}
        >
          Asked questions
        </MobileSelector>
        <MobileSelector
          to="/mypage/questions/stored"
          selected={
            location.pathname.includes('questions/stored') ? true : null
          }
        >
          Stored questions
        </MobileSelector>
        <MobileSelector
          to="/mypage/questions/answered"
          selected={
            location.pathname.includes('questions/answered') ? true : null
          }
        >
          Answered
        </MobileSelector>
        <MobileSelector
          to="/mypage/articles/published"
          selected={
            location.pathname.includes('articles/published') ? true : null
          }
        >
          Published Articles
        </MobileSelector>
        <MobileSelector
          to="/mypage/articles/stored"
          selected={location.pathname.includes('articles/stored') ? true : null}
        >
          Stored Articles
        </MobileSelector>
        <MobileSelector
          to="/mypage/inbox"
          selected={location.pathname.includes('inbox') ? true : null}
        >
          Inbox
        </MobileSelector>
      </MobileSelectorWrapper>
    </>
  );
};

Summary.propTypes = {
  userData: PropTypes.object.isRequired,
  imageData: PropTypes.object.isRequired,
  idToken: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired
};

export default withRouter(Summary);
