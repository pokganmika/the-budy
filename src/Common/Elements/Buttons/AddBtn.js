import React from 'react';
import styled from 'styled-components';
import Icon from '../../Modules/Icon';

const AddBtn = ({ onClick, text, width, height, margin, padding }) => {
  return (
    <Button
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      onClick={onClick}
    >
      <Icon
        type="plus-outline"
        color="#ffffff"
        size="20px"
        margin="0px 8px 0px 0px"
        cursor="pointer"
      />
      <div>{text}</div>
    </Button>
  );
};

const AddBtnShadow = ({ onClick, text, width, height, margin, padding }) => {
  return (
    <Button
      width={width}
      height={height || '32px'}
      padding={padding || '8px'}
      fontSize="13px"
      margin={margin}
      background="#0074ff"
      boxShadow="0 2px 8px 1px rgba(0, 145, 255, 0.3)"
      onClick={onClick}
    >
      <Icon
        type="plus-outline"
        color="#ffffff"
        size="16px"
        margin="0px 4px 0px 0px"
        cursor="pointer"
      />
      <div>{text}</div>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  border-radius: 4px;
  line-height: 1.2;
  font-family: 'Work Sans', sans-serif;
  background-color: ${({ background }) => background || '#000000'};
  color: ${({ color }) => color || '#ffffff'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '48px'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '6px 16px'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  outline: none;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

export { AddBtn, AddBtnShadow };
