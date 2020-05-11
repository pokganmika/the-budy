import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 16px 0;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.3);
`;

const Copyright = () => {
  return (
    <Container>
      {new Date().getFullYear().toString() } GANA Networks LLC. © All rights reserved.
    </Container>
  );
}

export default Copyright;
