import styled from 'styled-components';

const Text = styled.div`
  color: ${({ fontColor }) => fontColor || '#ffffff'};
  font-size: ${({ size }) =>
    size === 'large'
      ? '18px'
      : size === 'medium'
      ? '16px'
      : size === 'small'
      ? '14px'
      : '16px'};
  font-weight: ${({ size }) =>
    size === 'large'
      ? '600'
      : size === 'medium'
      ? '500'
      : size === 'small'
      ? '500'
      : '500'};
  margin-left: ${({ icon, size }) =>
    icon && size === 'large'
      ? '11px'
      : icon && size === 'medium'
      ? '8.5px'
      : icon && size === 'small'
      ? '4.5px'
      : '0px'};
`;

export const DangerText = styled.div`
  /* color: ${({ state }) => (state === 'hovered' ? '#ed3a4b' : '#ffffff')};
  &:hover {
    color: ${({ state }) => state === 'hovered' && '#ffffff'};
  } */
  font-size: ${({ size }) =>
    size === 'large'
      ? '18px'
      : size === 'medium'
      ? '16px'
      : size === 'small'
      ? '14px'
      : '16px'};
  font-weight: ${({ size }) =>
    size === 'large'
      ? '600'
      : size === 'medium'
      ? '500'
      : size === 'small'
      ? '500'
      : '500'};
  margin-left: ${({ icon, size }) =>
    icon && size === 'large'
      ? '11px'
      : icon && size === 'medium'
      ? '8.5px'
      : icon && size === 'small'
      ? '4.5px'
      : '0px'};
`;

export default Text;
