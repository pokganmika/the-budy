import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../App/context';
import { greyscales, primary, negativeReds } from '../../Common/Styles/Colors';

function VoteCountController({
  className,
  postId,
  commentId,
  postType,
  voteType,
  voteCount,
  voteHandler,
  parentIndex
}) {
  const _postId = postId || commentId || null;
  const _postType = postType || 'post';
  const _voteType = voteType || null;
  const _voteCount = voteCount || 0;
  const _voteHandler = voteHandler || function() {};
  const _parentIndex = parentIndex;

  const [appState] = useContext(AppContext);
  const authentication = appState.user.authentication;

  return (
    <View className={className} name="voteCountController" postType={_postType}>
      <span
        className={`budy-vote-up${_voteType === 'up' ? '-fill' : ''} voteBtn`}
        name="vote-up"
        onClick={() => {
          authentication
            ? _voteHandler(_postId, _voteType, 'up', _postType, _parentIndex)
            : alert('You must log in to use it.');
        }}
      />
      <div name="voteCountController-voteCount" className="voteCount">
        {_voteCount}
      </div>
      <span
        className={`budy-vote-down${
          _voteType === 'down' ? '-fill' : ''
        } voteBtn`}
        name="vote-down"
        onClick={() => {
          authentication
            ? _voteHandler(_postId, _voteType, 'down', _postType, _parentIndex)
            : alert('You must log in to use it.');
        }}
      />
    </View>
  );
}

const View = styled.div`
  width: ${({ postType }) =>
    postType === 'comment' || postType === 'reply' ? '40px' : '48px'};
  height: ${({ postType }) =>
    postType === 'comment' || postType === 'reply' ? '80px' : '104px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .voteBtn {
    cursor: pointer;
    font-size: ${({ postType }) =>
      postType === 'comment' || postType === 'reply' ? '18px' : '24px'};
  }
  .budy-vote-up {
    color: ${greyscales[500]};
  }
  .budy-vote-up-fill {
    color: ${primary[500]};
  }
  .budy-vote-down {
    color: ${greyscales[500]};
  }
  .budy-vote-down-fill {
    color: ${negativeReds[500]};
  }
  .budy-vote-down.disabled {
    cursor: auto;
    color: ${greyscales[300]};
  }
  .voteCount {
    font-size: ${({ postType }) =>
      postType === 'comment' || postType === 'reply' ? '12px' : '14px'};
    line-height: ${({ postType }) =>
      postType === 'comment' || postType === 'reply' ? '1.4' : '1.75'};
    margin: 10px 0px;
    font-weight: 500;
    color: ${greyscales[900]};
    text-align: center;
  }
  @media (max-width: 530px) {
    display: hidden;
    .voteBtn {
      font-size: 24px;
    }
    .voteCount {
      margin: 6px 0px;
    }
  }
`;

export default VoteCountController;
