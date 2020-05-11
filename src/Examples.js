import React from 'react';
import styled from 'styled-components';
import Image from './Common/Elements/Image';
import Icon from './Common/Modules/Icon';
import Tag from './Common/Elements/Tags/Tag';
import InputBox from './Common/Elements/TextFields/PrimaryInputBox';

import { PrimaryBtn, OnDarkBtn } from './Common/Elements/Buttons/SolidButton';
import {
  SecondaryBtn,
  DefaultBtn
} from './Common/Elements/Buttons/BorderButton';

import GoogleBtn from './Common/Collections/Buttons/GoogleBtn';
import FacebookBtn from './Common/Collections/Buttons/FacebookBtn';
import EmailBtn from './Common/Collections/Buttons/EmailBtn';
import CheckBox from './Common/Modules/AntdCheckBox';

const Examples = () => {
  return (
    <Container>
      <h1>Common Components examples</h1>

      <Title>IMAGE</Title>
      <Subtitle>Basic</Subtitle>
      <Contents>
        <Image src="https://images.unsplash.com/photo-1538611023136-84b24b785b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=428&h=214&q=60" />
      </Contents>
      <Subtitle>Profile</Subtitle>
      <Contents>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Klr4EYtcv0OwwG9e7N6zzY3djteVYCd3jkj4aP5kAap3LDEm&s"
          type="profile"
          width="32px"
          height="32px"
        />
      </Contents>

      <Title>ICON</Title>
      <Subtitle>Eva Icons</Subtitle>
      <Contents>
        <Icon display="inline-block" type="Weak" />
        <Icon display="inline-block" type="Strong" />
        <Icon display="inline-block" type="Good" />
        <Icon display="inline-block" type="search-outline" />
        <Icon display="inline-block" type="plus-square-outline" />
        <Icon display="inline-block" type="bell-notice" />
        <Icon display="inline-block" type="close-outline" />
        <Icon display="inline-block" type="question-mark-circle" />
        <Icon display="inline-block" type="edit" />
        <Icon display="inline-block" type="checkmark" />
        <Icon display="inline-block" type="edit2" />
        <Icon display="inline-block" type="edit-outline" />
        <Icon display="inline-block" type="eye" />
        <Icon display="inline-block" type="more-horizontal-outline" />
        <Icon display="inline-block" type="more-vertical-outline" />
        <Icon display="inline-block" type="external-link-outline" />
        <Icon display="inline-block" type="message-circle" />
        <Icon display="inline-block" type="arrow-up" />
        <Icon display="inline-block" type="arrow-down" />
        <Icon display="inline-block" type="bookmark" />
        <Icon display="inline-block" type="at-outline" />
        <Icon display="inline-block" type="plus-outline" />
        <Icon display="inline-block" type="plus-circle-outline" />
        <Icon display="inline-block" type="image-outline" />
        <Icon display="inline-block" type="video" />
        <Icon display="inline-block" type="link2-outline" />
        <Icon display="inline-block" type="arrow-downward-outline" />
        <Icon display="inline-block" type="arrow-upward-outline" />
        <Icon display="inline-block" type="paper-plane-outline" />
        <Icon display="inline-block" type="arrow-ios-upward-outline" />
        <Icon display="inline-block" type="arrow-ios-downward-outline" />
        <Icon display="inline-block" type="arrow-ios-back-outline" />
        <Icon display="inline-block" type="arrow-ios-forward-outline" />
        <Icon display="inline-block" type="question-mark-outline" />
        <Icon display="inline-block" type="list-outline" />
      </Contents>

      <Title>TAG</Title>
      <Subtitle>Topic Tag</Subtitle>
      <Contents>
        <Tag type="topic" text="TOPIC" />
        <Tag type="topic" text="TOPIC" active={true} />
      </Contents>
      <Subtitle>Cell Question Tag</Subtitle>
      <Contents>
        <Tag type="question" />
      </Contents>
      <Subtitle>Cell Article Tag</Subtitle>
      <Contents>
        <Tag type="article" />
      </Contents>

      <Title>BUTTON</Title>
      <Subtitle>Solid Button</Subtitle>
      <TypeContents>
        <Content>
          <div className="title">Params Type</div>
          <div>className: string</div>
          <div>onClick: function</div>
          <div>text: string</div>
          <div>Icon: component</div>
          <div>size: string -> 3types ("small", "medium", "large")</div>
          <div>width: string -> Free Form</div>
          <div>
            state: string -> 4types ("normal", "hovered", "pressed", "disabled")
          </div>
        </Content>
        <Content>
          <div className="title">Default Params</div>
          <div>className: random</div>
          <div>onClick: null</div>
          <div>text: null</div>
          <div>Icon: null</div>
          <div>size: "medium"</div>
          <div>width: "auto"</div>
          <div>state: "normal"</div>
        </Content>
      </TypeContents>

      <Label>Primary</Label>
      <Contents>
        <Content>
          <div className="title">Sizes</div>
          <div>
            <PrimaryBtn size="large" text="Sample Button" />
          </div>

          <PrimaryBtn size="medium" text="Sample Button" />
          <PrimaryBtn size="small" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">width</div>
          <PrimaryBtn width="auto" text="Sample Button" />
          <PrimaryBtn width="100%" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">States</div>
          <PrimaryBtn state="normal" text="Sample Button" />
          <PrimaryBtn state="hovered" text="Sample Button" />
          <PrimaryBtn state="pressed" text="Sample Button" />
          <PrimaryBtn state="disabled" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">Text width Icon</div>
          <PrimaryBtn
            size="large"
            text="Large"
            Icon={<Icon type="plus-outline" color="#ffffff" cursor="pointer" />}
          />
          <PrimaryBtn
            size="medium"
            text="Medium"
            Icon={<Icon type="plus-outline" color="#ffffff" cursor="pointer" />}
          />
          <PrimaryBtn
            size="small"
            text="Small"
            Icon={
              <Icon
                type="plus-outline"
                color="#ffffff"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
        <Content>
          <div className="title">Icon</div>
          <PrimaryBtn
            size="large"
            Icon={<Icon type="plus-outline" color="#ffffff" cursor="pointer" />}
          />
          <PrimaryBtn
            size="medium"
            Icon={<Icon type="plus-outline" color="#ffffff" cursor="pointer" />}
          />
          <PrimaryBtn
            size="small"
            Icon={
              <Icon
                type="plus-outline"
                color="#ffffff"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
      </Contents>
      <Label>On Dark</Label>
      <Contents>
        <Content>
          <div className="title">Sizes</div>
          <OnDarkBtn size="large" text="Sample Button" />
          <OnDarkBtn size="medium" text="Sample Button" />
          <OnDarkBtn size="small" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">width</div>
          <OnDarkBtn width="auto" text="Sample Button" />
          <OnDarkBtn width="100%" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">States</div>
          <OnDarkBtn state="normal" text="Sample Button" />
          <OnDarkBtn state="hovered" text="Sample Button" />
          <OnDarkBtn state="pressed" text="Sample Button" />
          <OnDarkBtn state="disabled" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">Text width Icon</div>
          <OnDarkBtn
            size="large"
            text="Large"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <OnDarkBtn
            size="medium"
            text="Medium"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <OnDarkBtn
            size="small"
            text="Small"
            Icon={
              <Icon
                type="plus-outline"
                color="#008695"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
        <Content>
          <div className="title">Icon</div>
          <OnDarkBtn
            size="large"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <OnDarkBtn
            size="medium"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <OnDarkBtn
            size="small"
            Icon={
              <Icon
                type="plus-outline"
                color="#008695"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
      </Contents>
      <Subtitle>Border Button</Subtitle>
      <Label>Secondary</Label>
      <Contents>
        <Content>
          <div className="title">Sizes</div>
          <SecondaryBtn size="large" text="Sample Button" />
          <SecondaryBtn size="medium" text="Sample Button" />
          <SecondaryBtn size="small" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">width</div>
          <SecondaryBtn width="auto" text="Sample Button" />
          <SecondaryBtn width="100%" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">States</div>
          <SecondaryBtn state="normal" text="Sample Button" />
          <SecondaryBtn state="hovered" text="Sample Button" />
          <SecondaryBtn state="pressed" text="Sample Button" />
          <SecondaryBtn state="disabled" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">Text width Icon</div>
          <SecondaryBtn
            size="large"
            text="Large"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <SecondaryBtn
            size="medium"
            text="Medium"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <SecondaryBtn
            size="small"
            text="Small"
            Icon={
              <Icon
                type="plus-outline"
                color="#008695"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
        <Content>
          <div className="title">Icon</div>
          <SecondaryBtn
            size="large"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <SecondaryBtn
            size="medium"
            Icon={<Icon type="plus-outline" color="#008695" cursor="pointer" />}
          />
          <SecondaryBtn
            size="small"
            Icon={
              <Icon
                type="plus-outline"
                color="#008695"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
      </Contents>
      <Label>Default</Label>
      <Contents>
        <Content>
          <div className="title">Sizes</div>
          <DefaultBtn size="large" text="Sample Button" />
          <DefaultBtn size="medium" text="Sample Button" />
          <DefaultBtn size="small" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">width</div>
          <DefaultBtn width="auto" text="Sample Button" />
          <DefaultBtn width="100%" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">States</div>
          <DefaultBtn state="normal" text="Sample Button" />
          <DefaultBtn state="hovered" text="Sample Button" />
          <DefaultBtn state="pressed" text="Sample Button" />
          <DefaultBtn state="disabled" text="Sample Button" />
        </Content>
        <Content>
          <div className="title">Text width Icon</div>
          <DefaultBtn
            size="large"
            text="Large"
            Icon={<Icon type="plus-outline" color="#2e2e2e" cursor="pointer" />}
          />
          <DefaultBtn
            size="medium"
            text="Medium"
            Icon={<Icon type="plus-outline" color="#2e2e2e" cursor="pointer" />}
          />
          <DefaultBtn
            size="small"
            text="Small"
            Icon={
              <Icon
                type="plus-outline"
                color="#2e2e2e"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
        <Content>
          <div className="title">Icon</div>
          <DefaultBtn
            size="large"
            Icon={<Icon type="plus-outline" color="#2e2e2e" cursor="pointer" />}
          />
          <DefaultBtn
            size="medium"
            Icon={<Icon type="plus-outline" color="#2e2e2e" cursor="pointer" />}
          />
          <DefaultBtn
            size="small"
            Icon={
              <Icon
                type="plus-outline"
                color="#2e2e2e"
                size="20px"
                cursor="pointer"
              />
            }
          />
        </Content>
      </Contents>
      <Subtitle>Google Button</Subtitle>
      <Contents>
        <GoogleBtn width="300px" />
        <GoogleBtn width="155px" text="Google" />
      </Contents>
      <Subtitle>Facebook Button</Subtitle>
      <Contents>
        <FacebookBtn width="300px" />
        <FacebookBtn width="155px" text="Facebook" />
      </Contents>
      <Subtitle>Email Button</Subtitle>
      <Contents>
        <EmailBtn width="300px" />
      </Contents>

      <Title>INPUT</Title>
      <Subtitle>Basic</Subtitle>
      <Contents>
        <InputBox width="300px" />
        <InputBox
          width="300px"
          color="#ed3a4b"
          background="rgba(237, 58, 75, 0.05)"
          value=""
          onChange={() => console.log('onChange')}
          focusIn={() => console.log('focusIn')}
          focusOut={() => console.log('focusOut')}
        />
      </Contents>
      <Subtitle>Password</Subtitle>
      <Contents>
        <InputBox width="300px" type="password" />
      </Contents>
      <Subtitle>with Icon</Subtitle>
      <Contents>
        <InputBox
          width="300px"
          Icon={<Icon type="close-outline" cursor="pointer" />}
        />
      </Contents>
      <Subtitle>with Icon + label</Subtitle>
      <Contents>
        <InputBox
          width="300px"
          Icon={<Icon type="Weak" color="red" />}
          label="Weak"
        />
      </Contents>

      <CheckBox />
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  background-color: #eaeaea;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  overflow: auto;
`;

const Contents = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-weight: 600;
  color: #2d3536;
  font-size: 32px;
  font-weight: bold;
  margin: 48px 0px;
  border-top: solid 10px #b8b8b8;
  padding-top: 20px;
`;

const Subtitle = styled.div`
  padding: 4px 0px;
  border-bottom: solid 1px #b8b8b8;
  font-size: 24px;
  font-weight: 600;
  color: #454545;
  margin-bottom: 40px;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #999999;
`;

const Content = styled.div`
  .title {
    margin: 16px 0px;
    font-size: 14px;
    font-weight: bold;
    color: #2d3536;
  }
  .row {
    display: flex;
  }
`;

const TypeContents = styled.div`
  display: flex;
  border: solid 1px;
  padding: 16px;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #ffffff;
  .title {
    font-size: 18px;
    margin: 0px;
  }
`;

export default Examples;
