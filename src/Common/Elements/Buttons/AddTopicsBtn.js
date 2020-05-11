import React from 'react';
import styled from 'styled-components';
import { primary } from '../../Styles/Colors';

const AddTopicsBtn = ({ className, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      <span className="budy-plus-circle" />
      <span className="label">Add Topics</span>
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${primary[500]};
  .budy-plus-circle {
    font-size: 20px;
  }
  .label {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.45;
  }
`;

export default AddTopicsBtn;
