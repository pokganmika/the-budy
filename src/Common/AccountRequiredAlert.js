import React from 'react';
import styled from 'styled-components';
import { white, greyscales, primary } from './Styles/Colors';
import { Link } from "react-router-dom";

const AccountRequiredAlert = ({ dismissHandler, isShown, history }) => {
  const isBlock = isShown ? 'flex' : 'none';

  return (
    <Dimmer displayBlock={isBlock}>
      <View >
        <Header>
          <div className="closeBtn">
            <span className="budy-x" onClick={dismissHandler} />
          </div>
          <TitleWrapper>
            <div className="title">Account required</div>
          </TitleWrapper>
          <MessageWrapper>
            For use this feature, you need BUDY account.
          </MessageWrapper>
        </Header>
        <Main>
          <StyledButton onClick={() => { history.push('/signup') }}>Create Account</StyledButton>
          <StyledButton onClick={() => { history.push('/login') }}>Sign In</StyledButton>
          <Prompter>
            Before create the BUDY account, you can check&nbsp;
            <Link to="/terms-of-service" className="auth-link" style={{ color: "#008695", fontWeight: "500", whiteSpace: "nowrap" }} >
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy-policy" className="auth-link" style={{ color: "#008695", fontWeight: "500", whiteSpace: "nowrap" }} >
              Privacy Policy
            </Link>
            {' '}of this site.
          </Prompter>
        </Main>
      </View>
      <ClickOutsideCloser onClick={dismissHandler} />
    </Dimmer>
  );
};

export default AccountRequiredAlert;

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 40;
  transition: opacity 0.15s linear;
  display:${props => props.displayBlock};
  justify-content: center;
  align-items: center;
`;

const ClickOutsideCloser = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 41;
`;

const View = styled.div`
  position: relative;
  z-index: 51;
  width: 380px;
  background-color: ${white};
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  @media (max-width: 530px) {
    width: 90%;
    height: auto;
    border-radius: 4px;
  }
`;

const Header = styled.header`
  position: relative;
  padding: 24px 24px 10px 24px;
  border-radius: 4px 4px 0px 0px;
  .closeBtn {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    .budy-x {
      font-size: 16px;
    }
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.6;
    color: ${greyscales[900]};
  }
  .caption {
    font-size: 14px;
    line-height: 1.75;
    color: ${greyscales[500]};
  }
`;

const Main = styled.main`
  padding: 0px 24px 24px 24px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #454545;
`;

const Prompter = styled.div`
  margin-top: 20px;
`;

const TitleWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const MessageWrapper = styled.div`
  font-size: 14px;
  line-height: 1;
  display: block;
  text-align: center;
  color: #999999;
  margin-top:10px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 4px;
  width: 100%;
  height:32px;
  background-color:#008695;
  color:white;
  margin-top:16px;
`;