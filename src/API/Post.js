import axios from 'axios';
import { getAccessToken } from '../Service/token';
import { POST_API, COMMENT_API } from '../Config/api';

export const postCreateDraft = async (type, questionId) => {
  try {
    const user = await getAccessToken();
    const url = `${POST_API}/draft`;
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const requestBody = {};
    if (type) requestBody['type'] = type;
    if (questionId) requestBody['ParentId'] = questionId;
    const response = await axios.post(url, requestBody, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postScrap = async postId => {
  try {
    const user = await getAccessToken();
    const url = `${POST_API}/${postId}/scrap`;
    const config = {
      headers: {
        'x-access-token': user.accessToken
      }
    };
    const response = await axios.post(url, {}, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteScrap = async postId => {
  try {
    const user = await getAccessToken();
    const url = `${POST_API}/${postId}/scrap`;
    const config = {
      headers: {
        'x-access-token': user.accessToken
      }
    };
    const response = await axios.delete(url, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postVoteCount = async (postId, action, postType) => {
  const api =
    postType === 'comment' || postType === 'reply' ? COMMENT_API : POST_API;
  try {
    const user = await getAccessToken();
    const url = `${api}/${postId}/votes`;
    const body = { action };
    const config = {
      headers: {
        'x-access-token': user.accessToken
      }
    };
    const response = await axios.post(url, body, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postReadAnswer = async answerId => {
  try {
    const url = `${POST_API}/${answerId}/read`;
    const response = await axios.post(url);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const patchChangeAnswer = async (answerId, body, bodyText) => {
  try {
    const user = await getAccessToken();
    const url = `${POST_API}/answer/${answerId}`;
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const requestBody = { IsDraft: 0 };
    if (body) requestBody['Body'] = body;
    if (bodyText) requestBody['BodyText'] = bodyText;
    const response = await axios.patch(url, requestBody, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deletePost = async postId => {
  try {
    const user = await getAccessToken();
    const url = `${POST_API}/${postId}`;
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      },
      params: {
        IsDraft: 0
      }
    };
    const response = await axios.delete(url, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPostDetail = async (postId, type) => {
  try {
    const user = await getAccessToken();
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const url = `${POST_API}/${postId}?type=${type}`;
    const response = await axios.get(url, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPostList = async (type, limit) => {
  try {
    const user = await getAccessToken();
    const url = `${POST_API}?type=${type}&page=${limit}&cpp=5`;
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const response = await axios.get(url, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAnswerList = async (postId, limit, count) => {
  try {
    const _limit = limit || 1;
    const _count = count || 10;
    const user = await getAccessToken();
    const url = `${POST_API}/${postId}/answers?page=${_limit}&cpp=${_count}`;
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const response = await axios.get(url, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getCommentList = async postId => {
  try {
    const user = await getAccessToken();
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const url = `${COMMENT_API}/${postId}`;
    const response = await axios.get(url, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
