import styled from 'styled-components';
import { greyscales } from '../../Common/Styles/Colors';

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
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  .logo-wrapper {
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
    @media (max-width: 530px) {
      .logo-header {
        width: 100%;
        margin: 15px 0;
      }
    }
  }

  /* USE verify-email component */
  @media (max-width: 530px) {
    .logo-header {
      width: 100%;
      margin: 15px 0;
    }
  }
  @media (min-width: 531px) {
    .logo-header {
      width: 100%;
      margin: 15px 0;
    }
  }
`;

const Wrapper = styled.div`
  width: 504px;
  height: auto;
  padding: 24px 40px;
  margin: ${({ margin }) => (margin ? margin : '80px')};
  /* margin: 80px; */
  margin-bottom: 400px;
  @media (max-width: 530px) {
    width: 100%;
    padding: 37px 24px;
    margin: 0;
  }
`;

const Title = styled.div`
  height: 32px;
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: #000000;
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #454545;
  margin-bottom: 16px;
`;

const VerifyMessage = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  color: ${greyscales[800]};
  margin-bottom: 16px;
`;

const Icon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
`;

export { Main, Container, Wrapper, Title, Message, VerifyMessage, Icon };
