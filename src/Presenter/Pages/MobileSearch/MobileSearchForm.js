import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { primary, greyscales } from '../../../Common/Styles/Colors';

const Wrapper = styled.div`
  width: 100%;
  padding: 8px 16px;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 4px 0;
  border-bottom: 1px solid
    ${({ isValue }) => (isValue ? primary[500] : greyscales[500])};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background-color: transparent;
  color: ${greyscales[900]};
  ::-webkit-input-placeholder {
    color: ${greyscales[400]};
  }
  min-width: 50px;
`;

/**
 *
 * @param {string} value
 * @param {function} onChangeValue
 * @param {function} clearValue
 * @param {function} submitValue
 */
function MobileSearchForm({ value, onChangeValue, clearValue, submitValue }) {
  return (
    <Wrapper>
      <InputWrapper isValue={value.length !== 0}>
        <Input
          type="text"
          placeholder="Search here"
          maxLength="200"
          value={value}
          onChange={onChangeValue}
          onKeyPress={submitValue}
        />

        <Icon clearValue={clearValue} />
      </InputWrapper>
    </Wrapper>
  );
}

MobileSearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired
};

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = ({ clearValue }) => {
  return (
    <IconWrapper onClick={clearValue}>
      <span className="budy-x" />
    </IconWrapper>
  );
};

export default MobileSearchForm;
