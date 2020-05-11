import { useState } from 'react';
import axios from 'axios';
import { COMMENT_API } from '../../Config/api';
import { getAccessToken } from '../../Service/token';

const viewTypes = {
  comment: 'comment',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

function useReply(commentId) {
  const initialState = {
    currentView: viewTypes.comment,
    text: '',
    loading: false
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
    changeView: view => updateState('currentView', view),
    changeText: e => updateState('text', e.target.value),
    cancelView: () => {
      return setState(prevState => ({
        ...prevState,
        currentView: viewTypes.comment,
        text: ''
      }));
    },
    editView: text => {
      return setState(prevState => {
        return {
          ...prevState,
          currentView: viewTypes.edit,
          text
        };
      });
    },
    createReply: async (postId, getComments) => {
      console.log(postId);
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
          ParentId: commentId,
          Contents: state.text
        };
        console.log(body);
        const response = await axios.post(
          `${COMMENT_API}/${postId}`,
          body,
          config
        );
        const data = response.data;
        console.log(data);
        if (data.success) {
          const result = await getComments();
          if (result) return setState(initialState);
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateReply: async getComments => {
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
          Contents: state.text
        };
        const response = await axios.patch(
          `${COMMENT_API}/${commentId}`,
          body,
          config
        );
        const data = response.data;
        console.log(data);
        if (data.success) {
          const result = await getComments();
          if (result) return setState(initialState);
        }
      } catch (err) {
        console.log(err);
      }
    },
    deleteReply: async getComments => {
      updateState('currentView', viewTypes.delete);
      try {
        const user = await getAccessToken();
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
          }
        };
        const response = await axios.delete(
          `${COMMENT_API}/${commentId}`,
          config
        );
        const data = response.data;
        console.log(data);
        if (data.success) {
          const result = await getComments();
          if (result) return setState(initialState);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return [state, handlers];
}

export default useReply;
