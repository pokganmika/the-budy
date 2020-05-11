import React from 'react';
import styled from 'styled-components';

import InputBox from './ShortBioTextarea';

const Container = styled.div`
  width: 100%;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
`;

const Text = styled.div`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: ${({ color }) => (color ? color : '#666666')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '0')};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
  margin: ${({ marginVertical }) => (marginVertical ? marginVertical : '0')};
`;

const CharacterCount = styled.div`
  width: 51px;
  height: 24px;
  border-radius: 12px;
  background-color: #e6e6e6;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

function ShortBioInput({
  placeholder,
  value,
  validateState,
  onChange,
  onBlur
}) {
  return (
    <Container>
      <Text fontWeight="600">Short Bio</Text>
      <InputBox
        placeholder={placeholder}
        margin="8px 0"
        width="inherit"
        height="104px"
        name="shortBio"
        value={value}
        onChange={onChange}
        focusOut={onBlur}
        textArea={true}
      />
      <CharacterCount>
        {`${200 - value.length === 0 ? '' : '+'}${200 - value.length}`}
      </CharacterCount>
    </Container>
  );
}

export default ShortBioInput;
