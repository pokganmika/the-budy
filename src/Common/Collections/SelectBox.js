import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

function SelectBox({ type, width, height, background, currentView, setView }) {
  const [isOpen, setOpen] = useState(false);

  const changeView = view => {
    setView(view);
    return setOpen(false);
  };

  return (
    <Box width={width} height={height} background={background} type={type}>
      <Select isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <div>{currentView}</div>
        <div className="select-icon">▼</div>
      </Select>
      {isOpen && (
        <Options height={height}>
          <Item name="Articles" onClick={e => changeView('Articles')}>
            Articles
          </Item>
          <Item name="Questions" onClick={e => changeView('Questions')}>
            Questions
          </Item>
        </Options>
      )}
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  border-radius: ${({ type }) => (type === 'desktop' ? '24px' : '4px')};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '40px'};
  background-color: ${({ type }) =>
    type === 'desktop' ? '#ffffff' : '#f1f1f1'};
  box-shadow: ${({ type }) =>
    type === 'desktop' ? '0 0 8px 0 rgba(0, 0, 0, 0.16)' : 'none'};
`;

const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 16px;
  margin: 0px 12px;
  cursor: ${({ isOpen }) => (isOpen ? 'default' : 'pointer')};
  .select-icon {
    font-size: 10px;
  }
`;

const Options = styled.div`
  position: absolute;
  left: 0px;
  top: ${({ height }) => {
    if (height) {
      const top = Number(height.slice(0, height.length - 2)) - 2;
      return `${top}px`;
    }
    return '38px';
  }};
  width: 100%;
  font-size: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const Item = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 8px 12px;
  display: block;
  width: 100%;
  text-align: start;
  background-color: #ffffff;
  border: none;
  outline: none;
  font-size: 16px;
  :hover {
    background-color: #efefef;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
`;

export default withRouter(SelectBox);
