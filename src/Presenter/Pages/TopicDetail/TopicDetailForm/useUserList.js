import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USER_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';

/**
 *
 * @param {string} topicKeyword
 * @param {number} pageNumber
 * @param {string} idToken
 */
const useUserList = (topicKeyword, pageNumber, idToken) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [appState] = useContext(AppContext);

  /**
   *
   * @param {number} index
   */
  const toggleFollow = index => {
    setDataList(prevState =>
      prevState.map((val, i) => {
        return index === i
          ? { ...val, connected: val.connected === 0 ? 1 : 0 }
          : val;
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${USER_API}/users/list/search`,
      params: {
        page: pageNumber,
        count: 10,
        topic: topicKeyword,
        type: 0
      },
      headers: idToken && { 'x-access-token': idToken },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        console.log(res);
        setDataList(prevDataList => prevDataList.concat(res.data.result.list));
        setHasMore(res.data.result.list.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber, topicKeyword]);

  return { loading, error, dataList, hasMore, toggleFollow };
};

export default useUserList;
