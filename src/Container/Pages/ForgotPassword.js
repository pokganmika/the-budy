import React, { useState } from 'react';
import ForgotPasswordForm from '../../Presenter/Pages/ForgotPassword/ForgotPasswordForm';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { emailSchema } from '../../Service/validate';

const forgotPasswordInitState = { email: '' };
const validateInitState = {
  emailValidity: null,
  message: ''
};

const ForgotPassword = ({ history }) => {
  const [form, setForm] = useState(forgotPasswordInitState);
  const [test, setTest] = useState(validateInitState);
  const submitForgotPassword = async () => {
    if (test.emailValidity) {
      try {
        await firebase.auth().sendPasswordResetEmail(form.email);
        /**
         * TODO: modal?
         */
        history.push('/login');
      } catch (error) {
        // TODO: Error Handling
        console.error(error);
      }
    } else {
      emailFormatCheck();
    }
  };

  const emailFormatCheck = async () => {
    const checkedEmail = emailSchema(form.email);
    if (checkedEmail) {
      try {
        const result = await firebase
          .auth()
          .fetchSignInMethodsForEmail(form.email);
        if (result.length !== 0) {
          setTest({
            ...test,
            emailValidity: true,
            message: ''
          });
          return null;
        } else {
          setTest({
            ...test,
            emailValidity: false,
            message: 'No account for this Email.'
          });
          return false;
        }
      } catch (error) {
        // TODO: Error Handling
        console.error(error);
      }
    } else {
      setTest({
        ...test,
        emailValidity: false,
        message: 'Please check your Email format.'
      });
      return false;
    }
  };

  const onChangeEmail = e => {
    setForm({ ...setForm, [e.target.name]: e.target.value });
  };

  const moveHome = e => {
    e.stopPropagation();
    history.push('/');
  };

  return (
    <ForgotPasswordForm
      moveHome={moveHome}
      passwordState={form}
      validateState={test}
      onChangeEmail={onChangeEmail}
      onClickSubmit={submitForgotPassword}
      onBlurTest={emailFormatCheck}
      message={test.message}
    />
  );
};

export default withRouter(ForgotPassword);
