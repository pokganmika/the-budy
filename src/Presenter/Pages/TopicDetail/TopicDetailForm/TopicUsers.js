import React, { useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import millify from 'millify';
import Loader from 'react-loader-spinner';
import AppContext from '../../../../App/context';
import Image from '../../../../Common/Elements/Image';
import { primary, negativeReds } from '../../../../Common/Styles/Colors';
import { PrimaryBtn } from '../../../../Common/Elements/Buttons/SolidButton';
import { DefaultBtn } from '../../../../Common/Elements/Buttons/BorderButton';

import useUserList from './useUserList';
import { Wrapper, UserCard } from '../../MyPage/MyPageForm/Scroll/style';
import styled from 'styled-components';
import AccountRequiredAlert from '../../../../Common/AccountRequiredAlert';

/**
 *
 * @param {string} idToken
 * @param {string} topicKeyword
 * @param {function} followUser
 */
const TopicUser = ({ history, idToken, topicKeyword, followUser }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [appState] = useContext(AppContext);
  const { loading, error, dataList, hasMore, toggleFollow } = useUserList(
    topicKeyword,
    pageNumber,
    idToken
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

  /**
   *
   * @param {string} budyId
   */
  const moveUserPage = budyId => {
    appState.user.budyId !== budyId
      ? history.push(`/userpage/${budyId}/profile`)
      : history.push('/mypage/profile');
  };

  const [show, setShow] = useState(false);
  const showModal = ()=> { setShow(true); }
  const hideModal = ()=> { setShow(false); }

  return (
    <Wrapper>
      <AccountRequiredAlert isShown={show} dismissHandler={hideModal} history={history} ></AccountRequiredAlert>

      {dataList.map((data, index) => {
        console.log(data);
        return (
          <UserCard
            ref={index === dataList.length - 1 ? lastDataElementRef : null}
            borderWidth = {index === dataList.length - 1 ? "0px" : "1px"}
            key={index}
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
                  <div className="usercard-profile-budyid">{data.BudyId}</div>
                </div>

                {data.connected === 0 ? (
                  <PrimaryBtn
                    className="usercard-follow-button"
                    text="Follow"
                    size="small"
                    width="88px"
                    onClick={() => { appState.user.authentication ? followUser(
                      index,
                      data.connected,
                      data.BudyId,
                      toggleFollow
                    ) : showModal() }}
                  />
                ) : data.connected === 1 ? (
                  <DefaultBtn
                    className="usercard-follow-button"
                    text="Following"
                    size="small"
                    width="88px"
                    onClick={() => { appState.user.authentication ? followUser(
                      index,
                      data.connected,
                      data.BudyId,
                      toggleFollow
                    ) : showModal() }}
                  />
                ) : (
                  data.connected === 2 && null
                )}
              </div>

              <div className="usercard-profile-shortbio">{data.AboutMe}</div>

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

      { (!loading && !hasMore) &&
        (<EndOfList>
          No more contents
        </EndOfList>)
      }

    </Wrapper>
  );
};

TopicUser.propTypes = {
  idToken: PropTypes.string,
  topicKeyword: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired
};

export default withRouter(TopicUser);

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;
