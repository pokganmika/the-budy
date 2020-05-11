import React, { useState } from 'react';
import MobileSearchFrom from '../../Presenter/Pages/MobileSearch/MobileSearchForm';
import { withRouter } from 'react-router-dom';

function MobileSearch({ history }) {
  const [value, setValue] = useState('');

  const onChangeValue = e => setValue(e.target.value);
  const clearValue = () => setValue('');
  const submitValue = e => {
    e.key === 'Enter' &&
      value.length !== 0 &&
      history.push(`/search/${value}/articles`);
  };

  return (
    <MobileSearchFrom
      value={value}
      onChangeValue={onChangeValue}
      clearValue={clearValue}
      submitValue={submitValue}
    />
  );
}

export default withRouter(MobileSearch);
