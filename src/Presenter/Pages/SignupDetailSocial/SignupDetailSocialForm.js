import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from '../../../Images/budy_Wordmark.svg';
import UsernameInput from '../../../Common/Collections/TextFields/UsernameInput';
import BudyIdInput from '../../../Common/Collections/TextFields/BudyIdInput';
import { PrimaryBtn as CreateAccountButton } from '../../../Common/Elements/Buttons/SolidButton';
import ServiceLink from '../../../Common/Collections/TextFields/ServiceLink';
import {
  Main,
  Container,
  Title,
  Message
} from '../../../Service/styles/Password';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 504px;
  height: auto;
  background-color: #ffffff;
  padding: 0 40px;
  margin: 160px;
  margin-bottom: 400px;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 16px;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
`;

/**
 *
 * @param {object} signupState
 * @param {object} validateState
 * @param {function} onChangeForm
 * @param {function} onClickButton
 * @param {function} onBlurTestUsername
 * @param {function} onBlurTestBudyId
 * @param {string} usernameMessage
 * @param {string} budyIdMessage
 */
const SignupDetailSocialForm = ({
  signupState,
  validateState,
  onChangeForm,
  onClickButton,
  onBlurTestUsername,
  onBlurTestBudyId,
  usernameMessage,
  budyIdMessage
}) => {
  return (
    <Main>
      <Container>
        <div className="logo-wrapper">
          <img className="logo-header" src={Logo} alt="Logo" height="23px" />
        </div>

        <Wrapper>
          <Title>Almost done!</Title>

          <Message>
            Now, Pick your user name
            <br />
            and create a unique Budy ID.
          </Message>

          <FormWrapper>
            <UsernameInput
              placeholder=" "
              value={signupState.username}
              validateState={validateState}
              onChange={onChangeForm}
              onBlur={onBlurTestUsername}
              message={usernameMessage}
              marginBottom="8px"
            />
            <BudyIdInput
              placeholder=" "
              value={signupState.budyId}
              validateState={validateState}
              onChange={onChangeForm}
              onBlur={onBlurTestBudyId}
              message={budyIdMessage}
              marginBottom="16px"
            />

            <CreateAccountButton
              text="Create Account"
              width="100%"
              state={
                validateState.usernameValidity && validateState.budyIdValidity
                  ? 'pressed'
                  : 'disabled'
              }
              onClick={onClickButton}
            />
          </FormWrapper>

          <ServiceLink marginBottom="40px" />
        </Wrapper>
      </Container>
    </Main>
  );
};

SignupDetailSocialForm.propTypes = {
  signupState: PropTypes.object.isRequired,
  validateState: PropTypes.object.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
  onBlurTestUsername: PropTypes.func.isRequired,
  onBlurTestBudyId: PropTypes.func.isRequired,
  usernameMessage: PropTypes.string.isRequired,
  budyIdMessage: PropTypes.string.isRequired
};

export default SignupDetailSocialForm;
