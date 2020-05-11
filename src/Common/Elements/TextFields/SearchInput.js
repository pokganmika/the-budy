import React, { useState } from 'react';
import styled from 'styled-components';
import { greyscales, white } from '../../Styles/Colors';

function SearchInput({
  className,
  placeholder,
  width,
  margin,
  focusIn,
  focusOut,
  value,
  onChange,
  onKeyPress,
  searchHandler
}) {
  const [isFocus, setFocus] = useState(false);

  return (
    <Box isFocus={isFocus} className={className} width={width} margin={margin}>
      <Input
        type="text"
        placeholder={placeholder || 'Search here'}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={() => setFocus(() => (focusIn ? focusIn() : true))}
        onBlur={() => setFocus(() => (focusOut ? focusOut() : false))}
      />
      <Icon>
        <span className="budy-search" onClick={searchHandler} />
      </Icon>
    </Box>
  );
}

const Box = styled.div`
  border: solid 1px;
  background-color: ${white};
  border-color: ${({ isFocus }) =>
    isFocus ? greyscales[200] : greyscales[400]};
  border-radius: 16px;
  display: flex;
  align-items: center;
  width: ${({ width }) => (width ? width : '100%')};
  max-width: 400px;
  margin: ${({ margin }) => (margin ? margin : '0px')};
  height: 32px;
  padding-left: 16px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 20px;
  outline: none;
  font-size: 14px;
  min-width: 50px;
  padding: 0;
  background-color: transparent;
  color: ${greyscales[900]};
  ::-webkit-input-placeholder {
    color: ${greyscales[400]};
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: 0px 8px;
  cursor: pointer;
  .budy-search {
    font-size: 16px;
    color: ${greyscales[600]};
  }
`;

export default SearchInput;
