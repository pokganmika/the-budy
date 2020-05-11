import React from 'react';
import styled from 'styled-components';
import Icon from '../../Modules/Icon';

const Tag = ({ type, text, active, margin }) => {
  if (type === 'topic') {
    if (active === true) {
      return <Box active={active}>{text}</Box>;
    }
    return <Box>{text}</Box>;
  }

  if (type === 'question') {
    return (
      <Box background="#000000" color="#ffffff" margin={margin}>
        <Wrapper display="flex" alignItems="center">
          <Icon type="question-mark-circle" size="16px" margin="0px 4px 0px 0px" color="#ffffff"/>
          <Wrapper margin="0px 0px 0px 4px">QUESTION</Wrapper>
        </Wrapper>
      </Box>
    );
  }

  if (type === 'article') {
    return (
      <Box
        background="#ffffff"
        border="solid 1px #000000"
        color="black"
        margin={margin}
      >
        <Wrapper>
          <Icon type="edit" size="16px" margin="0px 4px 0px 0px" />
          <Wrapper margin="0px 0px 0px 4px">ARTICLE</Wrapper>
        </Wrapper>
      </Box>
    );
  }

  return null;
};

const Box = styled.div`
  display: inline-block;
  border-radius: 4px;
  border: ${({ border }) => (border ? border : 'none')};
  background-color: ${({ active, background }) =>
    active === true
      ? 'rgba(0, 0, 0, 0.1)'
      : background
      ? background
      : '#f0f0f0'};
  font-size: 12px;
  font-weight: 600;
  color: ${({ color }) => (color ? color : 'rgba(0, 0, 0, 0.4)')};
  margin: ${({ margin }) => (margin ? margin : '0px')};
  padding: ${({ padding }) => (padding ? padding : '4px 8px')};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Tag;
