import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import budyWordmark from '../../../Images/budy_Wordmark.svg';
import Image from '../../Elements/Image';
import CreatePostBtn from '../Buttons/CreatePostBtn';
import SearchBtn from '../../../Container/Tooltips/SearchBtn';
import NoticeBtn from '../../../Container/Tooltips/NoticeBtn';
import PersonalMenuBtn from '../Buttons/PersonalMenuBtn';
import { PrimaryBtn } from '../../Elements/Buttons/SolidButton';
import { SecondaryBtn } from '../../Elements/Buttons/BorderButton';

function Navigation({ type, location }) {
  return (
    <Nav>
      <div className="logo">
        <Image
          src={budyWordmark}
          link="/"
          cursor="pointer"
          width="65px"
          height="25px"
          cover="none"
        />
      </div>
      {['/ask-to-budy', '/terms-of-service'].includes(
        location.pathname
      ) ? null : (
        <div className="actions">
          {pathNameCheck(location.pathname) && <SearchBtn />}
          {type === 'login' && (
            <Fragment>
              <NoticeBtn size="20px" />
              <PersonalMenuBtn />
              <CreatePostBtn />
            </Fragment>
          )}
          {type === 'logout' && (
            <Fragment>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <SecondaryBtn
                  className="login"
                  text="Login"
                  size="small"
                  width="80px"
                  state="hovered"
                />
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <PrimaryBtn
                  className="get-started"
                  text="GET STARTED"
                  size="small"
                  width="120px"
                  state="hovered"
                />
              </Link>
            </Fragment>
          )}
        </div>
      )}
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1064px;
  margin: 0 auto;
  height: 100%;
  .logo {
    min-width: 105px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 0px 16px;
  }
  .login {
    margin-right: 16px;
  }
  @media (max-width: 530px) {
    display: none;
  }
`;

const pathNameCheck = (pathname) =>
  pathname.slice(1, 7) === 'search' ? false : true;

export default withRouter(Navigation);
