import React, { useState } from 'react';
import styled from 'styled-components';
import { greyscales, white, black, sub } from '../../Styles/Colors';

function TopicSearchInput({
  placeholder,
  value,
  onChange,
  focusIn,
  focusOut,
  removeValue
}) {
  const [isFocus, _setFocus] = useState(false);

  return (
    <View isFocus={isFocus}>
      <span className="budy-search" />
      <InputBox>
        <Input
          type="text"
          placeholder={placeholder || 'Search here...'}
          maxLength="20"
          value={value}
          onChange={onChange}
          onFocus={() => _setFocus(() => (focusIn ? focusIn() : true))}
          onBlur={() => _setFocus(() => (focusOut ? focusOut() : false))}
        />
      </InputBox>
      {value.length > 0 && <span className="budy-x" onClick={removeValue} />}
    </View>
  );
}

const View = styled.div`
  border: solid 1px;
  border-color: ${({ isFocus }) => (isFocus ? greyscales[200] : sub[100])};
  border-radius: 4px;
  background-color: ${({ isFocus }) => (isFocus ? white : sub[100])};
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0px 16px;
  .budy-search {
    font-size: 16px;
    color: ${greyscales[500]};
  }
  .budy-x {
    font-size: 16px;
    color: ${black};
    cursor: pointer;
  }
  :hover {
    border: solid 1px ${greyscales[200]};
  }
`;

const InputBox = styled.div`
  width: 100%;
  margin-left: 8px;
  line-height: 1.5;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
  font-size: 16px;
  min-width: 50px;
  padding: 0;
  background-color: transparent;
  color: ${greyscales[900]};
  ::-webkit-input-placeholder {
    color: ${greyscales[400]};
  }
`;

export default TopicSearchInput;
