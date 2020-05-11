import React, { useState, useContext } from 'react';
import ChangePasswordForm from '../../Presenter/Pages/ChangePassword/ChangePasswordForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import AppContext from '../../App/context';
import passwordSecurityGrade from '../../Service/security';
import { passwordSchema } from '../../Service/validate';

const changePasswordInitState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const validateInitState = {
  newPasswordValidity: null,
  confirmPasswordValidity: null,
  newPasswordMessage: '8 to 15 characters include letters and numbers.',
  confirmPasswordMessage: ''
};

const securityGradeInitState = { grade: '' };

const ChangePassword = ({ history }) => {
  const [form, setForm] = useState(changePasswordInitState);
  const [test, setTest] = useState(validateInitState);
  const [grade, setGrade] = useState(securityGradeInitState);
  const [errorMessage, setErrorMessage] = useState('');
  const [appState] = useContext(AppContext);
  const { email } = appState.user;

  const onSubmitChangePassword = async () => {
    if (!test.confirmPasswordValidity) confirmPasswordFormatCheck();
    if (!test.newPasswordValidity) newPasswordFormatCheck();
    if (
      test.newPasswordValidity &&
      test.confirmPasswordValidity &&
      form.currentPassword.length !== 0
    ) {
      try {
        const credential = await firebase.auth.EmailAuthProvider.credential(
          email,
          form.currentPassword
        );
        const currentUser = firebase.auth().currentUser;
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.updatePassword(form.newPassword);
        history.push('/');
      } catch (error) {
        // TODO: Error Handling
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
              'Too many unsuccessful password change attempts. Please try again later.'
            );
            break;
          default:
            console.log('UNKNOWN');
            break;
        }
      }
    } else {
      throw new Error();
    }
  };

  const newPasswordFormatCheck = () => {
    const checkedPassword = passwordSchema.validate(form.newPassword);
    if (checkedPassword) {
      setTest(prevState => ({
        ...prevState,
        newPasswordValidity: true,
        newPasswordMessage: '8 to 15 characters include letters and numbers.'
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        newPasswordValidity: false,
        newPasswordMessage: 'Must be 8 characters or longer.'
      }));
      return false;
    }
  };

  const confirmPasswordFormatCheck = () => {
    if (form.confirmPassword.length < 8) {
      setTest(prevState => ({
        ...prevState,
        confirmPasswordValidity: false,
        confirmPasswordMessage: 'Must be 8 characters or longer.'
      }));
      return false;
    } else if (form.newPassword === form.confirmPassword) {
      setTest(prevState => ({
        ...prevState,
        confirmPasswordValidity: true,
        confirmPasswordMessage: ''
      }));
      return null;
    } else {
      setTest(prevState => ({
        ...prevState,
        confirmPasswordValidity: false,
        confirmPasswordMessage: 'Password is Incorrect.'
      }));
      return false;
    }
  };

  const onChangeNewPassword = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    const securityLevel = passwordSecurityGrade(e.target.value);
    if (securityLevel === 1) {
      setGrade({ grade: 'Weak' });
    } else if (securityLevel === 2) {
      setGrade({ grade: 'Good' });
    } else if (securityLevel === 3) {
      setGrade({ grade: 'Strong' });
    }
  };

  const onChangeConfirmPassword = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const moveHome = e => {
    e.stopPropagation();
    history.push('/');
  };

  return (
    <ChangePasswordForm
      moveHome={moveHome}
      passwordState={form}
      validateState={test}
      gradeState={grade.grade}
      onChangeNewPassword={onChangeNewPassword}
      onChangeConfirmPassword={onChangeConfirmPassword}
      onClickSubmit={onSubmitChangePassword}
      onBlurNewPassword={newPasswordFormatCheck}
      onBlurConfirmPassword={confirmPasswordFormatCheck}
      newPasswordMessage={test.newPasswordMessage}
      confirmPasswordMessage={test.confirmPasswordMessage}
      errorMessage={errorMessage}
    />
  );
};

export default withRouter(ChangePassword);
