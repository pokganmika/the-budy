import React, { useState } from "react";
import styled from "styled-components";

import { 
  Medium,
  Facebook,
  Youtube,
  Twitter
} from '../../../Presenter/Pages/MyPage/MyPageForm/Icons';

const SocialLinkInput = ({
  name,
  value,
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
    {
      name === 'medium'
      ? <Medium 
          type='social-link'
          color={value.length !== 0 && true}
        />
      : name === 'facebook'
      ? <Facebook 
          type='social-link'
          color={value.length !== 0 && true}
        />
      : name === 'youtube'
      ? <Youtube 
          type='social-link'
          color={value.length !== 0 && true}
        />
      : name === 'twitter'
      && <Twitter 
          type='social-link'
          color={value.length !== 0 && true}
        />
    }
      <Wrapper>
        <Input
          placeholder='Add Link to your Profile'
          name={name}
          value={value}
          disabled={(disabled) ? 'disabled' : ''}
          innerColor={innerColor}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={async () => {
            if (focusOut) {
              setFocus(await focusOut());
            } else {
              setFocus(null);
            }
          }}
        />
      </Wrapper>
    </Box>
  );
};

const Box = styled.div`
  border: ${({ isFocus }) => (
    isFocus === null ? 'solid 1px #999999'
    : isFocus === true ? 'solid 1px #008695'
    : isFocus === false && 'solid 1px #ed3a4b'
  )};
  background-color: ${({ isFocus, background }) => (
    isFocus === false ? '#fdebed' 
    : background ? background
    : '#ffffff'
  )};
  color: ${({ color }) => color || '#2e2e2e'};
  /* color: ${({ color }) => color || "rgba(0, 0, 0, 0.25)"}; */
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "48px"};
  margin: ${({ margin }) => margin || '0px'};
  margin: 16px 0;
  border-radius: 4px;
  box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0px 16px;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
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

export default SocialLinkInput;
