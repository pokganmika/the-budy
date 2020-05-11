import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
// import Image from '../../../Common/Elements/Image';
import { SecondaryBtn as DefaultBtn } from '../../../Common/Elements/Buttons/BorderButton';
import page404Image from '../../../Images/404-Background-Desktop.jpg';
import page404ImageMobile from '../../../Images/Error-Background-No-Lettered.jpg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  .page-404 {
    background-image: url(${page404Image});
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    @media (max-width: 530px) {
      display: none;
    }
  }

  .page-404-mobile {
    top: 0;
    left: 0;
    position: fixed;
    z-index: 51;
    background-image: url(${page404ImageMobile});
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @media (min-width: 531px) {
      display: none;
    }
  }
`;

const MobileWrapper = styled.div`
  z-index: 52;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #ffffff;

  .page-404-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .page-404-title {
      font-size: 38px;
      margin-bottom: 16px;
    }
    .page-404-submain {
      font-size: 14px;
    }
    .page-404-main {
      font-size: 72px;
      font-weight: 800;
      margin: 40px 0;
    }
    .page-404-message {
      font-size: 14px;
      font-weight: 600;
    }
    .page-404-button {
      margin: 42px 0;
      width: 100%;
    }
  }
  .page-404-company {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.17;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Page404Form = ({ history }) => {
  return (
    <Container>
      <div className="page-404" />
      <div className="page-404-mobile">
        <MobileWrapper>
          <div className="page-404-container">
            <div className="page-404-title">Budy</div>
            <div className="page-404-submain">404 Error</div>
            <div className="page-404-main">404</div>
            <div className="page-404-message">
              The page you are looking for doesn’t exist or an other error
              occurred. Go back, or head over to thebudy.com to choose a new
              direction.
            </div>
            <DefaultBtn
              className="page-404-button"
              text="Go Back"
              onClick={() => history.goBack()}
            />
          </div>
          <div className="page-404-company">
            GANA Technologies OÜ © All rights reserved.
          </div>
        </MobileWrapper>
      </div>
    </Container>
  );
};

export default withRouter(Page404Form);
