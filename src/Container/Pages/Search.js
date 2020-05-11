import React, { useState, useEffect, useContext } from 'react';
import SearchForm from '../../Presenter/Pages/Search/SearchForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import { USER_API, POST_API, TOPIC_API } from '../../Config/api';
import AppContext from '../../App/context';

const initCountState = {
  articles: 0,
  questions: 0,
  topics: 0,
  users: 0
};

const Search = ({ history, match }) => {
  const [value, setValue] = useState('');
  const [idToken, setIdToken] = useState('');
  const [countData, setCountData] = useState(initCountState);
  const [topicsData, setTopicsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [changeCount, setChangeCount] = useState(0);
  const [keywordChanged, setKeywordChanged] = useState(false);
  const [appState] = useContext(AppContext);
  const { authentication } = appState.user;
  const keyword = match.params.search;

  const initialSetValue = async () => setValue(match.params.search);

  /**
   *
   * @param {string} type
   */
  const getPostData = async type => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${POST_API}`,
        params: { type, keyword, page: 1, cpp: 1 }
      });
      console.log(`getPostData - ${type} : `, response.data.result.rowCount);
      const { rowCount } = response.data.result;
      type === 'article'
        ? setCountData(prevCount => ({
            ...prevCount,
            articles: rowCount
          }))
        : setCountData(prevCount => ({
            ...prevCount,
            questions: rowCount
          }));
    } catch (error) {
      console.error(error);
    }
  };

  const getTopicsData = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${TOPIC_API}/search`,
        params: { keyword }
      });
      console.log(`getTopicsData : `, response);
      setCountData(prevCount => ({
        ...prevCount,
        topics: response.data.topics.length
      }));
      setTopicsData(response.data.topics);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsersData = async () => {
    try {
      let response;
      if (authentication) {
        const idToken = await firebase.auth().currentUser.getIdToken();
        setIdToken(idToken);
        response = await axios({
          method: 'GET',
          url: `${USER_API}/users/list/search`,
          params: { topics: keyword, type: 1, page: 0, count: 10 },
          headers: { 'x-access-token': idToken }
        });
      } else {
        response = await axios({
          method: 'GET',
          url: `${USER_API}/users/list/search`,
          params: { topics: keyword, type: 1, page: 0, count: 10 }
        });
      }
      console.log(`getUsersData : `, response);
      const { list, totalCount } = response.data.result;
      setCountData(prevCount => ({
        ...prevCount,
        users: totalCount
      }));
      setUsersData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeValue = e => setValue(e.target.value);

  const searchKeyword = e => {
    if (e.key === 'Enter' && value.length !== 0) {
      history.push(`/search/${value}/articles`);
      setChangeCount(prevCount => prevCount + 1);
      setKeywordChanged(true);
      window.scrollTo(0, 0);
    }
  };

  const onChangeKeywordChanged = () => setKeywordChanged(false);

  useEffect(() => {
    initialSetValue();
    getPostData('article');
    getPostData('question');
    getTopicsData();
    getUsersData();
  }, [changeCount]);

  return (
    <SearchForm
      idToken={idToken}
      keyword={match.params.search}
      value={value}
      onChangeValue={onChangeValue}
      countData={countData}
      topicsData={topicsData}
      usersData={usersData}
      searchKeyword={searchKeyword}
      keywordChanged={keywordChanged}
      onChangeKeywordChanged={onChangeKeywordChanged}
    />
  );
};

export default withRouter(Search);
