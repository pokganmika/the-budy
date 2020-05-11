import React, { useState, useEffect, useContext } from 'react';
import EditProfileForm from './EditProfileForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import { USER_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';
// import {
//   usernameSchema,
//   budyIdSchema,
//   shortBioSchema
// } from '../../Service/validate';

/**
 * TODO: get user data
 * i) global store (?)
 * ii) request server (?) -> NEED setState()
 */
const EditProfileInitState = {
  accountEmail: '',
  username: '',
  budyId: '',
  shortBio: ''
};

const validateInitState = {
  emailValidity: null,
  usernameValidity: null,
  budyIdValidity: null,

  // emailMessage: '',
  usernameMessage: '',
  budyIdMessage: 'Only letters, numbers or underscores.'
};

function EditProfile({
  history,
  userData,
  imageData,
  onChangeSetProfile,
  submitImageData
}) {
  const [profile, setProfile] = useState(EditProfileInitState);
  const [test, setTest] = useState(validateInitState);
  const [appState, appDispatch] = useContext(AppContext);
  const { authentication, email, uid, photoURL, emailVerified } = appState.user;

  const accountEmailInit = () => {
    setProfile(prevState => ({
      ...prevState,
      accountEmail: userData.Email,
      username: userData.DisplayName,
      budyId: userData.BudyId,
      shortBio: userData.AboutMe
    }));
  };

  const onSubmitModifiedUserData = async e => {
    e.preventDefault();
    try {
      if (
        usernameFormatCheck() === null &&
        (await budyIdFormatCheck()) === null &&
        profile.shortBio.length <= 200
      ) {
        const data = {
          BudyId: profile.budyId,
          DisplayName: profile.username,
          AboutMe: profile.shortBio
        };
        const idToken = await firebase.auth().currentUser.getIdToken();
        const tokenData = { 'x-access-token': idToken };
        const response = await axios.patch(`${USER_API}/users`, data, {
          headers: tokenData
        });
        if (response.data.success) {
          onChangeSetProfile({
            budyId: profile.budyId,
            username: profile.username,
            shortBio: profile.shortBio
          });
          appDispatch({
            type: 'SET_USER',
            payload: {
              authentication,
              email,
              uid,
              photoURL,
              displayName: profile.username,
              budyId: profile.budyId,
              emailVerified
            }
          });
          history.push('/mypage/profile');
        }
        // if (result.data.success) {
        //   history.push('/mypage/profile');
        // } else {
        //   history.push('/mypage/edit-profile');
        // }
      } else {
        throw new Error();
      }
    } catch (error) {
      // TODO: Error Handling
      console.error(error);
    }
  };

  const usernameFormatCheck = () => {
    if (userData.DisplayName === profile.username) {
      setTest(prevState => ({
        ...prevState,
        usernameValidity: true,
        usernameMessage: ''
      }));
      return null;
    }

    if (profile.username.length > 3) {
      setTest(prevState => ({
        ...prevState,
        usernameValidity: true,
        usernameMessage: ''
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        usernameValidity: false,
        usernameMessage: 'Must be 4 characters or longer.'
      }));
      return false;
    }
  };

  const budyIdFormatCheck = async () => {
    if (userData.BudyId === profile.budyId) {
      setTest(prevState => ({
        ...prevState,
        budyIdValidity: true,
        budyIdMessage: 'Only letters, numbers or underscores.'
      }));
      return null;
    }

    if (profile.budyId.length > 3) {
      if (profile.budyId.includes(' ')) {
        setTest(prevState => ({
          prevState,
          budyIdValidity: false,
          budyIdMessage: "Budy ID can't have spaces."
        }));
        return false;
      }

      const response = await axios.get(
        `${USER_API}/users/_checkBudyID/${profile.budyId}`
      );

      if (!response.data.result) {
        setTest(prevState => ({
          ...prevState,
          budyIdValidity: false,
          budyIdMessage: 'This Budy ID is already exist.'
        }));
        return false;
      } else {
        setTest(prevState => ({
          ...prevState,
          budyIdValidity: true,
          budyIdMessage: 'Only letters, numbers or underscores.'
        }));
        return null;
      }
    } else {
      setTest(prevState => ({
        ...prevState,
        budyIdValidity: false,
        budyIdMessage: 'Must be 4 characters or longer.'
      }));
      return false;
    }
  };

  const onChangeProfile = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const movePage = path => {
    history.push(`/mypage/${path}`);
  };

  /**
   * TODO: Get User data
   * is NOT login -> login page OR 404 page
   */
  useEffect(() => {
    accountEmailInit();
  }, []);

  return (
    <EditProfileForm
      profileState={profile}
      validateState={test}
      profileImage={imageData}
      onChangeProfile={onChangeProfile}
      onSubmitModifiedUserData={onSubmitModifiedUserData}
      onBlurTestUsername={usernameFormatCheck}
      onBlurTestBudyId={budyIdFormatCheck}
      usernameMessage={test.usernameMessage}
      budyIdMessage={test.budyIdMessage}
      submitImageData={submitImageData}
      movePage={movePage}
    />
  );
}

export default withRouter(EditProfile);
