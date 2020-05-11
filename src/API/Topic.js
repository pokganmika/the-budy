import axios from 'axios';
import { getAccessToken } from '../Service/token';
import { TOPIC_API } from '../Config/api';

export const postCreateTopic = async topicName => {
  try {
    const user = await getAccessToken();
    const url = `${TOPIC_API}`;
    const config = {
      headers: {
        'x-access-token': user ? user.accessToken : ''
      }
    };
    const requestBody = { TopicName: topicName };
    const response = await axios.post(url, requestBody, config);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
