import React from "react";
import styled from "styled-components";
import Icon from "../../Modules/Icon";

function EmailBtn({ onClick, width, height, margin, text }) {
  return (
    <Button width={width} height={height} margin={margin} onClick={onClick}>
      <div>
        <Icon type="email" size="20px" color="#ffffff" />
      </div>
      <Text display="block" margin="0px 0px 0px 8px">
        {text ? text : "Sign up with Email"}
      </Text>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 8px;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "56px")};
  margin: ${({ margin }) => (margin ? margin : "0px")};
  padding: 16px;
  background-color: #008695;
  cursor: pointer;
`;

const Text = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  width: 100%;
`;

export default EmailBtn;
