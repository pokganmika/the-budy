import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API } from '../../../../Config/api';
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
    overflow: auto;
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

const emailNotificationInitState = {
  allNotificationsDisable: false,
  postNotifications: {
    comments: false,
    answer: false,
    question: false
  },
  followNotifications: false
};

/**
 *
 * @param {object} notification
 * @param {string} idToken
 */
const EmailNotification = ({ notification, idToken }) => {
  const [noti, setNoti] = useState(emailNotificationInitState);
  const [initState, setInitState] = useState(false);
  // console.log('::EmailNotification notification:: props ---> : ', notification);
  console.log('::EmailNotification noti:: state ---> : ', noti);

  const initChecker = () => {
    setNoti({
      allNotificationsDisable: notification.notiOnOff,
      postNotifications: {
        comments: notification.comments,
        answer: notification.answer,
        question: notification.question
      },
      followNotifications: notification.following
    });
    setInitState(true);
  };

  const onChangeAllNotificationCheckBox = e => {
    setNoti(prevState => ({
      ...prevState,
      // allNotificationsDisable: !noti.allNotificationsDisable
      allNotificationsDisable: e.target.checked
    }));
  };

  const onChangePostNotificationCheckbox = e => {
    setNoti({
      ...noti,
      postNotifications: {
        ...noti.postNotifications,
        // [e.target.name]: !noti.postNotifications[e.target.name]
        [e.target.name]: e.target.checked
      }
    });
  };

  const onChangeFollowNotificationCheckbox = e => {
    setNoti({
      ...noti,
      // followNotifications: !noti.followNotifications
      followNotifications: e.target.checked
    });
  };

  const submitData = async () => {
    try {
      const tokenData = { 'x-access-token': idToken };
      const data = {
        notiOnOff: noti.allNotificationsDisable,
        comments: noti.postNotifications.comments,
        answer: noti.postNotifications.answer,
        question: noti.postNotifications.question,
        following: noti.followNotifications
      };
      const response = await axios.patch(`${USER_API}/users/settings`, data, {
        headers: tokenData
      });
      console.log('::settings data::', data);
      console.log('::settings submit::', response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !initState ? initChecker() : submitData();
  }, [noti]);

  return (
    <Wrapper>
      <Title>Email & Notification</Title>

      <SubTitle>All Notifications Disable</SubTitle>
      <CheckboxWrapper>
        <Box>
          <Checkbox
            onChange={onChangeAllNotificationCheckBox}
            // defaultChecked={noti.allNotificationsDisable}
            defaultChecked={notification.notiOnOff}
            checked={noti.allNotificationsDisable}
          >
            Disabling notifications about post, Follower or Following and all
            kind of Budy messages.
          </Checkbox>
        </Box>
      </CheckboxWrapper>

      <SubTitle>Post Notifications</SubTitle>
      <CheckboxWrapper>
        <Box disabled={noti.allNotificationsDisable}>
          <Checkbox
            name="comments"
            onChange={onChangePostNotificationCheckbox}
            // defaultChecked={noti.postNotifications.comments}
            defaultChecked={notification.comments}
            checked={noti.postNotifications.comments}
            disabled={noti.allNotificationsDisable}
          >
            Notify me when someone add comments to my posts.
          </Checkbox>
        </Box>
        <Box disabled={noti.allNotificationsDisable}>
          <Checkbox
            name="answer"
            onChange={onChangePostNotificationCheckbox}
            // defaultChecked={noti.postNotifications.answer}
            defaultChecked={notification.answer}
            checked={noti.postNotifications.answer}
            disabled={noti.allNotificationsDisable}
          >
            Notify me when someone add Answer to my posts.
          </Checkbox>
        </Box>
        <Box disabled={noti.allNotificationsDisable}>
          <Checkbox
            name="question"
            onChange={onChangePostNotificationCheckbox}
            // defaultChecked={noti.postNotifications.question}
            defaultChecked={notification.question}
            checked={noti.postNotifications.question}
            disabled={noti.allNotificationsDisable}
          >
            Notify me when someone ask a question to me.
          </Checkbox>
        </Box>
      </CheckboxWrapper>

      <SubTitle>Follow Notifications</SubTitle>
      <CheckboxWrapper>
        <Box disabled={noti.allNotificationsDisable}>
          <Checkbox
            onChange={onChangeFollowNotificationCheckbox}
            // defaultChecked={noti.followNotifications}
            defaultChecked={notification.following}
            checked={noti.followNotifications}
            disabled={noti.allNotificationsDisable}
          >
            Notify me when someone started to following me.
          </Checkbox>
        </Box>
      </CheckboxWrapper>
    </Wrapper>
  );
};

export default EmailNotification;
