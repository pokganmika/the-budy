import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { white, greyscales } from '../../Common/Styles/Colors';

function Header({ name, children, location }) {
  const borderBottom =
  location.pathname === '/' || location.pathname === '/questions' ? false : true;
  
  return (
    <Box name={name} borderBottom={borderBottom}>
      {children}
    </Box>
  );
}

const Box = styled.header`
  position: sticky;
  width: 100%;
  height: 56px;
  left: 0;
  top: 0;
  background-color: #ffffff;
  border-bottom: solid 1px
    ${({ borderBottom }) => (borderBottom ? greyscales[200] : white)};
  z-index: 10;
`;

export default withRouter(Header);
