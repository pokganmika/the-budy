import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import SearchInput from '../../Common/Elements/TextFields/SearchInput';
import styled from 'styled-components';

const SearchBtn = ({ history, viewPortType }) => {
  const [searchValue, setSearchValue] = useState('');
  const onChangeSearchValue = e => setSearchValue(e.target.value);
  const keyPressSearchValue = e => {
    if (e.key === 'Enter' && searchValue.length !== 0) {
      history.push(`/search/${searchValue}/articles`);
      window.scrollTo(0, 0);
    }
  };
  const clickSearchValue = () => {
    searchValue.length !== 0 && history.push(`/search/${searchValue}/articles`);
    window.scrollTo(0, 0);
  };

  let button = (
    <SearchInput
      margin="0px 24px"
      onChange={onChangeSearchValue}
      onKeyPress={keyPressSearchValue}
      searchHandler={clickSearchValue}
    />
  );
  if (viewPortType === 'mobile') {
    button = (
      <Button>
        <span
          className="budy-search"
          style={{ fontSize: '24px' }}
          onClick={() => history.push('/m-search')}
        />
      </Button>
    );
  }
  return button;
};

const Button = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export default withRouter(SearchBtn);
