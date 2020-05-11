import { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../Service/token';
import { POST_API, TOPIC_API } from '../../Config/api';
import { getPostDetail, postCreateDraft } from '../../API/Post';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE':
//       return {
//         ...state,
//         action
//       };
//   }
// };

function useTopicSetting() {
  const initialState = {};
  const [state, dispatch] = useState(initialState);

  const handlers = {};

  return [state, handlers];
}

export default useTopicSetting;
