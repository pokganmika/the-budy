import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 50;
  overflow: auto;
  .logo-header {
    margin-top: 29px;
    margin-bottom: 68px;
  }
  @media (max-width: 530px) {
    .logo-header {
      margin: 28px 0;
      margin-left: 16px;
    }
    .logo-wrapper {
      width: 100%;
    }
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
  @media (max-width: 530px) {
    text-align: left;
  }
`;

const Message = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 24px;
  @media (max-width: 530px) {
    text-align: left;
    line-height: 1.25;
  }
`;

const Divider = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  ::before,
  ::after {
    content: "";
    display: inline-block;
    flex: 1;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
  }
  ::before {
    margin-right: 8px;
  }
  ::after {
    margin-left: 8px;
  }
`;

const SimpleDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export { Container, Title, Message, Divider, SimpleDivider };
