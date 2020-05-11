import React from 'react';
import Header from '../../Elements/Header';
import Navigation from './Navigation';
import NavigationMobile from './NavigationMobile';

function GlobalHeader({ type }) {
  return (
    <Header name="global-header">
      <Navigation type={type} />
      <NavigationMobile type={type} />
    </Header>
  );
}

export default GlobalHeader;
