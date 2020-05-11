import React from 'react';
import Button from '../../Styles/Button';
import Text from '../../Styles/Text';
import { DefaultState, SecondaryState } from '../../Styles/ButtonStates';

const SecondaryBtn = ({
  className,
  text,
  size,
  width,
  state,
  Icon,
  onClick
}) => {
  const initialState = SecondaryState['normal'];
  const selectedState = SecondaryState[state];
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

const DefaultBtn = ({ className, text, size, width, state, Icon, onClick }) => {
  const initialState = DefaultState['normal'];
  const selectedState = DefaultState[state];
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

export { SecondaryBtn, DefaultBtn };
