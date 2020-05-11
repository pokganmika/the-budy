import React from 'react';
import styled from 'styled-components';

const BasicBtn = ({
  className,
  display,
  disabled,
  text,
  width,
  height,
  background,
  fontSize,
  fontWeight,
  padding,
  margin,
  color,
  border,
  onClick,
  type
}) => {
  return (
    <Button
      className={className || null}
      display={display}
      width={width}
      height={height}
      background={background}
      fontSize={fontSize}
      fontWeight={fontWeight}
      padding={padding}
      margin={margin}
      color={color}
      border={border}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text || 'Basic Button'}
    </Button>
  );
};

const Button = styled.button`
  display: ${({ display }) => display || 'block'};
  border-radius: 4px;
  line-height: 1;
  background-color: ${({ background, disabled }) =>
    background ? background : disabled ? 'rgba(0, 0, 0, 0.2)' : '#000000'};
  color: ${({ color, disabled }) =>
    color ? color : disabled ? 'rgba(0, 0, 0, 0.4)' : '#ffffff'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '32px'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '8px'};
  border: ${({ border }) => border || 'none'};
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;

export default BasicBtn;
