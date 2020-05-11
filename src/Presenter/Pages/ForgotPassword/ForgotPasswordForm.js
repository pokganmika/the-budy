import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../../Images/budy_Wordmark.svg';
import EmailInput from '../../../Common/Collections/TextFields/EmailInput';
import { PrimaryBtn as LinkRequestButton } from '../../../Common/Elements/Buttons/SolidButton';
import {
  Main,
  Container,
  Wrapper,
  Title,
  Message
} from '../../../Service/styles/Password';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

/**
 *
 * @param {function} moveHome
 * @param {object} passwordState
 * @param {object} validateState
 * @param {function} onChangeEmail
 * @param {function} onClickSubmit
 * @param {function} onBlurTest
 * @param {string} message
 */
const ForgotPasswordForm = ({
  moveHome,
  passwordState,
  validateState,
  onChangeEmail,
  onClickSubmit,
  onBlurTest,
  message
}) => {
  return (
    <>
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
          </div>

          <Wrapper>
            <Title>Forgot Password?</Title>
            <Message>
              Enter the Email Address you used when you joined and we'll send
              you Magic Link to reset your password.
              <br />
              <br />
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
            </Message>
            <EmailInput
              placeholder=" "
              name="email"
              value={passwordState.email}
              validateState={validateState}
              onChange={onChangeEmail}
              onBlur={onBlurTest}
              message={message}
              marginBottom="16px"
            />

            <LinkRequestButton
              text="Send Magic Link"
              width="100%"
              state={validateState.emailValidity ? 'pressed' : 'disabled'}
              onClick={onClickSubmit}
            />
          </Wrapper>
        </Container>
      </Main>
      {/* <GlobalFooter authPage={true} /> */}
    </>
  );
};

ForgotPasswordForm.propTypes = {
  moveHome: PropTypes.func.isRequired,
  passwordState: PropTypes.object.isRequired,
  validateState: PropTypes.object.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  onBlurTest: PropTypes.func.isRequired,
  message: PropTypes.string
};

export default ForgotPasswordForm;
