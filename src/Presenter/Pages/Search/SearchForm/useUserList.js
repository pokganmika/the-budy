import { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API } from '../../../../Config/api';

/**
 *
 * @param {number} pageNumber
 * @param {string} idToken
 * @param {string} keyword
 */
const useUserList = (pageNumber, idToken, keyword) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${USER_API}/users/list/search`,
      params: { topics: keyword, type: 1, page: pageNumber, count: 10 },
      headers: idToken && { 'x-access-token': idToken }
    })
      .then(res => {
        setDataList(prevDataList => prevDataList.concat(res.data.result.list));
        setHasMore(res.data.result.list.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(error);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, dataList, hasMore };
};

export default useUserList;
