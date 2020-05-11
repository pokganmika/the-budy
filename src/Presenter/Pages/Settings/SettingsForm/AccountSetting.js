import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { DefaultBtn } from '../../../../Common/Elements/Buttons/BorderButton';
import {
  primary,
  greyscales,
  sub,
  negativeReds
} from '../../../../Common/Styles/Colors';

import DeleteModal from '../SettingsModal/DeleteModal';

const Wrapper = styled.div`
  width: 768px;
  height: fit-content;
  padding: 40px;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: ${greyscales[900]};
  @media (max-width: 530px) {
    display: none;
  }
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  color: #000000;
  margin-top: 40px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 530px) {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
  margin-bottom: 16px;
  @media (max-width: 530px) {
    font-size: 16px;
    line-height: 1.25;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 16px;
    margin-bottom: 24px;
  }
`;

const ChangePassowordButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  .setting-change-password-message {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${negativeReds[500]};
    margin-left: 8px;
  }
`;

const ChangePassowordButton = styled(DefaultBtn)`
  &:hover {
    div {
      color: ${({ providerId }) => providerId === 'password' && primary[500]};
    }
    border: ${({ providerId }) =>
      providerId === 'password' && `1px solid ${primary[500]}`};
    background-color: ${({ providerId }) =>
      providerId === 'password' && sub[100]};
  }
`;

const DeleteLink = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: ${greyscales[400]};
  cursor: pointer;
  &:hover {
    color: ${negativeReds[400]};
  }
`;

/**
 *
 * @param {string} providerId
 * @param {string} deleteInputPassword
 * @param {string} errorMessage
 * @param {function} onChangeDeletePassword
 * @param {function} deleteSocialUser
 * @param {function} deletePasswordUser
 */
const AccountSetting = ({
  history,
  providerId,
  deleteInputPassword,
  errorMessage,
  onChangeDeletePassword,
  deleteSocialUser,
  deletePasswordUser
}) => {
  const [deleteToggle, setDeleteToggle] = useState(false);

  const onChangeDeleteToggle = () => {
    setDeleteToggle(!deleteToggle);
  };

  return (
    <>
      {deleteToggle && (
        <DeleteModal
          providerId={providerId}
          deleteInputPassword={deleteInputPassword}
          errorMessage={errorMessage}
          onChangeDeleteToggle={onChangeDeleteToggle}
          onChangeDeletePassword={onChangeDeletePassword}
          deleteSocialUser={deleteSocialUser}
          deletePasswordUser={deletePasswordUser}
        />
      )}
      <Wrapper>
        <Title>Account Setting</Title>

        <SubTitle>Account password</SubTitle>
        <Text>Update your Account Password.</Text>

        <ChangePassowordButtonWrapper>
          <ChangePassowordButton
            providerId={providerId}
            text="Change Password"
            size="small"
            width="154px"
            state={providerId !== 'password' && 'disabled'}
            onClick={
              providerId === 'password'
                ? () => history.push('/change-password')
                : null
            }
          />
          {providerId !== 'password' && (
            <div className="setting-change-password-message">
              Available for email login users only.
            </div>
          )}
        </ChangePassowordButtonWrapper>

        <SubTitle>Delete account</SubTitle>
        <Text>Permanently delete your account and all of your content.</Text>
        <DeleteLink onClick={onChangeDeleteToggle}>Delete account</DeleteLink>
      </Wrapper>
    </>
  );
};

export default withRouter(AccountSetting);
