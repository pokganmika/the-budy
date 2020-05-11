import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USER_API, POST_API } from '../../../../../Config/api';
import AppContext from '../../../../../App/context';

/**
 *
 * @param {number} pageNumber
 * @param {string} idToken
 */
const useQuestionsAnswered = (pageNumber, idToken) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [appState] = useContext(AppContext);

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
        url: `${POST_API}/${dataList[index].QuestionId}/votes`,
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
   * @param {number} isScrap
   * @param {function} update
   */
  const scrapQuestion = async (index, update) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: dataList[index]['IsScrap'] === 0 ? 'POST' : 'DELETE',
        url: `${POST_API}/${dataList[index].QuestionId}/scrap`,
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      dataList[index]['IsScrap'] = dataList[index]['IsScrap'] === 0 ? 1 : 0;
      setDataList(dataList);
      update();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${USER_API}/users/${appState.user.budyId}/posts`,
      params: {
        type: 'answer',
        page: pageNumber,
        cpp: 10
      },
      headers: { 'x-access-token': idToken },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        setDataList(prevDataList => prevDataList.concat(res.data.result.Posts));
        setHasMore(res.data.result.Posts.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, dataList, hasMore, scrapQuestion, voteQuestion };
};

export default useQuestionsAnswered;
