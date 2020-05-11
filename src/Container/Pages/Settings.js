import React, { useState, useEffect, useContext } from 'react';
import SettingsForm from '../../Presenter/Pages/Settings/SettingsForm';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import { USER_API } from '../../Config/api';
import { facebook, google } from '../../Config/firebase';
import AppContext from '../../App/context';
import moveAdditionalInfo from '../../Service/checkBudyId';

const settingsInitState = {
  notiOnOff: false,
  comments: false,
  answer: false,
  question: false,
  following: false
};

/**
 * notiOnOff value issue -> !value (request backend)
 *
 * if notiOnOff === false:
 *  noti (X)
 * elif notiOnOff === true:
 *  noti (O)
 */
function Settings({ history }) {
  const [notification, setNotification] = useState(settingsInitState);
  const [idToken, setIdToken] = useState('');
  const [providerId, setProviderId] = useState('');
  const [loading, setLoading] = useState(true);
  const [initState, setInitState] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [appState] = useContext(AppContext);
  const { authentication, budyId, email } = appState.user;

  const getSettingsData = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      const idToken = await currentUser.getIdToken();
      const providerId = await currentUser.providerData[0].providerId;
      const response = await axios({
        method: 'GET',
        url: `${USER_API}/users/settings`,
        headers: { 'x-access-token': idToken }
      });
      const data = response.data.result.notification;
      setNotification(prevState => ({
        ...prevState,
        notiOnOff: !data.notiOnOff,
        comments: data.comments,
        answer: data.answer,
        question: data.question,
        following: data.following
      }));
      setIdToken(idToken);
      setProviderId(providerId);
      setLoading(false);
      setInitState(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeNotificationCheckBox = e => {
    setNotification({ ...notification, [e.target.name]: e.target.checked });
  };

  const submitNotificationData = async () => {
    try {
      const headers = { 'x-access-token': idToken };
      const data = {
        notiOnOff: !notification.notiOnOff,
        comments: notification.comments,
        answer: notification.answer,
        question: notification.question,
        following: notification.following
      };
      console.log(
        '::Settings submitNotificationData data check:: ---> : ',
        data
      );
      const response = await axios({
        method: 'PATCH',
        url: `${USER_API}/users/settings`,
        data,
        headers
      });
      if (!response.data.success) throw new Error();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const userData = await firebase.auth().currentUser;
      // const tokenData = { x-access-token: userData.b.b };
      console.log('::Settings deleteUser check:: ---> : ', userData);
      await firebase.auth().currentUser.delete();
      // const result = await axios.delete(`${USER_API}/users`, { headers: tokenData });
      // console.log('::Delete user confirm:: ---> : ', result);

      /**
       *
       * TODO: SERVER_CHECK
       *
       * SUCCESS
       * result.data.success === true
       * result.data.result === 1
       * result.data.message === '탈퇴성공'
       * result.status === 200
       * result.statusText === 'OK'
       *
       * FAILED
       * result.status === 400 (?)
       *
       *
       * TODO: PAGE_MOVE
       *
       * props.history.push('/') || props.history.push('/delete-user-success')
       *
       */
    } catch (error) {
      // console.log('check : ', error.code)
      console.error(error);

      /**
       *
       * TODO:
       * {
       *   code: "auth/requires-recent-login",
       *   message: "This operation is sensitive and requires recent authentication.
       *    Log in again before retrying this request."
       * }
       *
       */

      // if (error.code === 'auth/requires-recent-login') {
      //   history.push('/login');
      // }
    }
  };

  const onChangeDeletePassword = e => {
    setPassword(e.target.value);
  };

  const deleteSocialUser = async () => {
    try {
      let provider;
      if (providerId === 'google.com') {
        provider = google;
      } else if (providerId === 'facebook.com') {
        provider = facebook;
      }
      const currentUser = firebase.auth().currentUser;
      await currentUser.reauthenticateWithPopup(provider);
      await currentUser.delete();
      await axios({
        method: 'DELETE',
        url: `${USER_API}/users`,
        headers: { 'x-access-token': idToken }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deletePasswordUser = async () => {
    try {
      console.log('DELETE PASSWORD USER');
      const credential = await firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      const currentUser = firebase.auth().currentUser;
      await currentUser.reauthenticateWithCredential(credential);
      await currentUser.delete();
      const response = await axios({
        method: 'DELETE',
        url: `${USER_API}/users`,
        headers: { 'x-access-token': idToken }
      });
      console.log('::Settings password delete server response::', response);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 'auth/wrong-password':
          setErrorMessage(error.message);
          // setErrorMessage(
          //   'The password is invalid or the user does not have a password.'
          // );
          break;
        case 'auth/too-many-requests':
          // setErrorMessage(error.message);
          setErrorMessage(
            'Too many unsuccessful delete attempts. Please try again later.'
          );
          break;
        default:
          console.log('UNKNOWN');
          break;
      }
    }
  };

  useEffect(() => {
    if (moveAdditionalInfo(authentication, budyId, history)) {
      !initState ? getSettingsData() : submitNotificationData();
    }
  }, [notification]);

  return (
    <>
      {!loading && (
        <SettingsForm
          idToken={idToken}
          providerId={providerId}
          notification={notification}
          onChangeNotificationCheckBox={onChangeNotificationCheckBox}
          submitNotificationData={submitNotificationData}
          deleteInputPassword={password}
          errorMessage={errorMessage}
          onChangeDeletePassword={onChangeDeletePassword}
          deleteSocialUser={deleteSocialUser}
          deletePasswordUser={deletePasswordUser}
        />
      )}
    </>
  );
}

export default withRouter(Settings);
