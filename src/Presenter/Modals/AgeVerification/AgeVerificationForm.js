import React, { useState } from 'react';
import styled from 'styled-components';
import budyWordmark from '../../../Images/budy_Wordmark.svg';
import Image from '../../../Common/Elements/Image';
import AntdCheckBox from '../../../Common/Modules/AntdCheckBox';
import UserTerms from '../../../Common/Collections/UserTerms';
import PrimaryBtn from '../../../Common/Elements/Buttons/PrimaryBtn';

function AgeVerificationForm() {
  const [checked, setCheck] = useState(false);

  const handleChage = () => {
    setCheck(prevChecked => !prevChecked);
  };

  return (
    <Form>
      <Wrapper>
        <Image src={budyWordmark} width="80px" height="32px" margin="0 auto" />
      </Wrapper>

      <Title>
        Welcome to Budy!
        <br />
        Are you Legally an Adult In your Country?
      </Title>

      <Text>
        "Yes, I'm definitely Legal age or am otherwise a qualified patient."
      </Text>

      <Wrapper>
        <AntdCheckBox
          checked={checked}
          label="Also, Remember me"
          onChange={handleChage}
        />
      </Wrapper>

      <PrimaryBtn text="Enter" />
      <UserTerms />
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  width: 464px;
  height: 523px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px 40px;
  @media (max-width: 530px) {
    width: 327px;
    height: 558px;
  }
`;

const Title = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: center;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 1.71;
  letter-spacing: 0.2px;
  color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  text-align: center;
`;

export default AgeVerificationForm;
