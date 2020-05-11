import React from 'react';
import styled from 'styled-components';

import InputBox from '../../Elements/TextFields/PrimaryInputBox';
import Icon from '../../Modules/Icon';

// import {
//   CheckmarkOutline,
//   CheckmarkCircle2,
//   AlertCircle,
//   AlertTriangle,
// } from '@forefront-ux/react-eva-icons';

const Container = styled.div`
  width: 100%;
  /* margin: 16px 0; */
  margin-top: ${({marginTop}) => (marginTop ? marginTop : '0')};
  margin-bottom: ${({marginBottom}) => (marginBottom ? marginBottom : '0')};
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
  margin: 0;
`;

function PasswordInput({
  placeholder,
  label,
  name,
  value,
  validateState,
  onChange,
  onBlur,
  message,
  securityGrade,
  marginTop,
  marginBottom
}) {
  return (
    <Container 
      marginTop={marginTop} 
      marginBottom={marginBottom} 
    >
      <Text 
        fontWeight='600'
      >{label}</Text>
      <InputBox 
        placeholder={placeholder}
        margin='8px 0'
        width='inherit'
        label={securityGrade}
        type='password'
        Icon={
          securityGrade === 'Weak'
          ? <Icon type='Weak' color='#ed3a4b' />
          : securityGrade === 'Good'
          ? <Icon type='Good' color='#f7b500' />
          : securityGrade === 'Strong'
          ? <Icon type='Strong' color='#0074ff' /> 
          : null
        }
        name={name}
        value={value}
        onChange={onChange}
        focusOut={onBlur}
      />
      {message && (
        <Text
          color={message[0] === '8' ? 'rgba(0, 0, 0, 0.4)' : '#ed3a4b'}
          fontWeight='normal'
          paddingLeft='8px'
        >{message}</Text>
      )}
    </Container>
  );
}

export default PasswordInput;
