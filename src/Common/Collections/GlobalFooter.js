import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { white, sub } from '../Styles/Colors';
import BudyWordmark from '../../Images/budy_Wordmark_white.svg';
import Image from '../../Common/Elements/Image';
import Icon from '../../Common/Modules/Icon';

function GlobalFooter({ authPage, history }) {
  return (
    <Footer name="global-footer" authPage={authPage}>
      <div>
        <Contents>
          <Image src={BudyWordmark} alt="" width="80px" height="31px" />
          <Content>
            <div className="title">MEET BUDY</div>
            <div className="text">About Us</div>
            <div onClick={() => history.push('/terms-of-service')} className="text">Terms of service</div>
            <div onClick={() => history.push('/privacy-policy')} className="text">Privacy policy</div>
          </Content>
          <Content>
            <div className="title">NEED HELP?</div>
            {/* <div className="text" onClick={() => history.push('/helpcenter')}>
              Help Center
            </div> */}
            <div onClick={() => history.push('/ask-to-budy')} className="text">Contact</div>
          </Content>
          <Content>
            <div className="title">FOLLOW US</div>
            <div className="icon">
              <Icon type="facebook" size="20px" color={white} />
            </div>
            <div className="icon">
              <Icon type="youtube" size="20px" color={white} />
            </div>
            <div className="icon">
              <Icon type="medium" size="20px" color={white} />
            </div>
            <div className="icon">
              <Icon type="twitter" size="20px" color={white} />
            </div>
          </Content>
        </Contents>
      </div>
      <Copyright> {new Date().getFullYear().toString() } GANA Networks LLC. © All rights reserved.</Copyright>
    </Footer>
  );
}

const Footer = styled.footer`
  background-color: ${() => sub[900]};
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: ${({ authPage }) => authPage === true && 51};
  @media (max-width: 530px) {
    display: none;
  }
`;

const Contents = styled.div`
  max-width: 1032px;
  margin: 0 auto;
  padding: 48px 24px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  .title {
    font-size: 14px;
    font-weight: 600;
    color: ${() => sub[500]};
    line-height: 1.72;
    margin-bottom: 16px;
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    color: ${() => white};
    line-height: 1.29;
    margin-bottom: 8px;
    cursor: pointer;
  }
  .icon {
    display: inline-block;
    border-radius: 50%;
    background-color: ${() => sub[800]};
    width: 40px;
    height: 40px;
    padding: 10px;
    margin-right: 16px;
    cursor: pointer;
    div {
      cursor: pointer;
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${() => sub[800]};
  height: 48px;
  font-size: 12px;
  color: ${() => sub[500]};
`;

export default withRouter(GlobalFooter);
