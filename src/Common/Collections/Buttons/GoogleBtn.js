import React from "react";
import styled from "styled-components";
import Icon from "../../Modules/Icon";

function GoogleBtn({ OAuth, width, height, margin, text }) {
  return (
    <Button width={width} height={height} margin={margin} onClick={OAuth}>
      <div>
        <Icon type="google" size="20px" />
      </div>
      <Text>{text ? text : "Continue with Google"}</Text>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: solid 1px #999999;
  border-radius: 8px;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "56px")};
  margin: ${({ margin }) => (margin ? margin : "0px")};
  padding: 16px;
  background-color: #ffffff;
  cursor: pointer;
`;

const Text = styled.div`
  color: #0a0a0a;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  width: 100%;
`;

export default GoogleBtn;
