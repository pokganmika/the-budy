import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { greyscales, primary, white } from '../Styles/Colors';

function Textarea({
  className,
  type,
  value,
  placeholder,
  coverImage,
  initText,
  onChange
}) {
  const [isFocus, setFocus] = useState(false);
  const _type = type || 'question';
  const _value = value || '';
  const _placeholder =
    placeholder || 'Ask with summarize what you want to know ...';
  const _coverImage = coverImage || null;
  const _maxLength = _type === 'article' ? 100 : 150;
  const _rowsMax = _type === 'article' ? 3 : 4;

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const length = textarea.value.length;
    textarea.focus();
    textarea.setSelectionRange(length, length);
  }, []);

  return (
    <View name="textarea-view" className={className}>
      <TextBox isFocus={isFocus} type={_type} coverImage={_coverImage}>
        <TextareaAutosize
          className="textarea"
          ref={textareaRef}
          value={_value}
          onChange={e => (onChange ? onChange(e) : null)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          rowsMax={_rowsMax}
          maxLength={_maxLength}
          placeholder={_placeholder}
        />
        {_value && _value.length > 0 && (
          <Icon coverImage={_coverImage}>
            <span
              className="budy-x"
              onClick={() => (initText ? initText() : null)}
            />
          </Icon>
        )}
      </TextBox>
      <CountBox coverImage={_coverImage}>
        +{_value.length > 0 ? _maxLength - _value.length : _maxLength}
      </CountBox>
    </View>
  );
}

const View = styled.div``;

const TextBox = styled.div`
  caret-color: ${({ coverImage }) => (coverImage ? white : greyscales[900])};
  display: flex;
  padding: ${({ type }) => (type === 'article' ? '12px 0px' : '8px 0px')};
  border-bottom: solid 1px
    ${({ isFocus, coverImage }) =>
      isFocus ? primary[500] : coverImage ? greyscales[200] : greyscales[400]};
  .textarea {
    width: 100%;
    background: none;
    color: ${({ coverImage }) => (coverImage ? white : greyscales[900])};
    border: none;
    outline: none;
    margin: 0px;
    padding: 0px;
    font-size: ${({ type }) => (type === 'article' ? '48px' : '18px')};
    line-height: ${({ type }) => (type === 'article' ? '1.15' : '1.35')};
    font-weight: 500;
    resize: none;
    ::placeholder {
      color: ${({ coverImage }) =>
        coverImage ? 'rgba(255, 255, 255, 0.6)' : greyscales[400]};
    }
  }
`;

const Icon = styled.div`
  cursor: pointer;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .budy-x {
    font-size: 16px;
    color: ${({ coverImage }) => (coverImage ? white : greyscales[800])};
  }
`;

const CountBox = styled.div`
  text-align: end;
  line-height: 1.3;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ coverImage }) => (coverImage ? white : greyscales[800])};
`;

export default Textarea;
