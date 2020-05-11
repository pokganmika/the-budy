import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { primary, greyscales } from '../../../Common/Styles/Colors';
import Logo from '../../../Images/budy_Wordmark.svg';
import { PrimaryBtn as ToLoginButton } from '../../../Common/Elements/Buttons/SolidButton';
import {
  Main,
  Container,
  Wrapper,
  Title,
  VerifyMessage
} from '../../../Service/styles/Password';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const RequestResend = styled.div`
  width: 100%;
  margin: 24px 0;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: ${greyscales[500]};
  .resend-link {
    font-weight: 500;
    color: ${primary[500]};
  }
`;

/**
 *
 * @param {function} moveHome
 * @param {function} onClickButton
 */
const VerifyEmailForm = ({ moveHome, onClickButton }) => {
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

          <Wrapper margin="160px">
            <Title>Verify your Email</Title>
            <VerifyMessage>
              Verification email just sent to you. <br />
              To continue using Budy, Please verify your email address.
            </VerifyMessage>

            <ToLoginButton
              text="Back to Login"
              width="100%"
              onClick={onClickButton}
            />

            <RequestResend>
              If you have not received the email after a few minutes, Please
              check your spam folder or{' '}
              <span className="resend-link">
                Resend the verification email.
              </span>
            </RequestResend>
          </Wrapper>
        </Container>
      </Main>
      {/* <GlobalFooter /> */}
    </>
  );
};

VerifyEmailForm.propTypes = {
  moveHome: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired
};

export default VerifyEmailForm;
