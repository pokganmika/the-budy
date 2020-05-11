import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SettingsNav from './SettingsForm/SettingsNav';
import AccountSetting from './SettingsForm/AccountSetting';
import EmailNotification from './SettingsForm/EmailNotification';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const Container = styled.div`
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  @media (max-width: 530px) {
    flex-direction: column;
    top: 56;
    left: 0;
    margin: 0;
    padding: 0;
  }
`;

/**
 *
 * @param {string} idToken
 * @param {string} providerId
 * @param {object} notification
 * @param {function} onChangeNotificationCheckBox
 * @param {function} submitNotificationData
 * @param {string} deleteInputPassword
 * @param {string} errorMessage
 * @param {function} onChangeDeletePassword,
 * @param {function} deleteSocialUser
 * @param {function} deletePasswordUser
 */
function SettingsForm({
  idToken,
  providerId,
  notification,
  onChangeNotificationCheckBox,
  submitNotificationData,
  deleteInputPassword,
  errorMessage,
  onChangeDeletePassword,
  deleteSocialUser,
  deletePasswordUser
}) {
  return (
    <Container>
      <SettingsNav />

      <Route
        path="/settings/account-setting"
        render={() => (
          <AccountSetting
            providerId={providerId}
            deleteInputPassword={deleteInputPassword}
            errorMessage={errorMessage}
            onChangeDeletePassword={onChangeDeletePassword}
            deleteSocialUser={deleteSocialUser}
            deletePasswordUser={deletePasswordUser}
          />
        )}
      />
      <Route
        path="/settings/email-notification"
        render={() => (
          <EmailNotification
            idToken={idToken}
            notification={notification}
            onChangeNotificationCheckBox={onChangeNotificationCheckBox}
            submitNotificationData={submitNotificationData}
          />
        )}
      />
      {/* <GlobalFooter /> */}
    </Container>
  );
}

SettingsForm.propTypes = {
  idToken: PropTypes.string.isRequired,
  providerId: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
  onChangeNotificationCheckBox: PropTypes.func.isRequired,
  submitNotificationData: PropTypes.func.isRequired,
  deleteInputPassword: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChangeDeletePassword: PropTypes.func.isRequired,
  deleteSocialUser: PropTypes.func.isRequired,
  deletePasswordUser: PropTypes.func.isRequired
};

export default SettingsForm;
