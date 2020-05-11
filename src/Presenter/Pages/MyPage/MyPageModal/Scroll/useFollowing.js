import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USER_API } from '../../../../../Config/api';
import AppContext from '../../../../../App/context';

/**
 *
 * @param {string} query
 * @param {number} pageNumber
 * @param {string} idToken
 */
export default function useFollowing(query, pageNumber, idToken) {
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
    setDataList([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${USER_API}/users/${appState.user.budyId}/following`,
      params: {
        searchname: query,
        page: pageNumber,
        cpp: 10
      },
      headers: { 'x-access-token': idToken },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        setDataList(prevDataList => {
          return [
            ...new Set([
              ...prevDataList,
              ...res.data.result.followingList.map(following => following)
            ])
          ];
        });
        setHasMore(res.data.result.followingList.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, idToken]);

  return { loading, error, dataList, hasMore, toggleFollow };
}
