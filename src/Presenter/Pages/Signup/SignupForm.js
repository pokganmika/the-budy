import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { facebook, google } from '../../../Config/firebase';

import Logo from '../../../Images/budy_Wordmark.svg';
import Greeting from '../../../Common/Elements/Greeting';
import FacebookButton from '../../../Common/Collections/Buttons/FacebookBtn';
import GoogleButton from '../../../Common/Collections/Buttons/GoogleBtn';
import EmailButton from '../../../Common/Collections/Buttons/EmailBtn';
import ServiceLink from '../../../Common/Collections/TextFields/ServiceLink';
import { Divider } from '../../../Service/styles/Auth';
// import GlobalFooter from '../../../Common/Collections/GlobalFooter';

const Main = styled.main`
  background-color: #ffffff;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 50;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 530px) {
    .logo-header {
      width: 100%;
      margin: 15px 0;
      cursor: pointer;
    }
  }
  @media (min-width: 531px) {
    .logo-header {
      width: 100%;
      margin: 15px 0;
      cursor: pointer;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 504px;
  height: auto;
  padding: 0 40px;
  margin: 160px;
  margin-bottom: 400px;
  z-index: 50;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 40px 24px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 64px;
  border-bottom: 8px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  .logo-header {
    width: 60px;
    height: 24px;
    margin: 16px 0;
    cursor: pointer;
  }
`;

const LoginLink = styled.div`
  padding: 32px 79px;
  width: 394px;
  height: 84px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  .auth-link {
    margin-left: 5px;
    text-decoration: none;
    font-weight: 600;
    color: #008695;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
`;

/**
 *
 * @param {function} OAuth
 * @param {function} moveHome
 * @param {function} signupButton
 */
function SignupForm({ OAuth, moveHome, signupButton }) {
  return (
    <>
      <Main>
        <Container>
          <ImageWrapper>
            <img
              className="logo-header"
              src={Logo}
              alt="Logo"
              height="23px"
              width="60px"
              onClick={moveHome}
            />
          </ImageWrapper>

          <Wrapper>
            <Greeting greeting="Good day to be Budy!" />

            <FormWrapper>
              <FacebookButton
                marginBottom="8px"
                width="100%"
                OAuth={OAuth(facebook)}
              />
              <GoogleButton width="100%" OAuth={OAuth(google)} />

              <Divider>Or</Divider>

              <EmailButton width="100%" onClick={signupButton} />
            </FormWrapper>

            <ServiceLink />
            <LoginLink>
              Already Joined?
              <Link to="login" className="auth-link">
                Login
              </Link>
            </LoginLink>
          </Wrapper>
        </Container>
      </Main>
      {/* <GlobalFooter /> */}
    </>
  );
}

SignupForm.propTypes = {
  OAuth: PropTypes.func.isRequired,
  moveHome: PropTypes.func.isRequired,
  signupButton: PropTypes.func.isRequired
};

export default SignupForm;
