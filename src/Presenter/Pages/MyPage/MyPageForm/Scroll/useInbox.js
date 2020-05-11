import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USER_API } from '../../../../../Config/api';

const useInbox = (pageNumber, idToken) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (idToken === '') return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${USER_API}/users/me/inbox`,
      params: {
        page: pageNumber,
        cpp: 10
      },
      headers: { 'x-access-token': idToken },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        // console.log('res check: ', res.data.result.Inbox[0].IsRead);
        setDataList(prevDataList => prevDataList.concat(res.data.result.Inbox));
        setHasMore(res.data.result.Inbox.length > 0);
        setLoading(false);

        console.log('res.data.result.Inbox: ' + res.data.result.Inbox);

        if (res.data.result.Inbox[0] && (res.data.result.Inbox[0].IsRead === 0 && pageNumber)) {
          axios({
            method: 'PATCH',
            url: `${USER_API}/users/me/inbox`,
            headers: { 'x-access-token': idToken }
          })
            .then(res => console.log('Success inbox check : ', res))
            .catch(err => console.error(err));
        }
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber, idToken]);

  return { loading, error, dataList, hasMore };
};

export default useInbox;
