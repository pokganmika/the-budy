import React from "react";
import styled from "styled-components";
import { white, primary } from "../../../Common/Styles/Colors";
import { OnDarkBtn } from "../../../Common/Elements/Buttons/SolidButton";

function BudyInfo({history}) {
  return (
    <Box>
      <Title>WHAT IS BUDY?</Title>
      <Text>
        <p>Hello and welcome to largest Cannabis Community Budy!.</p>
        <p>
          This place is a community for Cannabis Users to discuss, share, and
          post about anything Cannabis related. The world of Cannabis is
          exciting and oftentimes confusing. This space aims to provide a safe
          and conducive environment for the curious onlooker or newbees to learn
          more about Cannabis.
        </p>
        <p>
          If you’re interested in Cannabis Life or already knee deep in it,
          accept our finger heart and join us on Budy.
        </p>
      </Text>
      <OnDarkBtn
        text="Contact to BUDY"
        size="small"
        width="100%"
        state="hovered"
        onClick={() => {history.push('/ask-to-budy')}}
      />
    </Box>
  );
}

const Box = styled.div`
  background-color: ${primary[600]};
  box-shadow: 0 4px 40px 0 rgba(0, 40, 45, 0.08);
  border-radius: 4px;
  padding: 16px 18px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  color: ${white};
  font-size: 16px;
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 14px;
  color: ${primary[100]};
  margin: 16px 0px;
  min-height: 320px;
`;

export default BudyInfo;