import { useState } from 'react';
import axios from 'axios';
import { COMMENT_API } from '../../Config/api';
import { getAccessToken } from '../../Service/token';

function useCreateComment() {
  const initialState = {
    isComment: false,
    loading: false,
    text: '',
    commentCount: 0
  };

  const [state, setState] = useState(initialState);

  const updateState = (key, value) => {
    return setState(prevState => {
      return {
        ...prevState,
        [key]: value
      };
    });
  };

  const handlers = {
    setCommentView: () => updateState('isComment', true),
    changeComment: e => updateState('text', e.target.value),
    cancelComment: () => {
      return setState(prevState => ({
        ...prevState,
        isComment: false,
        text: ''
      }));
    },
    createComment: async (postId, getComments) => {
      if (state.text.length === 0) return;
      try {
        updateState('loading', true);
        const user = await getAccessToken();
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
          }
        };
        const body = {
          ParentId: 0,
          Contents: state.text
        };
        const response = await axios.post(
          `${COMMENT_API}/${postId}`,
          body,
          config
        );
        const data = response.data;
        console.log(data);
        if (data.success) {
          const result = await getComments(postId);
          if (result) {
            setState(prevState => ({
              ...prevState,
              isComment: false,
              loading: false
            }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return [state, handlers];
}

export default useCreateComment;
