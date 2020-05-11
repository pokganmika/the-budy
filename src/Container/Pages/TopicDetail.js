import React, { useState, useEffect, useContext } from 'react';
import TopicDetailForm from '../../Presenter/Pages/TopicDetail/TopicDetailForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import { USER_API, POST_API } from '../../Config/api';
import AppContext from '../../App/context';

const initCountState = {
  articles: 0,
  questions: 0,
  users: 0
};

/**
 * @param {object} history
 * @param {object} location
 */
const TopicDetail = ({ history, location }) => {
  const [idToken, setIdToken] = useState('');
  const [countData, setCountData] = useState(initCountState);
  const [changeCount, setChangeCount] = useState(0);
  const [appState] = useContext(AppContext);

  const getCountData = async (topic, type) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${POST_API}`,
        params: { type, topic }
      });
      const { rowCount } = response.data.result;
      if (type === 'article') {
        setCountData(prevState => ({
          ...prevState,
          articles: rowCount
        }));
      } else if (type === 'question') {
        setCountData(prevState => ({
          ...prevState,
          questions: rowCount
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserCountData = async topic => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${USER_API}/users/list/search`,
        params: { topic, type: 0 }
      });
      const { totalCount } = response.data.result;
      setCountData(prevState => ({
        ...prevState,
        users: totalCount
      }));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param {number} index
   * @param {number} followState
   * @param {string} userId
   * @param {function} toggleFollow
   */
  const followUser = async (index, followState, userId, toggleFollow) => {
    try {
      const response = await axios({
        method: followState === 1 ? 'DELETE' : 'POST',
        url: `${USER_API}/users/follow`,
        data: { budyId: userId },
        headers: { 'x-access-token': idToken }
      });
      if (response.data.success) {
        toggleFollow(index);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getIdToken = async () => {

    var idToken = '';
    if (appState.user.authentication) {
      idToken = await firebase.auth().currentUser.getIdToken();
    }
    setIdToken(idToken);
  };

  const refreshNav = () => setChangeCount(prevCount => prevCount + 1);

  useEffect(() => {
    getIdToken();
    getCountData(getPathName(location.pathname), 'article');
    getCountData(getPathName(location.pathname), 'question');
    // getCountData(getPathName(location.pathname), 'user')
    getUserCountData(getPathName(location.pathname));
  }, [changeCount]);

  return (
    <>
      {appState.user.authentication ? (
        idToken !== '' && (
          <TopicDetailForm
            idToken={idToken}
            path={getPathName(location.pathname)}
            countData={countData}
            refreshNav={refreshNav}
            followUser={followUser}
          />
        )
      ) : (
        <TopicDetailForm
          path={getPathName(location.pathname)}
          countData={countData}
          refreshNav={refreshNav}
        />
      )}
    </>
  );
};

const getPathName = path => {
  let count = 0;
  let result = '';
  for (let i = 0; i < path.length; i++) {
    if (path[i] === '/') {
      count++;
    } else if (count === 2) {
      result += path[i];
    }
  }
  return result;
};

export default withRouter(TopicDetail);
