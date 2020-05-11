import styled from 'styled-components';
import { greyscales, sub } from '../../../../../Common/Styles/Colors';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15% 0;
  position: fixed;
  z-index: 40;
  transition: opacity 0.15s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 480px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
  }
`;

export const UpperWrapper = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 4px 4px 0 0;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: ${greyscales[900]};
`;

export const MiddleWrapper = styled.div`
  width: 100%;
  height: 80px;
  padding: 16px 24px;
  border-top: 1px solid ${sub[100]};
  border-bottom: 2px solid ${sub[200]};
`;

export const TextField = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 12px;
  background-color: ${sub[100]};
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  margin-left: 8px;
  border: none;
  outline: none;
  min-width: 50px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  background-color: transparent;
  ::-webkit-input-placeholder {
    color: ${greyscales[300]};
  }
`;

export const LowerWrapper = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 0 0 4px 4px;
  background-color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;
  .content-status {
    display: flex;
    justify-content: center;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .content-profile {
    display: flex;
    align-items: center;
    .content-profile-name {
      margin: 0 16px;
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      color: ${greyscales[900]};
      cursor: pointer;
    }
  }
`;

export const Message = styled.div`
  height: 200px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[400]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
