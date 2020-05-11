import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  border: ${({ isFocus }) => (
    isFocus === null ? 'solid 1px #999999'
    : isFocus === true ? 'solid 1px #008695'
    : isFocus === false && 'solid 1px #ed3a4b'
  )};
  background-color: #ffffff;
  color: ${({ color }) => color || '#2e2e2e'};
  width: ${({ width }) => width || "auto"};
  height: 104px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  overflow: visible;
  resize: none;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  padding: 16px;
`;

const InputBox = ({
  placeholder,
  name,
  value,
  onChange,
  background,
  color,
  width,
  height,
  margin
}) => {
  const [isFocus, setFocus] = useState(null);
  return (
    <Box
      isFocus={isFocus}
      background={background}
      color={color}
      width={width}
      height={height}
      margin={margin}
    >
      <TextArea 
        placeholder={placeholder ? placeholder : ''}
        maxLength='200'
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(null)}
      />
    </Box>
  );
}

export default InputBox;
