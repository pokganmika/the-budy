import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../../../../App/context';
import Image from '../../../../Common/Elements/Image';
import { greyscales } from '../../../../Common/Styles/Colors';

const SideUsersWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: 40px;
  .side-user-title {
    width: 100%;
    height: 48px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: ${greyscales[900]};
    border-bottom: 1px solid ${greyscales[200]};
  }
  .side-user-list {
    width: 100%;
    height: 64px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .side-user-list-profile {
      display: flex;
      align-items: center;
      .side-user-list-name {
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
        color: ${greyscales[900]};
        margin-left: 8px;
        cursor: pointer;
      }
    }
    .side-user-follow-button {
      width: 84px;
      height: 32px;
      border-radius: 8px;
    }
  }
  .side-user-more {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 530px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background-color: ${greyscales[100]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreIcon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
`;

/**
 *
 * @param {string} keyword
 * @param {array} usersData
 */
function SideUsersList({ history, keyword, usersData }) {
  const [appState] = useContext(AppContext);
  // console.log('::SideUsersList usersData:: ---> : ', usersData);
  const moveSearchDetail = () => {
    history.push(`/search/${keyword}/users`);
    window.scrollTo(0, 0);
  };

  const moveUsersDetail = id => {
    appState.user.budyId === id
      ? history.push('/mypage/profile')
      : history.push(`/userpage/${id}/profile`);
    window.scrollTo(0, 0);
  };

  return (
    <SideUsersWrapper>
      <div className="side-user-title">USERS</div>

      {usersData.map((user, index) => {
        if (index < 10) {
          // console.log('::SideUsersList usersData:: ---> : ', user);
          return (
            <div className="side-user-list" key={index}>
              <div className="side-user-list-profile">
                <Image
                  type="profile"
                  src={user.ImageUrl.small}
                  width="32px"
                  height="32px"
                  onClick={() => moveUsersDetail(user.BudyId)}
                />
                <div
                  className="side-user-list-name"
                  onClick={() => moveUsersDetail(user.BudyId)}
                >
                  {user.DisplayName}
                </div>
              </div>
            </div>
          );
        }
      })}

      {
        usersData.length > 10 && (
          <div className="side-user-more">
            <IconWrapper onClick={moveSearchDetail}>
              <MoreIcon className="budy-more-horizontal" />
            </IconWrapper>
          </div>
        )}
    </SideUsersWrapper>
  );
}

SideUsersList.propTypes = {
  keyword: PropTypes.string.isRequired,
  usersData: PropTypes.array.isRequired
};

export default withRouter(SideUsersList);
