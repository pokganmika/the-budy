import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../../../Common/Modules/Icon';
import { greyscales } from '../../../../Common/Styles/Colors';
import Icons from '../../../../Service/Icon';
import { DangerBtn as DeleteButton } from '../../../../Common/Elements/Buttons/SolidButton';
import ConfirmPasswordInput from '../../../../Common/Collections/TextFields/ConfirmPasswordInput';

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 40;
  transition: opacity 0.15s linear;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  padding: 184px 0;

  @media (max-width: 530px) {
    padding: 144px 16px;
  }
`;

const Wrapper = styled.div`
  width: 504px;
  height: fit-content;
  margin: 0 auto;
  padding: 40px;
  border-radius: 4px;
  background-color: #ffffff;
  .delete-user-modal-close {
    float: right;
    position: static;
    margin: -16px -16px 0 0;
    @media (max-width: 530px) {
      display: none;
    }
  }
  .delete-user-modal-close-mobile {
    float: right;
    position: static;
    margin: -46px -4px 0 0;
    @media (min-width: 531px) {
      display: none;
    }
  }

  @media (max-width: 530px) {
    width: 100%;
    margin: 0;
    padding: 64px 16px 40px 16px;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: ${greyscales[900]};

  @media (max-width: 530px) {
    font-size: 24px;
    line-height: 1.33;
  }
`;

const Message = styled.div`
  margin: 24px 0;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: ${greyscales[800]};
`;

const CheckWrapper = styled.div`
  margin: 40px 0 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .delete-user-modal-checkbox-message {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${greyscales[800]};
    margin-left: 9px;
  }
`;

/**
 *
 * @param {string} providerId
 * @param {string} deleteInputPassword
 * @param {string} errorMessage
 * @param {function} onChangeDeleteToggle
 * @param {function} onChangeDeletePassword
 * @param {function} deleteSocialUser
 * @param {function} deletePasswordUser
 */
export default function DeleteModal({
  providerId,
  deleteInputPassword,
  errorMessage,
  onChangeDeleteToggle,
  onChangeDeletePassword,
  deleteSocialUser,
  deletePasswordUser
}) {
  const [confirmCheck, setConfirmCheck] = useState(false);

  const confirmDeleteCheck = () => {
    setConfirmCheck(prevState => !prevState);
  };

  return (
    <Background>
      <Wrapper>
        <div className="delete-user-modal-close">
          <Icon
            type="close-outline"
            size="20px"
            color={greyscales[500]}
            cursor="pointer"
            onClick={onChangeDeleteToggle}
          />
        </div>

        <div className="delete-user-modal-close-mobile">
          <Icon
            type="close-outline"
            size="24px"
            color={greyscales[800]}
            cursor="pointer"
            onClick={onChangeDeleteToggle}
          />
        </div>

        <Title>Delete your account</Title>

        <Message>
          It is possible to delete your account, But it's irreversible. Please
          be sure that you would to do that.
        </Message>

        {providerId === 'password' ? (
          <ConfirmPasswordInput
            placeholder=" "
            label="Confirm your password"
            value={deleteInputPassword}
            validateState={' '}
            onChange={onChangeDeletePassword}
            // onBlur={}
            message={errorMessage}
            marginBottom="16px"
          />
        ) : (
          <CheckWrapper>
            {confirmCheck ? (
              <Icons
                type="check-square-fill"
                size="16px"
                onClick={confirmDeleteCheck}
              />
            ) : (
              <CheckBox onClick={confirmDeleteCheck} />
            )}
            <div className="delete-user-modal-checkbox-message">
              "Yap, I exactly know where I am going."
            </div>
          </CheckWrapper>
        )}

        <DeleteButton
          text="Delete Account"
          width="100%"
          state="hovered"
          state={
            providerId === 'password'
              ? deleteInputPassword.length === 0
                ? 'disabled'
                : 'hovered'
              : confirmCheck
              ? 'hovered'
              : 'disabled'
          }
          // state={confirmCheck ? 'hovered' : 'disabled'}
          onClick={
            providerId === 'password' ? deletePasswordUser : deleteSocialUser
          }
        />
      </Wrapper>
    </Background>
  );
}

DeleteModal.propTypes = {
  providerId: PropTypes.string.isRequired,
  deleteInputPassword: PropTypes.string.isRequired,
  onChangeDeleteToggle: PropTypes.func.isRequired,
  onChangeDeletePassword: PropTypes.func.isRequired,
  deleteSocialUser: PropTypes.func.isRequired,
  deletePasswordUser: PropTypes.func.isRequired
};

const CheckBox = styled.div`
  width: 14px;
  height: 14px;
  margin: 0 1px;
  border: 1px solid ${greyscales[500]};
  border-radius: 2px;
`;

// USE settings
const SettingsCheckBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 2px;
  border: 1px solid ${greyscales[500]};
  border-radius: 4px;
`;
