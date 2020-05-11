import React, { useState, useContext } from 'react';
import SignupDetailEmailForm from '../../Presenter/Pages/SignupDetailEmail/SignupDetailEmailForm';
import AppContext from '../../App/context';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import { USER_API } from '../../Config/api';
// import getLocation from "../../Service/location";
import passwordSecurityGrade from '../../Service/security';
import OAuthService from '../../Service/OAuth';
import {
  emailSchema,
  passwordSchema,
  // usernameSchema,
  budyIdSchema,
} from '../../Service/validate';
// import getInitialProfileImage from '../../Common/Functions/getInitialProfileImage';

const signupInitState = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  budyId: '',
};

const validateInitState = {
  emailValidity: null,
  passwordValidity: null,
  confirmPasswordValidity: null,
  usernameValidity: null,
  budyIdValidity: null,

  emailMessage: '',
  passwordMessage: '8 to 15 chracters include letters and numbers.',
  confirmPasswordMessage: '',
  usernameMessage: '',
  budyIdMessage: 'Only letters, numbers or underscores.',
};

const securityInitGrade = { grade: '' };

const SignupDetailEmail = ({ history }) => {
  const [form, setForm] = useState(signupInitState);
  const [test, setTest] = useState(validateInitState);
  const [grade, setGrade] = useState(securityInitGrade);
  const [appState, appDispatch] = useContext(AppContext);

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
        console.log(
          '::SignupDetailEmail OAuth response check:: ---> : ',
          response
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
            emailVerified: firebaseData.emailVerified,
          },
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

  const registUser = async e => {
    e.preventDefault();
    try {
      if (!test.budyIdValidity) budyIdFormatCheck();
      if (!test.usernameValidity) usernameFormatCheck();
      if (!test.confirmPasswordValidity) confirmPasswordFormatCheck();
      if (!test.passwordValidity) passwordFormatCheck();
      if (!test.emailValidity) emailFormatCheck();
      if (
        test.emailValidity &&
        test.passwordValidity &&
        test.confirmPasswordValidity &&
        test.usernameValidity &&
        test.budyIdValidity
      ) {
        const firebaseResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(form.email, form.password);

        // TODO: 인증 메일 발송 코드
        await firebase.auth().currentUser.sendEmailVerification();

        // TODO: location
        // const locationResult = await getLocation();
        const firebaseProviderData = firebaseResult.user.providerData[0];
        const firebaseData = {
          providerData: {
            displayName: firebaseProviderData.displayName,
            email: firebaseProviderData.email,
            phoneNumber: firebaseProviderData.phoneNumber,
            // photoURL: getInitialProfileImage(form.username),
            // photoURL: firebaseProviderData.photoURL,
            providerId: firebaseProviderData.providerId,
            uid: firebaseResult.user.uid,
          },
          metadata: {
            creationTime: Number(firebaseResult.user.metadata.a),
            lastSignInTime: Number(firebaseResult.user.metadata.b),
          },
          locationData: {
            altitude: null,
            latitude: null,
            longitude: null,
            // altitude: locationResult.coords.altitude,
            // latitude: locationResult.coords.latitude,
            // longitude: locationResult.coords.longitude
          },
          BudyId: form.budyId,
        };
        firebaseData.providerData.displayName = form.username;
        const tokenData = { 'x-access-token': firebaseResult.user.b.b };
        const response = await axios.post(`${USER_API}/users`, firebaseData, {
          headers: tokenData,
        });

        console.log(
          '::SignupDetailEmail registUser response check:: ---> : ',
          response
        );

        await firebase.auth().signOut();
        history.push('/verify-email');
      }
    } catch (error) {
      // TODO: Error Handling
      console.error(error);
    }
  };

  const emailFormatCheck = async () => {
    const checkedEmail = emailSchema(form.email);
    if (checkedEmail) {
      try {
        const firebaseResult = await firebase
          .auth()
          .fetchSignInMethodsForEmail(form.email);
        if (firebaseResult.length !== 0) {
          setTest(prevState => ({
            ...prevState,
            emailValidity: false,
            emailMessage:
              'The email address is already in use by another account.',
          }));
          return false;
          // return new Promise(resolve => resolve(false));
        } else {
          setTest(prevState => ({
            ...prevState,
            emailValidity: true,
            emailMessage: '',
          }));
          return null;
          // return new Promise(resolve => resolve(null));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setTest(prevState => ({
        ...prevState,
        emailValidity: false,
        emailMessage: 'Please check your Email format.',
      }));
      return false;
      // return new Promise(resolve => resolve(false));
    }
  };

  const passwordFormatCheck = () => {
    const checkedPassword = passwordSchema.validate(form.password);
    if (checkedPassword) {
      setTest(prevState => ({
        ...prevState,
        passwordValidity: true,
        passwordMessage: '8 to 15 characters include letters and numbers.',
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        passwordValidity: false,
        passwordMessage: 'Must be 8 characters or longer.',
      }));
      return false;
    }
  };

  const confirmPasswordFormatCheck = () => {
    if (form.confirmPassword.length === 0) {
      setTest(prevState => ({
        ...prevState,
        confirmPasswordValidity: false,
        confirmPasswordMessage: 'Must be 8 characters or longer.',
      }));
      return false;
    } else if (form.password === form.confirmPassword) {
      setTest(prevState => ({
        ...prevState,
        confirmPasswordValidity: true,
        confirmPasswordMessage: '',
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        confirmPasswordValidity: false,
        confirmPasswordMessage: 'Password is Incorrect.',
      }));
      return false;
    }
  };

  const usernameFormatCheck = () => {
    if (form.username.length > 3) {
      setTest(prevState => ({
        ...prevState,
        usernameValidity: true,
        usernameMessage: '',
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        usernameValidity: false,
        usernameMessage: 'Must be 4 characters or longer.',
      }));
      return false;
    }
  };

  const budyIdFormatCheck = async () => {
    if (form.budyId.length > 3) {
      if (form.budyId.includes(' ')) {
        setTest({
          ...test,
          budyIdValidity: false,
          budyIdMessage: "Budy ID can't have spaces.",
        });
        return false;
      }

      if (!budyIdSchema.validate(form.budyId)) {
        setTest({
          ...test,
          budyIdValidity: false,
          budyIdMessage: 'only letters, numbers or underscores.',
        });
      }

      const result = await axios.get(
        `${USER_API}/users/_checkBudyID/${form.budyId}`
      );

      if (!result.data.result) {
        setTest(prevState => ({
          ...prevState,
          budyIdValidity: false,
          budyIdMessage: 'This Budy ID is already exist.',
        }));
        return false;
      } else {
        setTest(prevState => ({
          ...prevState,
          budyIdValidity: true,
          budyIdMessage: 'Only letters, numbers or underscores.',
        }));
        return null;
      }
    } else {
      setTest(prevState => ({
        ...prevState,
        budyIdValidity: false,
        budyIdMessage: 'Must be 4 characters or longer.',
      }));
      return false;
    }
  };

  const onChangeTestForm = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    const securityLevel = passwordSecurityGrade(e.target.value);
    if (securityLevel === 1) {
      setGrade({ grade: 'Weak' });
    } else if (securityLevel === 2) {
      setGrade({ grade: 'Good' });
    } else if (securityLevel > 3) {
      setGrade({ grade: 'Strong' });
    }
  };

  const onChangeForm = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const moveHome = () => {
    history.push('/');
  };

  return (
    <SignupDetailEmailForm
      signupState={form}
      validateState={test}
      securityGrade={grade.grade}
      onChangeForm={onChangeForm}
      onChangeTestForm={onChangeTestForm}
      onClickButton={registUser}
      OAuth={OAuth}
      onBlurTestEmail={emailFormatCheck}
      onBlurTestPassword={passwordFormatCheck}
      onBlurTestConfirmPassword={confirmPasswordFormatCheck}
      onBlurTestUsername={usernameFormatCheck}
      onBlurTestBudyId={budyIdFormatCheck}
      emailMessage={test.emailMessage}
      passwordMessage={test.passwordMessage}
      confirmPasswordMessage={test.confirmPasswordMessage}
      usernameMessage={test.usernameMessage}
      budyIdMessage={test.budyIdMessage}
      moveHome={moveHome}
    />
  );
};

export default withRouter(SignupDetailEmail);
