import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import linkChecker from '../../../../Service/linkCheck';
import {
  primary,
  greyscales,
  negativeReds
} from '../../../../Common/Styles/Colors';
import Icon from '../../../../Common/Modules/Icon';
import NewSocialLinkInput from '../../../../Common/Collections/TextFields/NewSocialLinkInput';

import {
  Medium,
  Facebook,
  Youtube,
  Twitter
} from '../../../../Service/socialIcons';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 520px;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);

  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
  }
`;

const UpperWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 24px;
  border-bottom: 1px solid ${greyscales[200]};

  @media (max-width: 530px) {
    border-bottom: none;
  }
`;

const LowerWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 24px;
  .social-link-remove-button {
    width: 100%;
    text-align: right;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: ${greyscales[900]};
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[500]};
`;

const SubMessageBox = styled.div`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  display: flex;
  .sub-title {
    font-size: 16px;
    line-height: 1.38;
    color: ${greyscales[900]};
  }
  .sub-message {
    font-size: 12px;
    line-height: 2;
    color: ${greyscales[500]};
    margin-left: 8px;
  }

  @media (max-width: 530px) {
    flex-direction: column;
    .sub-message {
      margin: 0;
    }
  }
`;

const NoData = styled.div`
  width: 100%;
  /* width: 472px; */
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[300]};
`;

const RemoveButton = styled.span`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${primary[500]};
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 16px;
`;

const Link = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  padding-left: 0;
  cursor: pointer;
  &:hover {
    background-color: ${greyscales[100]};
  }
`;

const NewSocialLink = ({
  socialLinkData,
  socialLinkValue,
  addLink,
  removeLink,
  removeAllLinkList,
  onChangeSocialForm,
  onChangeToggleState
}) => {
  return (
    <Background>
      <Wrapper>
        <UpperWrapper>
          <InnerWrapper>
            <Title>Add social Links</Title>
            <Icon
              type="close-outline"
              color={greyscales[500]}
              size="20px"
              cursor="pointer"
              onClick={onChangeToggleState}
            />
          </InnerWrapper>
          <Message>Add max 5 social channel links to your profile.</Message>
        </UpperWrapper>

        <LowerWrapper>
          <SubMessageBox>
            <div className="sub-title">Your social channel URL</div>
            <div className="sub-message">
              Medium, Facebook, Youtube, Twitter or else.
            </div>
          </SubMessageBox>

          <NewSocialLinkInput
            name="urlLink"
            value={socialLinkValue}
            onChange={onChangeSocialForm}
            disabled={socialLinkData.length >= 5 ? 'disabled' : ''}
            onClickAdd={addLink}
            onKeyPressAdd={e => e.key === 'Enter' && addLink()}
          />

          {socialLinkData.length === 0 ? (
            <NoData>No social links yet</NoData>
          ) : (
            <>
              <div className="social-link-remove-button">
                <RemoveButton onClick={removeAllLinkList}>
                  Remove all
                </RemoveButton>
              </div>

              <LinkWrapper>
                {socialLinkData.map(link => (
                  <Link key={link.id}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      {linkChecker(link.Url) === 'medium' ? (
                        <Medium margin="14px 8px 14px 16px" color="#000000" />
                      ) : linkChecker(link.Url) === 'facebook' ? (
                        <Facebook margin="14px 8px 14px 16px" color="#356bc4" />
                      ) : linkChecker(link.Url) === 'youtube' ? (
                        <Youtube margin="14px 8px 14px 16px" color="#e62117" />
                      ) : linkChecker(link.Url) === 'twitter' ? (
                        <Twitter margin="14px 8px 14px 16px" color="#1da1fe" />
                      ) : (
                        <Icon
                          type="globe-outline"
                          size="20px"
                          color={primary[500]}
                          margin="14px 8px 14px 16px"
                        />
                      )}
                      {linkChecker(link.Url) === 'medium'
                        ? 'Medium'
                        : linkChecker(link.Url) === 'facebook'
                        ? 'Facebook'
                        : linkChecker(link.Url) === 'youtube'
                        ? 'Youtube'
                        : linkChecker(link.Url) === 'twitter'
                        ? 'Twitter'
                        : link.Url}
                      <Icon
                        type="external-link"
                        size="12px"
                        margin="4px"
                        color="#0091ff"
                        onClick={e => {
                          e.preventDefault();
                          if (link.Url.slice(0, 4) !== 'http') {
                            window.open(`http://${link.Url}`);
                          } else {
                            window.open(link.Url);
                          }
                        }}
                      />
                    </div>
                    <Icon
                      type="trash-2-outline"
                      size="20px"
                      color={negativeReds[500]}
                      cursor="pointer"
                      onClick={e => {
                        e.preventDefault();
                        removeLink(link.id);
                      }}
                    />
                  </Link>
                ))}
              </LinkWrapper>
            </>
          )}
        </LowerWrapper>
      </Wrapper>
    </Background>
  );
};

NewSocialLink.propTypes = {
  socialLinkValue: PropTypes.string.isRequired,
  socialLinkData: PropTypes.array.isRequired,
  addLink: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired,
  removeAllLinkList: PropTypes.func.isRequired,
  onChangeSocialForm: PropTypes.func.isRequired,
  onChangeToggleState: PropTypes.func.isRequired
};

export default NewSocialLink;
