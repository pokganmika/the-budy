import React from "react";
import styled from "styled-components";
import Icon from "../../Modules/Icon";

function FacebookBtn({ OAuth, width, height, margin, text, marginBottom }) {
  return (
    <Button
      width={width}
      height={height}
      margin={margin}
      marginBottom={marginBottom}
      onClick={OAuth}
    >
      <div>
        <Icon type="facebook" size="20px" color="#ffffff" />
      </div>
      <Text>{text ? text : "Continue with Facebook"}</Text>
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
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  padding: 16px;
  background-color: #356bc4;
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

export default FacebookBtn;
