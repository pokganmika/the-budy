import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 40px;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: ${({location}) => (location ? location : 'center')};
  /* text-align: center; */
  color: #012a39;
  margin-top: 24px;
  margin-bottom: 24px;
  /* margin-left: ${({location}) => (!location && '16px')}; */
`;

function Greeting({ greeting, location }) {
  return (
    <Container location={location}>{greeting}</Container>
  );
};

export default Greeting;
