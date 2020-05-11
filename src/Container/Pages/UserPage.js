import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import UserPageForm from '../../Presenter/Pages/UserPage/UserPageForm';
import AppContext from '../../App/context';
import { USER_API } from '../../Config/api';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {primary} from '../../Common/Styles/Colors';

const userPageInitState = {
  own: false,
  user: null,
  img: null,
  follow: false
};

function UserPage({ match, history }) {
  const [idToken, setIdToken] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(userPageInitState);
  const [changeCount, setChangeCount] = useState(1);
  const [appState] = useContext(AppContext);
  const { authentication, budyId } = appState.user;
  const { userId } = match.params;

  const followPageOwner = async () => {
    try {
      const response = await axios({
        method: userInfo.follow ? 'DELETE' : 'POST',
        url: `${USER_API}/users/follow`,
        data: { budyId: userId },
        headers: { 'x-access-token': idToken }
      });
      if (response.data.success) {
        setUserInfo(prevState => ({
          ...prevState,
          follow: !userInfo.follow
        }));
        setChangeCount(prevChangeCount => prevChangeCount + 1);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param {number} index
   * @param {number} followState
   * @param {string} userId
   * @param {function} toggleFollow
   */
  const followListUser = async (index, followState, userId, toggleFollow) => {
    try {
      const response = await axios({
        method: followState === 1 ? 'DELETE' : 'POST',
        url: `${USER_API}/users/follow`,
        data: { budyId: userId },
        headers: { 'x-access-token': idToken }
      });
      if (response.data.success) {
        toggleFollow(index);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @param {string} userId
   */
  const getUserData = async userId => {
    try {
      setIsLoading(true);
      const idToken =
        authentication && (await firebase.auth().currentUser.getIdToken());
      const response = await axios({
        method: 'GET',
        url: `${USER_API}/users/${userId}/profile`,
        headers: authentication ? { 'x-access-token': idToken } : null
      });
      if (response.data.result.own) {
        history.push('/mypage/profile');
      } else {
        const { own, user, img, follow } = response.data.result;
        setUserInfo({ own, user, img, follow });
        authentication && setIdToken(idToken);
      }
    } catch (error) {
      console.error(error);
      setUserNotFound(true);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData(userId);
  }, [userId, changeCount]);

  return (
    <>
      {
        isLoading && (
          <LoaderWrapper>
            <Loader type="ThreeDots" color={primary[500]} height={40} width={40} />
          </LoaderWrapper>
        )
      }

      {userInfo.user && userInfo.img &&
        <UserPageForm
          userInfo={userInfo}
          budyId={budyId}
          userId={userId}
          idToken={idToken}
          followPageOwner={followPageOwner}
          followListUser={followListUser}
        />
      }
      { !isLoading && userNotFound && (
          <UserNotFound>
            USER NOT FOUND
          </UserNotFound>
        )
      }
    </>
  );
}

export default withRouter(UserPage);

const UserNotFound = styled.div`
  text-align: center;
  margin-bottom:30px;
  font-size: 17px;
  font-weight: 500;
  color: #dddddd;
  height: 100px;
  /* vertical-align: middle; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;