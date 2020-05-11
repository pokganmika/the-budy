import React from 'react';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { primary, greyscales } from '../../../../Common/Styles/Colors';

const Wrapper = styled.div`
  width: 768px;
  height: fit-content;
  padding: 40px;
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: ${greyscales[900]};
  @media (max-width: 530px) {
    display: none;
  }
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${greyscales[900]};
  margin-top: 40px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 530px) {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const CheckboxWrapper = styled.div`
  /* margin-left: 18px;
  @media (max-width: 530px) {
    margin-left: 10px;
  } */
`;

const Box = styled.div`
  margin: 22px 0;
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ disabled }) =>
      disabled ? greyscales[300] : primary[500]};
    border-color: ${({ disabled }) =>
      disabled ? greyscales[300] : primary[500]};
    /* background-color: ${primary[500]};
    border-color: ${primary[500]}; */
  }
`;

/**
 *
 * @param {object} notification
 * @param {function} onChangeNotificationCheckBox
 */
const EmailNotification = ({ notification, onChangeNotificationCheckBox }) => {
  return (
    <Wrapper>
      <Title>Email & Notification</Title>

      <SubTitle>All Notifications Disable</SubTitle>
      <CheckboxWrapper>
        <Box>
          <Checkbox
            name="notiOnOff"
            onChange={onChangeNotificationCheckBox}
            defaultChecked={notification.notiOnOff}
            checked={notification.notiOnOff}
          >
            Disabling notifications about post, Follower or Following and all
            kind of Budy messages.
          </Checkbox>
        </Box>
      </CheckboxWrapper>

      <SubTitle>Post Notifications</SubTitle>
      <CheckboxWrapper>
        <Box disabled={notification.notiOnOff}>
          <Checkbox
            name="comments"
            onChange={onChangeNotificationCheckBox}
            defaultChecked={notification.comments}
            checked={notification.comments}
            disabled={notification.notiOnOff}
          >
            Notify me when someone add comments to my posts.
          </Checkbox>
        </Box>
        <Box disabled={notification.notiOnOff}>
          <Checkbox
            name="answer"
            onChange={onChangeNotificationCheckBox}
            defaultChecked={notification.answer}
            checked={notification.answer}
            disabled={notification.notiOnOff}
          >
            Notify me when someone add Answer to my posts.
          </Checkbox>
        </Box>
        <Box disabled={notification.notiOnOff}>
          <Checkbox
            name="question"
            onChange={onChangeNotificationCheckBox}
            defaultChecked={notification.question}
            checked={notification.question}
            disabled={notification.notiOnOff}
          >
            Notify me when someone ask a question to me.
          </Checkbox>
        </Box>
      </CheckboxWrapper>

      <SubTitle>Follow Notifications</SubTitle>
      <CheckboxWrapper>
        <Box disabled={notification.notiOnOff}>
          <Checkbox
            name="following"
            onChange={onChangeNotificationCheckBox}
            defaultChecked={notification.following}
            checked={notification.following}
            disabled={notification.notiOnOff}
          >
            Notify me when someone started to following me.
          </Checkbox>
        </Box>
      </CheckboxWrapper>
    </Wrapper>
  );
};

export default EmailNotification;
