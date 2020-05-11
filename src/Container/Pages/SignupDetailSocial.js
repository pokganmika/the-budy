import React, { useState, useContext } from 'react';
import AppContext from '../../App/context';
import SignupDetailSocialForm from '../../Presenter/Pages/SignupDetailSocial/SignupDetailSocialForm';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import { USER_API } from '../../Config/api';
import { budyIdSchema } from '../../Service/validate';

import getInitialProfileImage from '../../Common/Functions/getInitialProfileImage';

const signupInitState = {
  username: '',
  budyId: '',
};

const validateInitState = {
  usernameValidity: null,
  budyIdValidity: null,
  usernameMessage: '',
  budyIdMessage: 'Only letters, numbers or underscores.',
};

const SignupDetailSocial = ({ history }) => {
  const [form, setForm] = useState(signupInitState);
  const [test, setTest] = useState(validateInitState);
  const [_, appDispatch] = useContext(AppContext);

  const onSubmitButton = async e => {
    e.preventDefault();
    try {
      if (!test.budyIdValidity) budyIdFormatCheck();
      if (!test.usernameValidity) usernameFormatCheck();

      if (test.usernameValidity && test.budyIdValidity) {
        /**
         * TODO:
         * localStorage 사용 고려
         */
        const data = {
          DisplayName: form.username,
          BudyId: form.budyId,
        };
        const idToken = await firebase.auth().currentUser.getIdToken();
        const displayName = await firebase.auth().currentUser.displayName;
        const tokenData = { 'x-access-token': idToken };
        const updateResult = await axios.patch(`${USER_API}/users`, data, {
          headers: tokenData,
        });
        console.log(
          '::Signup detail server data check:: ---> : ',
          updateResult
        );
        if (updateResult.data.success) {
          appDispatch({
            type: 'SET_USER',
            payload: {
              authentication: true,
              displayName: form.username,
              email: '',
              uid: '',
              photoURL: { small: getInitialProfileImage(displayName) },
              budyId: form.budyId,
              emailVerified: true,
            },
          });
          history.push('/');
        }

        /**
         * TODO:
         * 가입이 되지 않을 경우 고려
         *
         */
      }
    } catch (error) {
      console.error(error);
    }
  };

  const usernameFormatCheck = () => {
    if (form.username.length > 3) {
      setTest({
        ...test,
        usernameValidity: true,
        usernameMessage: '',
      });
      return null;
    } else {
      setTest({
        ...test,
        usernameValidity: false,
        usernameMessage: 'Must be 4 characters or longer.',
      });
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
        return false;
      }

      const result = await axios.get(
        `${USER_API}/users/_checkBudyID/${form.budyId}`
      );

      console.log('budyid format check : ', result);
      if (!result.data.result) {
        setTest({
          ...test,
          budyIdValidity: false,
          budyIdMessage: 'This Budy ID is already exist.',
        });
        return false;
      } else {
        setTest({
          ...test,
          budyIdValidity: true,
          budyIdMessage: 'Only letters, numbers or underscores.',
        });
        return null;
      }
    } else {
      setTest({
        ...test,
        budyIdValidity: false,
        budyIdMessage: 'Must be 4 characters or longer.',
      });
      return false;
    }
  };

  const onChangeForm = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <SignupDetailSocialForm
      signupState={form}
      validateState={test}
      onChangeForm={onChangeForm}
      onClickButton={onSubmitButton}
      onBlurTestUsername={usernameFormatCheck}
      onBlurTestBudyId={budyIdFormatCheck}
      usernameMessage={test.usernameMessage}
      budyIdMessage={test.budyIdMessage}
    />
  );
};

export default withRouter(SignupDetailSocial);
