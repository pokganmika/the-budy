import React from 'react';
import styled from 'styled-components';
import budyWordmark from '../../../Images/budy_Wordmark.svg';
import Image from '../../Elements/Image';
import SearchBtn from '../../../Container/Tooltips/SearchBtn';
import NoticeBtn from '../../../Container/Tooltips/NoticeBtn';
import PersonalMenuMobileBtn from '../Buttons/PersonalMenuMobileBtn';

function NavigationMobile({ type }) {
  return (
    <Nav>
      <div className="logo">
        <Image
          src={budyWordmark}
          link="/"
          width="65px"
          height="25px"
          cover="none"
        />
      </div>
      <div className="actions">
        <SearchBtn viewPortType="mobile" />
        {type === 'login' && <NoticeBtn />}
        <PersonalMenuMobileBtn />
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  display: none;
  height: 100%;
  justify-content: space-between;
  max-width: 1064px;
  margin: 0 auto;
  .logo {
    min-width: 105px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .actions {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 16px;
  }
  @media (max-width: 530px) {
    display: flex;
  }
`;

export default NavigationMobile;
