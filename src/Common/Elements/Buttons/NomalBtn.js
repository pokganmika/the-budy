import React from 'react';
import styled from 'styled-components';

const NomalBtn = ({
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
      {text || 'Nomal Button'}
    </Button>
  );
};

const Button = styled.button`
  border-radius: 4px;
  line-height: 1.2;
  font-family: 'Work Sans', sans-serif;
  background-color: ${({ background }) => background || '#ffffff'};
  color: ${({ color }) => color || '#000000'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '48px'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '14px 16px'};
  outline: none;
  border: solid 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export default NomalBtn;
