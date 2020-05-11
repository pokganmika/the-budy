import React from 'react';
import styled from 'styled-components';

import CheckSquareFill from './Icon/check-square-fill.svg';

export default function Icons({
  type,
  className,
  cursor,
  display,
  size,
  margin,
  padding,
  onClick
}) {
  return type ? (
    <Box
      className={className || null}
      display={display}
      margin={margin}
      padding={padding}
      size={size}
      cursor={cursor}
      onClick={onClick}
    >
      {type === 'check-square-fill' && <img src={CheckSquareFill} alt={type} />}
    </Box>
  ) : null;
}

const Box = styled.div`
  cursor: ${({ cursor }) => cursor || 'auto'};
  display: ${({ display }) => display || 'block'};
  width: ${({ size }) => size || '24px'};
  height: ${({ size }) => size || '24px'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '0px'};
  line-height: 0;
`;
