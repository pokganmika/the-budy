import { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API, POST_API } from '../../../../../Config/api';

/**
 *
 * @param {number} pageNumber
 * @param {string} idToken
 */
const useArticleStored = (pageNumber, idToken) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  /**
   *
   * @param {number} id
   * @param {function} update
   */
  const dropScrapArticle = async (id, update) => {
    setLoading(true);
    setError(false);
    const tempDataList = dataList;
    for (let i = 0; i < tempDataList.length; i++) {
      if (tempDataList[i]['id'] === id) tempDataList.splice(i, 1);
    }
    setDataList(tempDataList);
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${POST_API}/${id}/scrap`,
        headers: { 'x-access-token': idToken }
      });

      console.log(response);
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
      url: `${USER_API}/users/me/posts/stored`,
      params: {
        type: 'article',
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
  }, [pageNumber, idToken]);

  return { loading, error, dataList, hasMore, dropScrapArticle };
};

export default useArticleStored;
