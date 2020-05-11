import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { primary, greyscales, sub } from '../../../../Common/Styles/Colors';

const Wrapper = styled.div`
  width: 264px;
  height: 200px;
  padding: 40px 16px;

  @media (max-width: 530px) {
    width: 100%;
    height: 40px;
    padding: 0;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #000000;

  @media (max-width: 530px) {
    display: none;
  }
`;

const SelectorWrapper = styled.div`
  list-style: none;
  margin-top: 24px;

  @media (max-width: 530px) {
    margin: 0;
    padding: 0 8px;
    height: fit-content;
    display: flex;
    border-bottom: 1px solid ${greyscales[100]};
  }
`;

const Selector = styled(Link)`
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: ${({ selected }) => (selected ? primary[500] : greyscales[500])};
  background-color: ${({ selected }) => selected && sub[100]};
  height: 32px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${primary[500]};
    background-color: ${sub[100]};
  }

  @media (max-width: 530px) {
    height: fit-content;
    font-size: 14px;
    line-height: 1.14;
    padding: 12px 0;
    margin: 0 8px;
    background-color: #ffffff;
    &:hover {
      font-weight: 500;
      color: ${primary[500]};
      border-bottom: 2px solid ${primary[500]};
      background-color: #ffffff;
    }
  }
`;

const SettingsNav = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <Title>Settings</Title>

      <SelectorWrapper>
        <Selector
          to="/settings/account-setting"
          selected={location.pathname.includes('account-setting')}
        >
          Account Setting
        </Selector>
        <Selector
          to="/settings/email-notification"
          selected={location.pathname.includes('email-notification')}
        >
          Email & Notification
        </Selector>
      </SelectorWrapper>
    </Wrapper>
  );
};

SettingsNav.propTypes = {};

export default withRouter(SettingsNav);
