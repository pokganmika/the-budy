import React, { useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import millify from 'millify';
import Loader from 'react-loader-spinner';
import Image from '../../../../Common/Elements/Image';
import { PrimaryBtn } from '../../../../Common/Elements/Buttons/SolidButton';
import { DefaultBtn } from '../../../../Common/Elements/Buttons/BorderButton';
import { primary, negativeReds } from '../../../../Common/Styles/Colors';

import useUserList from './useUserList';
import { UserCard, Message } from '../../MyPage/MyPageForm/Scroll/style';
import AppContext from '../../../../App/context';


const MainWrapper = styled.div`
  width: 632px;
  .content-status {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 530px) {
    width: 100%;
  }
`;

/**
 *
 * @param {string} idToken
 * @param {string} keyword
 */
function SearchUsers({ history, idToken, keyword }) {
  const [appState] = useContext(AppContext);
  const moveUserPage = budyId => {
    appState.user.budyId !== budyId
      ? history.push(`/userpage/${budyId}/profile`)
      : history.push('/mypage/profile');
  };
  
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, dataList, hasMore } = useUserList(
    pageNumber,
    idToken,
    keyword
  );
  const observer = useRef();
  const lastDataElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <MainWrapper>
      {dataList.length === 0 && !loading ? (
        <Message>NO USERS</Message>
      ) : (
          <>
            {dataList.map((data, index) => {
              return (
                <UserCard
                  ref={index === dataList.length - 1 ? lastDataElementRef : null}
                  key={index}
                  borderWidth={index === dataList.length - 1 ? "0px" : "1px"}
                >
                  <Image
                    src={data.ImageUrl.small}
                    type="profile"
                    width="80px"
                    height="80px"
                    onClick={() => moveUserPage(data.BudyId)}
                  />

                  <div className="usercard-profile-wrapper">
                    <div className="usercard-profile-header">
                      <div
                        className="usercard-profile-name-wrapper"
                        onClick={() => moveUserPage(data.BudyId)}
                      >
                        <div className="usercard-profile-username">
                          {data.DisplayName}
                        </div>
                        <div className="usercard-profile-budyid">
                          {data.BudyId}
                        </div>
                      </div>
                    </div>

                    <div className="usercard-profile-shortbio">
                      {data.AboutMe}
                    </div>

                    <div className="usercard-profile-divider" />

                    <div className="usercard-profile-countdata-wrapper">
                      <div className="usercard-profile-countdata">
                        {`Followed by ${millify(data.FollowerCount, {
                          precision: 1
                        })} people`}
                      </div>
                      <div className="usercard-profile-countdata">
                        {`Upvoted by ${millify(data.UpVoteCount, {
                          precision: 1
                        })} people`}
                      </div>
                    </div>
                  </div>
                </UserCard>
              );
            })}
          </>
        )}
      {error ? (
        <div className="content-status">
          <Loader
            type="ThreeDots"
            color={negativeReds[500]}
            height={40}
            width={40}
          />
        </div>
      ) : (
          loading && (
            <div className="content-status">
              <Loader
                type="ThreeDots"
                color={primary[500]}
                height={40}
                width={40}
              />
            </div>
          )
        )}

      {(!loading && !hasMore) &&
        (<EndOfList>
          No more contents
        </EndOfList>)
      }
    </MainWrapper>
  );
}

SearchUsers.propTypes = {
  idToken: PropTypes.string,
  keyword: PropTypes.string.isRequired
};

export default withRouter(SearchUsers);

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;
