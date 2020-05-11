import React, { useState, useEffect, useContext } from 'react';
import MyPageForm from '../../Presenter/Pages/MyPage/MyPageForm';
import AppContext from '../../App/context';
import firebase from 'firebase';
import axios from 'axios';
import { USER_API } from '../../Config/api';
import moveAdditionalInfo from '../../Service/checkBudyId';

const userInfoInitState = {
  own: false,
  user: null,
  img: null,
  follow: false
};

export default function MyPage({ history }) {
  const [idToken, setIdToken] = useState('');
  const [userInfo, setUserInfo] = useState(userInfoInitState);
  const [changeCount, setChangeCount] = useState(0);
  const [appState] = useContext(AppContext);
  const { authentication, budyId, photoURL } = appState.user;

  /**
   *
   * @param {string} username
   * @param {string} budyId
   * @param {string} shortBio
   */
  const onChangeSetProfile = ({ username, budyId, shortBio }) => {
    setUserInfo({
      ...userInfo,
      user: {
        ...userInfo.user,
        DisplayName: username,
        BudyId: budyId,
        AboutMe: shortBio
      }
    });
  };

  /**
   *
   * @param {object} image
   */
  const submitImageData = async image => {
    try {
      const formData = new FormData();
      formData.append('profile', image);
      const response = await axios({
        method: 'POST',
        url: `${USER_API}/users/profileImages`,
        data: formData,
        headers: {
          'x-access-token': idToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('::MyPage submitImageData:: ---> : ', response);
      setChangeCount(prevChangeCount => prevChangeCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfoData = async () => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const tokenData = { 'x-access-token': idToken };
      const response = await axios.get(`${USER_API}/users/${budyId}/profile`, {
        headers: tokenData
      });
      const { own, user, img, follow } = response.data.result;
      setUserInfo({ own, user, img, follow });
      setIdToken(idToken);

      if (!userInfo.img)
        setUserInfo(prevState => ({ ...prevState, img: photoURL }));
      console.log(
        '::MyPage getUserInfoData response.data.result::',
        response.data.result
      );
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
  const followUser = async (index, followState, userId, toggleFollow) => {
    try {
      const response = await axios({
        method: followState === 1 ? 'DELETE' : 'POST',
        url: `${USER_API}/users/follow`,
        data: { budyId: userId },
        headers: { 'x-access-token': idToken }
      });

      if (response.data.success) {
        toggleFollow(index);
        setChangeCount(prevChangeCount => prevChangeCount + 1);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: addSocialLink / removeSocialLink check
  /**
   *
   * @param {string} socialLink
   */
  const addSocialLink = async socialLink => {
    try {
      const tokenData = { 'x-access-token': idToken };
      const data = { url: socialLink };
      await axios.post(`${USER_API}/users/me/urls`, data, {
        headers: tokenData
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param {string} urlId
   */
  const removeSocialLink = async urlId => {
    try {
      const tokenData = { 'x-access-token': idToken };
      await axios.delete(`${USER_API}/users/me/urls/${urlId}`, {
        headers: tokenData
      });
    } catch (error) {
      console.error(error);
    }
  };

  const myPageChangeCount = () => {
    setChangeCount(prevChangeCount => prevChangeCount + 1);
  };

  useEffect(() => {
    if (moveAdditionalInfo(authentication, budyId, history)) getUserInfoData();
  }, [changeCount]);

  return (
    <>
      {idToken && (
        <MyPageForm
          userInfo={userInfo}
          budyId={budyId}
          idToken={idToken}
          addSocialLink={addSocialLink}
          removeSocialLink={removeSocialLink}
          onChangeSetProfile={onChangeSetProfile}
          followUser={followUser}
          submitImageData={submitImageData}
          myPageChangeCount={myPageChangeCount}
        />
      )}
    </>
  );
}
