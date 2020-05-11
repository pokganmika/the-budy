import React, { useState, useContext } from 'react';
import LoginForm from '../../Presenter/Pages/Login/LoginForm';
import AppContext from '../../App/context';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import { USER_API } from '../../Config/api';
// import getLocation, { getLocationAgree } from "../../Service/location";
import { emailSchema } from '../../Service/validate';
import OAuthService from '../../Service/OAuth';

const loginInitState = {
  email: '',
  password: ''
};

const validateInitState = {
  emailValidity: null,
  emailMessage: '',
  // passwordMessage: '',

  validityOn: false
};

function Login({ history }) {
  const [form, setForm] = useState(loginInitState);
  const [test, setTest] = useState(validateInitState);
  const [_, appDispatch] = useContext(AppContext);

  const OAuth = provider => {
    return async e => {
      e.preventDefault();
      try {
        const firebaseData = await OAuthService(provider);
        const idToken = await firebase.auth().currentUser.getIdToken();
        const tokenData = { 'x-access-token': idToken };
        const response = await axios.post(
          `${USER_API}/users/_sns`,
          firebaseData,
          { headers: tokenData }
        );

        appDispatch({
          type: 'SET_USER',
          payload: {
            authentication: true,
            displayName: firebaseData.providerData.displayName,
            email: firebaseData.providerData.email,
            uid: firebaseData.providerData.uid,
            photoURL: response.data.img,
            budyId: response.data.budyId,
            emailVerified: firebaseData.emailVerified
          }
        });

        if (!response.data.budyId) {
          history.push('/signup/social');
        } else if (response.data.budyId) {
          history.push('/');
        }
      } catch (error) {
        // TODO: Error Handling
        console.error(error);
      }
    };
  };

  const getLogin = async () => {
    try {
      const firebaseResult = await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password);
      console.log(
        '::email signin firebaseResult:: ---> : ',
        firebaseResult.user
      );
      // TODO: ADD email verification code

      // TODO: location
      // const locationResult = await getLocation();
      // const {
      //   coords: { altitude, latitude, longitude }
      // } = locationResult;
      // const data = { altitude, latitude, longitude };
      const data = { altitude: null, latitude: null, longitude: null };
      data.lastSignInTime = parseInt(firebaseResult.user.metadata.b);
      const idToken = await firebaseResult.user.getIdToken();
      const tokenData = { 'x-access-token': idToken };
      const result = await axios.post(`${USER_API}/users/_login`, data, {
        headers: tokenData
      });
      console.log('::email signin result:: ---> : ', result);

      if (result.data.result === 'login') {
        history.push('/');
        /**
         * TODO: globalStore / path
         * history.push('/')
         * user info -> globalStore
         */
      }
    } catch (error) {
      console.error(error);
      // if (error.code === 'auth/invalid-email') {
      //   setTest(prevState => ({ ...prevState, emailMessage: error.message }));
      // } else if (error.code === 'auth/user-not-found') {
      //   setTest(prevState => ({ ...prevState, emailMessage: error.message }));
      // } else if (error.code === 'auth/wrong-password') {
      //   setTest(prevState => ({ ...prevState, passwordMessage: error.message }));
      // }
      setTest(prevState => ({
        ...prevState,
        validityOn: true
      }));
    }
  };

  const emailFormatCheck = async () => {
    const checkedEmail = emailSchema(form.email);
    if (checkedEmail) {
      setTest(prevState => ({
        ...prevState,
        emailValidity: true,
        emailMessage: ''
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        emailValidity: false,
        emailMessage: 'Please check your Email format.'
      }));
      return false;
    }
  };

  const onChangeForm = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const moveHome = e => {
    e.stopPropagation();
    history.push('/');
  };

  // useEffect(() => { getLocationAgree() }, []);

  return (
    <LoginForm
      loginState={form}
      validateState={test}
      onChangeForm={onChangeForm}
      onClickButton={getLogin}
      OAuth={OAuth}
      onBlurTestEmail={emailFormatCheck}
      emailMessage={test.emailMessage}
      moveHome={moveHome}
    />
  );
}

export default withRouter(Login);
