import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { facebook, google } from '../../../Config/firebase';

// import Greeting from '../../../Common/Elements/Greeting';
import Logo from '../../../Images/budy_Wordmark.svg';
import EmailInput from '../../../Common/Collections/TextFields/EmailInput';
import PasswordInput from '../../../Common/Collections/TextFields/PasswordInput';
import ConfirmPasswordInput from '../../../Common/Collections/TextFields/ConfirmPasswordInput';
import UsernameInput from '../../../Common/Collections/TextFields/UsernameInput';
import BudyIdInput from '../../../Common/Collections/TextFields/BudyIdInput';
import { PrimaryBtn as ContinueButton } from '../../../Common/Elements/Buttons/SolidButton';
import FacebookButton from '../../../Common/Collections/Buttons/FacebookBtn';
import GoogleButton from '../../../Common/Collections/Buttons/GoogleBtn';
import ServiceLink from '../../../Common/Collections/TextFields/ServiceLink';
import { Divider } from '../../../Service/styles/Auth';
import {
  Main as DefaultMain,
  Container as DefaultContainer,
  Title,
  Icon
} from '../../../Service/styles/Password';
import { greyscales } from '../../../Common/Styles/Colors';
// import { ArrowIosBackOutline } from '@forefront-ux/react-eva-icons';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

// TODO: Change height issue - validate error

const Main = styled(DefaultMain)`
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled(DefaultContainer)`
  .logo-wrapper {
    .logo-header {
      @media (max-width: 530px) {
        display: none;
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 504px;
  height: auto;
  padding: 0 40px;
  margin: 120px;
  margin-bottom: 192px;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 16px;
  }
`;

const IconWrapper = styled(Link)`
  width: 100%;
  padding: 16px;
  @media (min-width: 531px) {
    display: none;
  }
`;

// const OAuthButtonWrapper = styled.form`
const OAuthButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LoginLink = styled.div`
  padding: 32px 79px;
  width: 394px;
  height: 84px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  .auth-link {
    margin-left: 5px;
    text-decoration: none;
    font-weight: 600;
    color: #008695;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
`;

/**
 * @param {object} signupState
 * @param {object} validateState
 * @param {string} securityGrade
 * @param {function} onChangeForm
 * @param {function} onChangeTestForm
 * @param {function} onClickButton
 * @param {function} OAuth
 * @param {function} onBlurTestEmail
 * @param {function} onBlurTestPassword
 * @param {function} onBlurTestConfirmPassword
 * @param {function} onBlurTestUsername
 * @param {function} onBlurTestBudyId
 * @param {string} emailMessage
 * @param {string} passwordMessage
 * @param {string} confirmPasswordMessage
 * @param {string} usernameMessage
 * @param {string} budyIdMessage
 * @param {function} moveHome
 */
const SignupDetailEmailForm = ({
  signupState,
  validateState,
  securityGrade,
  onChangeForm,
  onChangeTestForm,
  onClickButton,
  OAuth,
  onBlurTestEmail,
  onBlurTestPassword,
  onBlurTestConfirmPassword,
  onBlurTestUsername,
  onBlurTestBudyId,
  emailMessage,
  passwordMessage,
  confirmPasswordMessage,
  usernameMessage,
  budyIdMessage,
  moveHome
}) => {
  return (
    <Main>
      <Container>
        <div className="logo-wrapper">
          <img
            className="logo-header"
            src={Logo}
            alt="Logo"
            height="23px"
            onClick={moveHome}
          />

          <IconWrapper to="/signup">
            <Icon
              className="budy-chevron-left"
              size="24px"
              color={greyscales[900]}
            />
          </IconWrapper>
        </div>

        <Wrapper>
          <Title>Sign up with Email</Title>

          <FormWrapper>
            <EmailInput
              placeholder=" "
              name="email"
              value={signupState.email}
              validateState={validateState}
              onChange={onChangeForm}
              onBlur={onBlurTestEmail}
              message={emailMessage}
              marginBottom="8px"
            />
            <PasswordInput
              placeholder=" "
              label="Password"
              name="password"
              value={signupState.password}
              validateState={validateState}
              onChange={onChangeTestForm}
              onBlur={onBlurTestPassword}
              message={passwordMessage}
              securityGrade={securityGrade}
              marginBottom="8px"
            />
            <ConfirmPasswordInput
              placeholder=" "
              label="Confirm Password"
              name="confirmPassword"
              value={signupState.confirmPassword}
              validateState={validateState}
              onChange={onChangeForm}
              onBlur={onBlurTestConfirmPassword}
              message={confirmPasswordMessage}
              securityGrade={securityGrade}
              marginBottom="8px"
            />
            <UsernameInput
              placeholder=" "
              name="username"
              value={signupState.username}
              validateState={validateState}
              onChange={onChangeForm}
              onBlur={onBlurTestUsername}
              message={usernameMessage}
              marginBottom="8px"
            />
            <BudyIdInput
              placeholder=" "
              name="budyId"
              value={signupState.budyId}
              validateState={validateState}
              onChange={onChangeForm}
              onBlur={onBlurTestBudyId}
              message={budyIdMessage}
              marginBottom="8px"
            />

            <ContinueButton
              text="Continue"
              width="100%"
              state={
                validateState.emailValidity &&
                validateState.passwordValidity &&
                validateState.confirmPasswordValidity &&
                validateState.usernameValidity &&
                validateState.budyIdValidity
                  ? 'pressed'
                  : 'disabled'
              }
              onClick={onClickButton}
            />
          </FormWrapper>

          <Divider>Or</Divider>

          <OAuthButtonWrapper>
            <FacebookButton
              text="Facebook"
              width="200px"
              OAuth={OAuth(facebook)}
            />
            <GoogleButton text="Google" width="200px" OAuth={OAuth(google)} />
          </OAuthButtonWrapper>

          <ServiceLink />
          <LoginLink>
            Already Joined?
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </LoginLink>
        </Wrapper>
      </Container>
    </Main>
  );
};

SignupDetailEmailForm.propTypes = {
  signupState: PropTypes.object.isRequired,
  validateState: PropTypes.object.isRequired,
  securityGrade: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  onChangeTestForm: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
  OAuth: PropTypes.func.isRequired,
  onBlurTestEmail: PropTypes.func.isRequired,
  onBlurTestPassword: PropTypes.func.isRequired,
  onBlurTestConfirmPassword: PropTypes.func.isRequired,
  onBlurTestUsername: PropTypes.func.isRequired,
  onBlurTestBudyId: PropTypes.func.isRequired,
  emailMessage: PropTypes.string.isRequired,
  passwordMessage: PropTypes.string.isRequired,
  confirmPasswordMessage: PropTypes.string.isRequired,
  usernameMessage: PropTypes.string.isRequired,
  budyIdMessage: PropTypes.string.isRequired,
  moveHome: PropTypes.func.isRequired
};

export default SignupDetailEmailForm;
