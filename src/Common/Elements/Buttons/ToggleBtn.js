import React from "react";
import styled from "styled-components";
import Icon from "../../Modules/Icon";

const PlusBtn = ({ onClick, background, iconColor, border }) => {
  return (
    <Button onClick={onClick} background={background}>
      <Icon
        type="plus-outline"
        cursor="pointer"
        color={iconColor || "#ffffff"}
        border={border}
      />
    </Button>
  );
};

const DeleteBtn = ({ onClick, background, iconColor, border }) => {
  return (
    <Button
      onClick={onClick}
      background={background || "#ffffff"}
      border={border}
    >
      <Icon
        type="close-outline"
        cursor="pointer"
        color={iconColor || "#000000"}
      />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  border-radius: 4px;
  font-family: 'Work Sans', sans-serif;
  background-color: ${({ background }) => background || "#000000"};
  width: 32px;
  height: 32px;
  font-weight: 500;
  outline: none;
  border: none;
  cursor: pointer;
  border: ${({ border }) => border || "none"};
  padding: 0px;
  justify-content: center;
  align-items: center;
`;

export { PlusBtn, DeleteBtn };
