import React from 'react';
import styled from 'styled-components';

const PrimaryBtn = ({
  text,
  width,
  height,
  background,
  fontSize,
  fontWeight,
  padding,
  margin,
  onClick
}) => {
  return (
    <Button
      width={width}
      height={height}
      background={background}
      fontSize={fontSize}
      fontWeight={fontWeight}
      padding={padding}
      margin={margin}
      onClick={onClick}
    >
      {text || 'Primary Button'}
    </Button>
  );
};

const Button = styled.button`
  border-radius: 4px;
  line-height: 1.2;
  font-family: 'Work Sans', sans-serif;
  background-color: ${({ background }) => background || '#000000'};
  color: ${({ color }) => color || '#ffffff'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '48px'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '14px 16px'};
  outline: none;
  border: none;
  cursor: pointer;
`;

export default PrimaryBtn;
