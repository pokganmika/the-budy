import React from 'react';
import VerifyEmailForm from '../../Presenter/Pages/VerifyEmail/VerifyEmailForm';
import { withRouter } from 'react-router-dom';

const VerifyEmail = ({ history }) => {
  const backToLogin = () => {
    history.push('/login');
  };

  const moveHome = () => {
    history.push('/');
  };

  return <VerifyEmailForm moveHome={moveHome} onClickButton={backToLogin} />;
};

export default withRouter(VerifyEmail);
