import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { facebook, google } from '../../../Config/firebase';

import { negativeReds } from '../../../Common/Styles/Colors';
import Icon from '../../../Common/Modules/Icon';
import Logo from '../../../Images/budy_Wordmark.svg';
import Greeting from '../../../Common/Elements/Greeting';
import FacebookButton from '../../../Common/Collections/Buttons/FacebookBtn';
import GoogleButton from '../../../Common/Collections/Buttons/GoogleBtn';
import { PrimaryBtn as LoginButton } from '../../../Common/Elements/Buttons/SolidButton';
import EmailInput from '../../../Common/Collections/TextFields/EmailInput';
import PasswordInput from '../../../Common/Collections/TextFields/PasswordInput';
import ServiceLink from '../../../Common/Collections/TextFields/ServiceLink';
import { Divider } from '../../../Service/styles/Auth';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const Main = styled.main`
  background-color: #ffffff;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 50;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 530px) {
    .logo-header {
      width: 100%;
      margin: 15px 0;
      cursor: pointer;
    }
  }
  @media (min-width: 531px) {
    .logo-header {
      width: 100%;
      margin: 15px 0;
      cursor: pointer;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 504px;
  height: auto;
  /* height: 700px; */
  padding: 0 40px;
  margin: 120px;
  margin-bottom: 284px;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 40px 24px;
  }
`;

const WarningMessage = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 8px;
  border: ${({ negative }) => `1px solid ${negative}`};
  margin-top: 40px;
  display: flex;
  .login-warning-icon {
    width: 40px;
    border-radius: 8px 0 0 8px;
    background-color: ${({ negative }) => negative};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-warning-message {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 64px;
  border-bottom: 8px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  .logo-header {
    width: 60px;
    height: 24px;
    margin: 16px 0;
    cursor: pointer;
  }
`;

const ForgotLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #008695;
  width: 100%;
  margin: 16px 0;
  text-decoration: none;
`;

const SignupLink = styled.div`
  padding: 32px 79px;
  width: 394px;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #2e2e2e;
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

// TODO: enter keypress issue
/**
 *
 * @param {object} loginState
 * @param {object} validateState
 * @param {function} onChangeForm
 * @param {function} onClickButton
 * @param {function} OAuth
 * @param {function} onBlurTestEmail
 * @param {string} emailMessage
 * @param {function} moveHome
 */
const LoginForm = ({
  loginState,
  validateState,
  onChangeForm,
  onClickButton,
  OAuth,
  onBlurTestEmail,
  emailMessage,
  moveHome
}) => {
  return (
    <>
      <Main>
        <Container>
          <ImageWrapper>
            <img
              className="logo-header"
              src={Logo}
              alt="Logo"
              height="23px"
              width="60px"
              onClick={moveHome}
            />
          </ImageWrapper>

          <Wrapper>
            {validateState.validityOn && (
              <WarningMessage negative={negativeReds[500]}>
                <div className="login-warning-icon">
                  <Icon type="Weak" color="#ffffff" />
                </div>
                <div className="login-warning-message">
                  Information does not matched. Please try another email.
                </div>
              </WarningMessage>
            )}

            <Greeting greeting="Welcome Back!" />
            <form
              style={{ width: '100%' }}
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <FacebookButton
                marginBottom="8px"
                width="100%"
                OAuth={OAuth(facebook)}
              />
              <GoogleButton width="100%" OAuth={OAuth(google)} />
            </form>

            <Divider>Or</Divider>
            <FormWrapper>
              <EmailInput
                placeholder=" "
                value={loginState.email}
                validateState={validateState}
                name="email"
                onBlur={onBlurTestEmail}
                message={emailMessage}
                onChange={onChangeForm}
              />
              <PasswordInput
                placeholder=" "
                value={loginState.password}
                label="Password"
                name="password"
                onChange={onChangeForm}
              />

              <ForgotLink to="/forgot-password">Forgot Password?</ForgotLink>

              <LoginButton
                text="Login"
                width="100%"
                size="large"
                state={validateState.emailValidity ? 'pressed' : 'disabled'}
                onClick={e => {
                  e.preventDefault();
                  onClickButton();
                }}
                position="relative"
              />
            </FormWrapper>

            <ServiceLink />
            <SignupLink>
              Haven't account yet?
              <Link to="/signup" className="auth-link">
                Sign up
              </Link>
            </SignupLink>
          </Wrapper>
        </Container>
      </Main>
      {/* <GlobalFooter authPage={true} /> */}
    </>
  );
};

LoginForm.propTypes = {
  loginState: PropTypes.object.isRequired,
  validateState: PropTypes.object.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
  OAuth: PropTypes.func.isRequired,
  onBlurTestEmail: PropTypes.func.isRequired,
  emailMessage: PropTypes.string.isRequired,
  moveHome: PropTypes.func.isRequired
};

export default LoginForm;
