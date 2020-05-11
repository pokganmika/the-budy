import React, { useState } from 'react';
import styled from 'styled-components';

const InputBox = ({
  type,
  placeholder,
  name,
  value,
  Icon,
  label,
  border,
  color,
  width,
  height,
  margin,
  padding,
  background,
  disabled,
  innerColor,
  onChange,
  focusIn,
  focusOut,
  textArea
}) => {
  const [isFocus, setFocus] = useState(null);

  return (
    <Box
      isFocus={isFocus}
      border={border}
      color={color}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      background={background}
    >
      <Wrapper>
        {textArea ? (
          <TextArea
            placeholder={placeholder ? placeholder : ''}
            maxLength="200"
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <>
            <Input
              type={type === 'password' ? type : null}
              placeholder={placeholder ? placeholder : ''}
              name={name}
              value={value}
              disabled={disabled ? 'disabled' : ''}
              innerColor={innerColor}
              onChange={onChange}
              onFocus={() => setFocus(true)}
              onBlur={async () => setFocus(focusOut ? await focusOut() : null)}
            />
            {Icon && (
              <IconWrapper>
                {label && <Label>{label}</Label>}
                {Icon}
              </IconWrapper>
            )}
          </>
        )}
      </Wrapper>
    </Box>
  );
};

const Box = styled.div`
  border: ${({ isFocus }) =>
    isFocus === null
      ? 'solid 1px #999999'
      : isFocus === true
      ? 'solid 1px #008695'
      : isFocus === false && 'solid 1px #ed3a4b'};
  background-color: ${({ isFocus, background }) =>
    isFocus === false ? '#fdebed' : background ? background : '#ffffff'};
  color: ${({ color }) => color || '#2e2e2e'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '48px'};
  margin: ${({ margin }) => margin || '0px'};
  border-radius: 4px;
  box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0px 16px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 12px;
  color: #000000;
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  /* height: 100%; */
  border: none;
  outline: none;
  font-size: 15px;
  min-width: 50px;
  color: ${({ innerColor }) => innerColor || '#000000'};
  background-color: transparent;
  ::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin-left: 33px;
`;

const TextArea = styled.textarea`
  width: 392px;
  height: 80px;
  border: none;
  outline: none;
  overflow: hidden;
  resize: none;
  color: rgba(0, 0, 0, 0.6);
`;

export default InputBox;
