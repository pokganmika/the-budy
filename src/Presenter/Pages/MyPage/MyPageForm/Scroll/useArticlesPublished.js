import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USER_API } from '../../../../../Config/api';
import AppContext from '../../../../../App/context';

/**
 *
 * @param {number} pageNumber
 */
const useArticlePublished = pageNumber => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [appState] = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${USER_API}/users/${appState.user.budyId}/posts`,
      params: {
        type: 'article',
        page: pageNumber,
        cpp: 10
      },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        setDataList(prevDataList => {
          return [
            ...new Set([
              ...prevDataList,
              ...res.data.result.Posts.map(post => post)
            ])
          ];
        });
        setHasMore(res.data.result.Posts.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, dataList, hasMore };
};

export default useArticlePublished;
