import React, {useState} from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';

const AntdCheckBox = ({ checked, disabled, onChange, label }) => {
  const [defaultChecked, setCheck] = useState(false);

  const handleChage = () => {
    setCheck(prevChecked => {
      onChange && onChange();
      return !prevChecked;
    });
  };

  if (label) {
    return (
      <Box>
        <Checkbox
          checked={checked || defaultChecked}
          disabled={disabled || false}
          onChange={handleChage}
        >
          {label}
        </Checkbox>
      </Box>
    );
  } else {
    return (
      <Checkbox checked={checked} disabled={disabled} onChange={onChange} />
    );
  }
};

const Box = styled.div`
  display: inline-block;
  .ant-checkbox + span {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
  }
`;

export default AntdCheckBox;
