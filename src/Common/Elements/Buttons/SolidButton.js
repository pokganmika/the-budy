import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import Button, { DangerButton } from '../../Styles/Button';
import Text, { DangerText } from '../../Styles/Text';
import {
  PrimaryState,
  OnDarkState,
  DangerState
} from '../../Styles/ButtonStates';

const PrimaryBtn = ({ className, text, size, width, state, Icon, onClick }) => {
  const initialState = PrimaryState['normal'];
  const selectedState = PrimaryState[state];
  return (
    <Button
      name="primaryBtn"
      className={className}
      size={size}
      width={width}
      borderColor={state ? selectedState.borderColor : initialState.borderColor}
      backgroundColor={
        state ? selectedState.backgroundColor : initialState.backgroundColor
      }
      actionBorderColor={
        state ? selectedState.actionBorderColor : initialState.borderColor
      }
      actionBackColor={
        state ? selectedState.actionBackColor : initialState.backgroundColor
      }
      state={state}
      icon={Icon ? true : false}
      text={text ? true : false}
      onClick={e => (onClick ? onClick(e) : null)}
    >
      {Icon && Icon}
      {state === 'loading' && (
        <LodaerBox>
          <Loader className="loader" type="Oval" color="#ffffff" />
        </LodaerBox>
      )}
      {text && (
        <Text
          icon={Icon ? true : false}
          fontColor={state ? selectedState.fontColor : initialState.fontColor}
          size={size}
        >
          {text}
        </Text>
      )}
    </Button>
  );
};

const OnDarkBtn = ({ className, text, size, width, state, Icon, onClick }) => {
  const initialState = OnDarkState['normal'];
  const selectedState = OnDarkState[state];
  return (
    <Button
      className={className}
      size={size}
      width={width}
      borderColor={state ? selectedState.borderColor : initialState.borderColor}
      backgroundColor={
        state ? selectedState.backgroundColor : initialState.backgroundColor
      }
      actionBorderColor={
        state ? selectedState.actionBorderColor : initialState.borderColor
      }
      actionBackColor={
        state ? selectedState.actionBackColor : initialState.backgroundColor
      }
      state={state}
      icon={Icon ? true : false}
      text={text ? true : false}
      onClick={e => (onClick ? onClick(e) : null)}
    >
      {Icon && Icon}
      {text && (
        <Text
          fontColor={state ? selectedState.fontColor : initialState.fontColor}
          icon={Icon ? true : false}
          size={size}
        >
          {text}
        </Text>
      )}
    </Button>
  );
};

const DangerBtn = ({ className, text, size, width, state, Icon, onClick }) => {
  const initialState = DangerState['normal'];
  const selectedState = DangerState[state];
  return (
    <DangerButton
      className={className}
      size={size}
      width={width}
      borderColor={state ? selectedState.borderColor : initialState.borderColor}
      backgroundColor={
        state ? selectedState.backgroundColor : initialState.backgroundColor
      }
      actionBorderColor={
        state ? selectedState.actionBorderColor : initialState.borderColor
      }
      actionBackColor={
        state ? selectedState.actionBackColor : initialState.backgroundColor
      }
      state={state}
      icon={Icon ? true : false}
      text={text ? true : false}
      onClick={e => (onClick ? onClick(e) : null)}
    >
      {Icon && Icon}
      {text && (
        <DangerText state={state} icon={Icon ? true : false} size={size}>
          {text}
        </DangerText>
      )}
    </DangerButton>
  );
};

const LodaerBox = styled.div`
  width: 20px;
  height: 20px;
  .loader {
    width: 100%;
    height: 100%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export { PrimaryBtn, OnDarkBtn, DangerBtn };
