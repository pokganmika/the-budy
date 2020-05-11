import React from 'react';
import styled from 'styled-components';
import Icon from '../Modules/Icon';

function EmptyTopic() {
  return (
    <Box>
      <Icon type="plus-outline" size="16px" color="#ffffff"/>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 4px;
  width: 48px;
  height: 24px;
  margin: 8px 8px 7px 0px;
  :last-child {
    margin-right: 0px;
  }
`;

export default EmptyTopic;
