import { useState } from 'react';
import { postCreateDraft, patchChangeAnswer, deletePost } from '../../API/Post';

function useCreateAnswer() {
  const initialState = {
    answerId: null,
    loading: false
  };

  const [state, setState] = useState(initialState);

  const updateState = newState => {
    return setState(prevState => {
      return {
        ...prevState,
        ...newState
      };
    });
  };

  const handlers = {
    addAnswer: async (body, text, updateAnswers, close) => {
      if (body && text) {
        try {
          updateState({ loading: true })
          const data = await patchChangeAnswer(state.answerId, body, text);
          if (data.success) {
            console.log(data);
            const result = await updateAnswers();
            if (result) {
              updateState({ loading: false })
              return close();
            }
          }
          if (data.errors) {
            console.log('error', data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    createDraft: async questionId => {
      if (questionId) {
        try {
          const data = await postCreateDraft('answer', questionId);
          if (data.success) {
            const answerId = data.result.PostId;
            console.log(data);
            updateState({ answerId });
          }
          if (data.errors) {
            console.log('error', data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    deleteDraft: async answerId => {
      if (answerId) {
        try {
          const data = await deletePost(answerId);
          if (data.success) {
            console.log(data);
          }
          if (data.errors) {
            console.log('error', data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return [state, handlers];
}

export default useCreateAnswer;
