import React from 'react';
import PrivacyPolicyForm from '../../Presenter/Pages/PrivacyPolicy/PrivacyPolicyForm';
import styled from 'styled-components';

const Container = styled.div`
  border: solid 1px blue;
`;

const PrivacyPolicy = () => {

  return (
    <Container>
      <PrivacyPolicyForm />
    </Container>
  );
}

export default PrivacyPolicy;
