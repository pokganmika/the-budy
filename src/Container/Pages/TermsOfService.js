import React from 'react';
import TermsOfServiceForm from '../../Presenter/Pages/TermsOfService/TermsOfServiceForm';

const TermsOfService = ({ history }) => {
  const moveAskPage = () => history.push('/ask-to-budy');
  return <TermsOfServiceForm moveAskPage={moveAskPage} />;
};

export default TermsOfService;
