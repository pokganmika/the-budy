import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { POST_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';

/**
 *
 * @param {string} topicKeyword
 * @param {number} pageNumber
 * @param {string} idToken
 * @param {string} type
 * @param {boolean} changeTopic
 * @param {function} onChangeChangedTopicState
 */
const usePostList = (
  topicKeyword,
  pageNumber,
  idToken,
  type,
  changedTopic,
  onChangeChangedTopicState
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [appState] = useContext(AppContext);

  // ARTICLE
  /**
   *
   * @param {number} index
   */
  const scrapArticle = async index => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: dataList[index]['IsScrap'] === 0 ? 'POST' : 'DELETE',
        url: `${POST_API}/${dataList[index].id}/scrap`,
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      dataList[index]['IsScrap'] = dataList[index]['IsScrap'] === 0 ? 1 : 0;
      setDataList(dataList);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  // QUESTION
  /**
   *
   * @param {number} index
   * @param {string} action
   */
  const voteQuestion = async (index, action) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: 'POST',
        url: `${POST_API}/${dataList[index].id}/votes`,
        data: { action },
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      const { UpvoteCount, DownvoteCount } = response.data.result.VotesCount;
      dataList[index]['VoteType'] = dataList[index]['VoteType'] ? null : 1;
      dataList[index]['UpvoteCount'] = UpvoteCount;
      dataList[index]['DownvoteCount'] = DownvoteCount;
      setDataList(dataList);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  /**
   *
   * @param {number} index
   */
  const scrapQuestion = async index => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: dataList[index]['IsScrap'] === 0 ? 'POST' : 'DELETE',
        url: `${POST_API}/${dataList[index].id}/scrap`,
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      dataList[index]['IsScrap'] = dataList[index]['IsScrap'] === 0 ? 1 : 0;
      setDataList(dataList);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (changedTopic) {
      setDataList([]);
      onChangeChangedTopicState();
    }
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${POST_API}`,
      params: { type, topic: topicKeyword, page: pageNumber, cpp: 10 },
      headers: idToken && { 'x-access-token': idToken },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        console.log(res);
        setDataList(prevDataList => prevDataList.concat(res.data.result.Posts));
        setHasMore(res.data.result.Posts.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber, topicKeyword]);

  return {
    loading,
    error,
    dataList,
    hasMore,
    scrapArticle,
    voteQuestion,
    scrapQuestion
  };
};

export default usePostList;
