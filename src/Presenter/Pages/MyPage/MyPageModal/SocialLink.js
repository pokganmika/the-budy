import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import firebase from 'firebase';
import { USER_API } from '../../../../Config/api';
import { CloseOutline } from '@forefront-ux/react-eva-icons';

import SocialLinkInput from '../../../../Common/Collections/TextFields/SocialLinkInput';

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 40;
  transition: opacity 0.15s linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 624px;
  height: auto;
  /* height: 424px; */
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  padding: 0 24px;
  @media (max-width: 650px) {
    width: 100%;
    height: 100%;
    padding: 0 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-bottom: 24px;
  @media (max-width: 650px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px 0;
    height: auto;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  /* line-height: 1.25; */
  letter-spacing: normal;
  color: #000000;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  @media (max-width: 650px) {
    display: none;
  }
`;

const MobileIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  @media (min-width: 651px) {
    display: none;
  }
`;

const SubmitButton = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: #ffffff;
  width: 104px;
  height: 40px;
  border-radius: 4px;
  background-color: #0074ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  float: right;
  @media (max-width: 650px) {
    display: none;
  }
`;

const MobileSubmitButton = styled.div`
  width: 52px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: #ffffff;
  background-color: #000000;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 8px 16px; */

  @media (min-width: 651px) {
    display: none;
  }
`;

const TempStone = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
`;

const Divider = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 32px;
  @media (max-width: 650px) {
    display: none;
  }
`;

const socialLinkInitState = {
  medium: '',
  facebook: '',
  youtube: '',
  twitter: '',

  pageInit: false
};

const SocialLink = ({ onChangeToggleState }) => {
  const [socialForm, setSocialForm] = useState(socialLinkInitState);

  const getLinkData = async () => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const tokenData = { 'x-access-token': idToken };
      const result = await axios.get(`${USER_API}/users/me/urls`, { headers: tokenData });
      const socialLinkTypes = result.data.result;
      console.log('::social link data:: ---> : ', result);
      setSocialForm({
        medium: socialLinkTypes.find(type => type.UrlType === 'medium').Url,
        facebook: socialLinkTypes.find(type => type.UrlType === 'facebook').Url,
        youtube: socialLinkTypes.find(type => type.UrlType === 'youtube').Url,
        twitter: socialLinkTypes.find(type => type.UrlType === 'twitter').Url,

        pageInit: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeForm = e => {
    setSocialForm({ ...socialForm, [e.target.name]: e.target.value });
  };

  useEffect(() => { getLinkData() }, [])

  /**
   * TODO: page init issue
   * before data get init? || after data get init?
   */
  return (
    <>
      {socialForm.pageInit && (
        <Background>
          <Wrapper>
            <Header>
              <TempStone />
    
              <MobileIconWrapper>
                <CloseOutline 
                  size='100%'
                  onClick={onChangeToggleState}
                />
              </MobileIconWrapper>
    
              <Title>
                Social Links
              </Title>
    
              <IconWrapper>
                <CloseOutline 
                  size='100%'
                  onClick={onChangeToggleState}
                />
              </IconWrapper>
    
              <MobileSubmitButton>Done</MobileSubmitButton>
            </Header>
    
            <SocialLinkInput
              name='medium'
              value={socialForm.medium}
              onChange={onChangeForm}
            />
            <SocialLinkInput
              name='facebook'
              value={socialForm.facebook}
              onChange={onChangeForm}
            />
            <SocialLinkInput
              name='youtube'
              value={socialForm.youtube}
              onChange={onChangeForm}
            />
            <SocialLinkInput
              name='twitter'
              value={socialForm.twitter}
              onChange={onChangeForm}
            />
    
            <Divider />
            <SubmitButton>Done</SubmitButton>
          </Wrapper>
    
        </Background>
      )}
    </>
  );
}

export default SocialLink;
