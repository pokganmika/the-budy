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

import useFollower from './useFollower';

/**
 *
 * @param {string} idToken
 * @param {string} userId
 * @param {object} userData
 * @param {function} onChangeCloseToggle
 * @param {function} followListUser
 */
const FollowerModal = ({
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
  const { loading, error, dataList, hasMore, toggleFollow } = useFollower(
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
          <Title>{`${userData.FollowerCount} Followers`}</Title>

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
              placeholder="Search Followers..."
              value={query}
              onChange={handleSearch}
            />
          </TextField>
        </MiddleWrapper>

        <LowerWrapper>
          {dataList.length === 0 && !loading ? (
            <Message>No data</Message>
          ) : (
            dataList.map((follower, index) => {
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
                        follower.ImageUrl === null
                          ? null
                          : follower.ImageUrl.small
                      }
                      type="profile"
                      cursor="pointer"
                      width="40px"
                      height="40px"
                      onClick={() => moveUserDetailPage(follower.BudyId)}
                    />
                    <div
                      className="content-profile-name"
                      onClick={() => moveUserDetailPage(follower.BudyId)}
                    >
                      {follower.DisplayName}
                    </div>
                  </div>

                  {follower.connected === 0 ? (
                    <PrimaryBtn
                      text="Follow"
                      size="small"
                      width="88px"
                      onClick={() =>
                        followListUser(
                          index,
                          follower.connected,
                          follower.BudyId,
                          toggleFollow
                        )
                      }
                    />
                  ) : follower.connected === 1 ? (
                    <DefaultBtn
                      text="Following"
                      size="small"
                      width="88px"
                      onClick={() =>
                        followListUser(
                          index,
                          follower.connected,
                          follower.BudyId,
                          toggleFollow
                        )
                      }
                    />
                  ) : (
                    follower.connected === 2 && null
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

FollowerModal.propTypes = {
  idToken: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
  onChangeCloseToggle: PropTypes.func.isRequired,
  followListUser: PropTypes.func.isRequired
};

export default withRouter(FollowerModal);
