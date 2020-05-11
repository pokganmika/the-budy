import React, { useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import AppContext from '../../../../../App/context';
import Image from '../../../../../Common/Elements/Image';
import Icon from '../../../../../Common/Modules/Icon';
import { PrimaryBtn } from '../../../../../Common/Elements/Buttons/SolidButton';
import { DefaultBtn } from '../../../../../Common/Elements/Buttons/BorderButton';
import {
  greyscales,
  primary,
  negativeReds
} from '../../../../../Common/Styles/Colors';
import {
  Background,
  Wrapper,
  UpperWrapper,
  Title,
  MiddleWrapper,
  TextField,
  Input,
  LowerWrapper,
  Content,
  Message
} from '../../../MyPage/MyPageModal/Scroll/style';

import useFollowing from './useFollowing';

/**
 *
 * @param {string} idToken
 * @param {string} userId
 * @param {object} userData
 * @param {function} onChangeCloseToggle
 * @param {function} followListUser
 */
const FollowingModal = ({
  history,
  idToken,
  userId,
  userData,
  onChangeCloseToggle,
  followListUser
}) => {
  const [appState] = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, dataList, hasMore, toggleFollow } = useFollowing(
    query,
    pageNumber,
    idToken,
    userId
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

  const handleSearch = e => {
    setQuery(e.target.value);
    setPageNumber(0);
  };

  /**
   *
   * @param {string} userId
   */
  const moveUserDetailPage = userId => {
    if (appState.user.budyId === userId) {
      history.push(`/mypage/profile`);
    } else {
      history.push(`/userpage/${userId}/profile`);
    }
  };

  return (
    <Background>
      <Wrapper>
        <UpperWrapper>
          <Title>{`${userData.FollowingCount} Followings`}</Title>

          <Icon
            type="close-outline"
            cursor="pointer"
            onClick={onChangeCloseToggle}
          />
        </UpperWrapper>

        <MiddleWrapper>
          <TextField>
            <Icon type="search-outline" size="20px" color={greyscales[500]} />
            <Input
              type="text"
              placeholder="Search Followings..."
              value={query}
              onChange={handleSearch}
            />
          </TextField>
        </MiddleWrapper>

        <LowerWrapper>
          {dataList.length === 0 && !loading ? (
            <Message>No data</Message>
          ) : (
            dataList.map((following, index) => {
              return (
                <Content
                  ref={
                    index === dataList.length - 1 ? lastDataElementRef : null
                  }
                  key={index}
                >
                  <div className="content-profile">
                    <Image
                      src={
                        following.ImageUrl === null
                          ? null
                          : following.ImageUrl.small
                      }
                      type="profile"
                      cursor="pointer"
                      width="40px"
                      height="40px"
                      onClick={() => moveUserDetailPage(following.BudyId)}
                    />
                    <div
                      className="content-profile-name"
                      onClick={() => moveUserDetailPage(following.BudyId)}
                    >
                      {following.DisplayName}
                    </div>
                  </div>

                  {following.connected === 0 ? (
                    <PrimaryBtn
                      text="Follow"
                      size="small"
                      width="88px"
                      onClick={() =>
                        followListUser(
                          index,
                          following.connected,
                          following.BudyId,
                          toggleFollow
                        )
                      }
                    />
                  ) : following.connected === 1 ? (
                    <DefaultBtn
                      text="Following"
                      size="small"
                      width="88px"
                      onClick={() =>
                        followListUser(
                          index,
                          following.connected,
                          following.BudyId,
                          toggleFollow
                        )
                      }
                    />
                  ) : (
                    following.connected === 2 && null
                  )}
                </Content>
              );
            })
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
        </LowerWrapper>
      </Wrapper>
    </Background>
  );
};

FollowingModal.propTypes = {
  idToken: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
  onChangeCloseToggle: PropTypes.func.isRequired,
  followListUser: PropTypes.func.isRequired
};

export default withRouter(FollowingModal);
