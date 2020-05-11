import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primary } from '../../../../Common/Styles/Colors';
import { Icon } from '../../MyPage/MyPageForm/style';
import { PrimaryBtn as ProfileUpdateButton } from '../../../../Common/Elements/Buttons/SolidButton';

import Image from '../../../../Common/Elements/Image';
import AccountEmail from '../../../../Common/Collections/TextFields/EmailInput';
import UsernameInput from '../../../../Common/Collections/TextFields/UsernameInput';
import BudyIdInput from '../../../../Common/Collections/TextFields/BudyIdInput';
import ShortBio from '../../../../Common/Collections/TextFields/ShortBioInput';
// import ProfileUpdateButton from '../../../../Common/Elements/Buttons/PrimaryBtn';

const Container = styled.div`
  width: 680px;
  height: fit-content;
  padding: 40px 24px;

  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0 16px;
    position: fixed;
    overflow: auto;
    background-color: #ffffff;
    z-index: 50;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  @media (min-width: 531px) {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
`;

// TODO: MODIFY edit-profile-link class
const ProfileWrapper = styled.div`
  align-self: flex-start;
  margin: 24px 0 16px 0;
  /* margin: 0 0 24px 0; */
  @media (max-width: 530px) {
    margin: 24px 0;
  }
  display: flex;
  .edit-profile-wrapper {
    padding: 16px;
    .edit-profile-link {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      color: ${primary[600]};
      margin-bottom: 8px;
      cursor: pointer;
      &:hover {
        color: ${primary[400]};
      }
    }
    .edit-profile-text {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const ProfileUpdateButtonWrapper = styled.div`
  @media (max-width: 530px) {
    padding: 0 0 max(8px, env(safe-area-inset-bottom));
  }
`;

/**
 *
 * TODO: AccountEmail props check
 *
 * TODO: image issue
 * edit-profile-link -> click event
 *
 * @param {object} profileState
 * @param {object} validateState
 * @param {object} profileImage
 * @param {function} onChangeProfile
 * @param {function} onSubmitModifiedUserData
 * @param {function} onBlurTestUsername
 * @param {function} onBlurTestBudyId
 * @param {string} usernameMessage
 * @param {string} budyIdMessage
 * @param {function} submitImageData
 * @param {function} movePage
 */
const EditProfileForm = ({
  profileState,
  validateState,
  profileImage,
  onChangeProfile,
  onSubmitModifiedUserData,
  onBlurTestUsername,
  onBlurTestBudyId,
  usernameMessage,
  budyIdMessage,
  submitImageData,
  movePage
}) => {
  const selectImageData = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      submitImageData(file);
    };
  };

  return (
    <Container>
      <Header>
        <Icon
          className="budy-chevron-left"
          size="24px"
          onClick={() => movePage('profile')}
        />
      </Header>

      <Title>Edit Profile</Title>

      <ProfileWrapper>
        <Image
          src={profileImage ? profileImage.small : null}
          type="profile"
          width="80px"
          height="80px"
        />

        <div className="edit-profile-wrapper">
          <div className="edit-profile-link" onClick={selectImageData}>
            {/* <div className="edit-profile-link" onClick={uploadIamge}> */}
            Change Profile Image
          </div>
          <div className="edit-profile-text">MAX 3MB, Only PNG and JPG</div>
        </div>
      </ProfileWrapper>

      <AccountEmail
        placeholder=" "
        disabled={true}
        value={profileState.accountEmail}
        validateState={validateState}
        marginBottom="16px"
      />
      <UsernameInput
        placeholder=" "
        name="username"
        value={profileState.username}
        validateState={validateState}
        onChange={onChangeProfile}
        onBlur={onBlurTestUsername}
        message={usernameMessage}
        marginBottom="16px"
      />
      <BudyIdInput
        placeholder=" "
        name="budyId"
        value={profileState.budyId}
        validateState={validateState}
        onChange={onChangeProfile}
        onBlur={onBlurTestBudyId}
        message={budyIdMessage}
        marginBottom="16px"
      />
      <ShortBio
        placeholder=" "
        name="shortBio"
        value={profileState.shortBio === null ? '' : profileState.shortBio}
        onChange={onChangeProfile}
      />

      <ProfileUpdateButtonWrapper>
        <ProfileUpdateButton
          text="Save Changes"
          width="160px"
          margin="16px 0 0 0"
          onClick={onSubmitModifiedUserData}
        />
      </ProfileUpdateButtonWrapper>
    </Container>
  );
};

EditProfileForm.propTypes = {
  profileState: PropTypes.object.isRequired,
  validateState: PropTypes.object.isRequired,
  profileImage: PropTypes.object,
  onChangeProfile: PropTypes.func.isRequired,
  onSubmitModifiedUserData: PropTypes.func.isRequired,
  onBlurTestUsername: PropTypes.func.isRequired,
  onBlurTestBudyId: PropTypes.func.isRequired,
  usernameMessage: PropTypes.string.isRequired,
  budyIdMessage: PropTypes.string.isRequired,
  submitImageData: PropTypes.func.isRequired,
  movePage: PropTypes.func.isRequired
};

export default EditProfileForm;
