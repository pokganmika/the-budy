import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../../Images/budy_Wordmark.svg';
import NewPassword from '../../../Common/Collections/TextFields/PasswordInput';
import ConfirmNewPassword from '../../../Common/Collections/TextFields/ConfirmPasswordInput';
import { PrimaryBtn as PasswordChangeButton } from '../../../Common/Elements/Buttons/SolidButton';
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
 * @param {string} gradeState
 * @param {function} onChangeNewPassword
 * @param {function} onChangeConfirmPassword
 * @param {function} onClickSubmit
 * @param {function} onBlurNewPassword
 * @param {function} onBlurConfirmPassword
 * @param {string} newPasswordMessage
 * @param {string} confirmPasswordMessage
 * @param {string} errorMessage
 */
const ChangePasswordForm = ({
  moveHome,
  passwordState,
  validateState,
  gradeState,
  onChangeNewPassword,
  onChangeConfirmPassword,
  onClickSubmit,
  onBlurNewPassword,
  onBlurConfirmPassword,
  newPasswordMessage,
  confirmPasswordMessage,
  errorMessage
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
            <Title>Change Password</Title>
            <Message>
              For the account security, Please enter your current password
              before changing your password.
            </Message>

            <ConfirmNewPassword
              placeholder=" "
              label="Current Password"
              name="currentPassword"
              value={passwordState.currentPassword}
              validateState={' '}
              onChange={onChangeConfirmPassword}
              // onBlur={}
              message={errorMessage}
              marginBottom="16px"
            />
            <NewPassword
              placeholder=" "
              label="New Password"
              name="newPassword"
              value={passwordState.newPassword}
              onChange={onChangeNewPassword}
              onBlur={onBlurNewPassword}
              message={newPasswordMessage}
              validateState={validateState}
              // validatePassword={validateState.newPasswordValidity}
              securityGrade={gradeState}
              marginBottom="16px"
            />
            <ConfirmNewPassword
              placeholder=" "
              label="Cofirm New Password"
              name="confirmPassword"
              value={passwordState.confirmPassword}
              onChange={onChangeConfirmPassword}
              onBlur={onBlurConfirmPassword}
              message={confirmPasswordMessage}
              validateState={validateState}
              // validateConfirmPassword={validateState.confirmPasswordValidity}
              marginBottom="16px"
            />

            <PasswordChangeButton
              text="Update Changes"
              width="100%"
              state={
                validateState.newPasswordValidity &&
                validateState.confirmPasswordValidity &&
                passwordState.currentPassword.length !== 0
                  ? 'pressed'
                  : 'disabled'
              }
              onClick={onClickSubmit}
            />
          </Wrapper>
        </Container>
      </Main>
      {/* <GlobalFooter /> */}
    </>
  );
};

ChangePasswordForm.propTypes = {
  moveHome: PropTypes.func.isRequired,
  passwordState: PropTypes.object.isRequired,
  validateState: PropTypes.object.isRequired,
  gradeState: PropTypes.string.isRequired,
  onChangeNewPassword: PropTypes.func.isRequired,
  onChangeConfirmPassword: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  onBlurNewPassword: PropTypes.func.isRequired,
  onBlurConfirmPassword: PropTypes.func.isRequired,
  newPasswordMessage: PropTypes.string,
  confirmPasswordMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

export default ChangePasswordForm;
