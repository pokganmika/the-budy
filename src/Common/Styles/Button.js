import styled from 'styled-components';

const Button = styled.button`
  cursor: ${({ state }) =>
    state === 'disabled'
      ? 'not-allowed'
      : state === 'loading'
      ? 'auto'
      : 'pointer'};
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border: ${({ borderColor }) =>
    borderColor ? 'solid 1px ' + borderColor : 'none'};
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ icon, text, size }) =>
    icon && text && size === 'large'
      ? '0px 27px 0px 24px'
      : icon && text && size === 'medium'
      ? '0px 16.5px 0px 16px'
      : icon && text && size === 'small'
      ? '0px 8.5px 0px 8px'
      : icon && size === 'large'
      ? '0px 16px'
      : icon && size === 'medium'
      ? '0px 12px'
      : icon && size === 'small'
      ? '0px 6px'
      : size === 'large'
      ? '0px 24px'
      : size === 'medium'
      ? '0px 16px'
      : size === 'small'
      ? '0px 8px'
      : '0px 16px'};
  height: ${({ size }) =>
    size === 'large'
      ? '56px'
      : size === 'medium'
      ? '48px'
      : size === 'small'
      ? '32px'
      : '48px'};
  ${({ state }) =>
    state === 'hovered'
      ? ':hover'
      : state === 'pressed'
      ? ':active'
      : 'hover'} {
    border: ${({ actionBorderColor }) => 'solid 1px ' + actionBorderColor};
    background-color: ${({ actionBackColor }) => actionBackColor};
  }
`;

export const DangerButton = styled.button`
  color: ${({ state }) => (state === 'hovered' ? '#ed3a4b' : '#ffffff')};
  &:hover {
    color: ${({ state }) => state === 'hovered' && '#ffffff'};
  }
  cursor: ${({ state }) =>
    state === 'disabled'
      ? 'not-allowed'
      : state === 'loading'
      ? 'auto'
      : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border: ${({ borderColor }) =>
    borderColor ? 'solid 1px ' + borderColor : 'none'};
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ icon, text, size }) =>
    icon && text && size === 'large'
      ? '0px 27px 0px 24px'
      : icon && text && size === 'medium'
      ? '0px 16.5px 0px 16px'
      : icon && text && size === 'small'
      ? '0px 8.5px 0px 8px'
      : icon && size === 'large'
      ? '0px 16px'
      : icon && size === 'medium'
      ? '0px 12px'
      : icon && size === 'small'
      ? '0px 6px'
      : size === 'large'
      ? '0px 24px'
      : size === 'medium'
      ? '0px 16px'
      : size === 'small'
      ? '0px 8px'
      : '0px 16px'};
  height: ${({ size }) =>
    size === 'large'
      ? '56px'
      : size === 'medium'
      ? '48px'
      : size === 'small'
      ? '32px'
      : '48px'};
  ${({ state }) =>
    state === 'hovered'
      ? ':hover'
      : state === 'pressed'
      ? ':active'
      : 'hover'} {
    border: ${({ actionBorderColor }) => 'solid 1px ' + actionBorderColor};
    background-color: ${({ actionBackColor }) => actionBackColor};
  }
`;

export default Button;
