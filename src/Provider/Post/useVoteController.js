import { useState } from 'react';
import { postVoteCount } from '../../API/Post';

function useVoteController(customState) {
  const initialState = {
    currentVoteType: null,
    currentVoteCount: 0
  };

  const [state, setState] = useState(customState || initialState);

  let isWaiting = false;

  const handlers = {
    voteHandler: async (postId, currentVoteType, voteType, postType) => {
      if (isWaiting) {
        return;
      }

      isWaiting = true;
      console.log('postId', postId);
      console.log('currentVoteType', currentVoteType);
      console.log('voteType', voteType);
      console.log('postType', postType);
      const updateVoteCount = await postVoteCount(postId, voteType, postType);

      isWaiting = false;
      return setState({
        currentVoteType: currentVoteType === voteType ? null : voteType,
        currentVoteCount: Math.max(0, updateVoteCount)
      });
    }
  };

  return [state, handlers];
}

export default useVoteController;
