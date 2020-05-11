import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { greyscales, white } from '../../../Common/Styles/Colors';

function SideFooter({ history }) {
  return (
    <Box>
      <About>
        <Text onClick={() => history.push('/helpcenter')}>About us</Text>
        {/* <Bar>|</Bar>
        <Text onClick={() => history.push('/helpcenter')}>Help center</Text> */}
        <Bar>|</Bar>
        <Text onClick={() => history.push('/terms-of-service')}>Terms of service</Text>
        <Bar>|</Bar>
        <Text onClick={() => history.push('/privacy-policy')}>Privacy policy</Text>
        <Bar>|</Bar>
        <Text onClick={() => history.push('/ask-to-budy')}>Contact</Text>
      </About>
       <Copyright> {new Date().getFullYear().toString() } GANA Networks LLC. © All rights reserved.</Copyright>
    </Box>
  );
}

const Box = styled.div`
  border: solid 1px ${greyscales[200]};
  background-color: ${white};
  box-shadow: 0 4px 40px 0 rgba(45, 53, 54, 0.08);
  border-radius: 4px;
`;

const Copyright = styled.div`
  font-size: 12px;
  color: ${greyscales[900]};
  min-height: 16px;
  line-height: 1;
  padding: 16px;
`;

const About = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${greyscales[900]};
  cursor: pointer;
  line-height: 1.4;
  :hover {
    text-decoration: underline;
  }
`;

const Bar = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${greyscales[500]};
  margin: 0px 8px;
  line-height: 1.4;
`;

export default withRouter(SideFooter);
