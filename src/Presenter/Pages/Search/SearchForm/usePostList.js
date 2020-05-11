import { useState, useEffect } from 'react';
import axios from 'axios';
import { POST_API } from '../../../../Config/api';

/**
 *
 * @param {string} keyword
 * @param {number} pageNumber
 * @param {string} idToken
 * @param {string} type
 * @param {boolean} keywordChanged
 * @param {function} onChangeKeywordChanged
 * @param {function} pageNumberReset
 */
const usePostList = (
  keyword,
  pageNumber,
  idToken,
  type,
  keywordChanged,
  onChangeKeywordChanged,
  pageNumberReset
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

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
        method: articleList[index]['IsScrap'] === 0 ? 'POST' : 'DELETE',
        url: `${POST_API}/${articleList[index].id}/scrap`,
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      articleList[index]['IsScrap'] =
        articleList[index]['IsScrap'] === 0 ? 1 : 0;
      setArticleList(articleList);
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
        url: `${POST_API}/${questionList[index].id}/votes`,
        data: { action },
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      const { UpvoteCount, DownvoteCount } = response.data.result.VotesCount;
      questionList[index]['VoteType'] = questionList[index]['VoteType']
        ? null
        : 1;
      questionList[index]['UpvoteCount'] = UpvoteCount;
      questionList[index]['DownvoteCount'] = DownvoteCount;
      setQuestionList(questionList);
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
        method: questionList[index]['IsScrap'] === 0 ? 'POST' : 'DELETE',
        url: `${POST_API}/${questionList[index].id}/scrap`,
        headers: { 'x-access-token': idToken }
      });
      console.log(response);
      questionList[index]['IsScrap'] =
        questionList[index]['IsScrap'] === 0 ? 1 : 0;
      setQuestionList(questionList);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (keywordChanged && type === 'article') {
      setArticleList([]);
      onChangeKeywordChanged();
      pageNumberReset();
    }
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${POST_API}`,
      params: { type, keyword, page: pageNumber, cpp: 10 },
      headers: idToken && { 'x-access-token': idToken },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        console.log(res);
        type === 'article'
          ? setArticleList(prevDataList =>
              prevDataList.concat(res.data.result.Posts)
            )
          : setQuestionList(prevDataList =>
              prevDataList.concat(res.data.result.Posts)
            );
        setHasMore(res.data.result.Posts.length > 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (axios.isCancel(err)) return;
        setError(true);
      });
  }, [pageNumber, keyword]);

  return {
    loading,
    error,
    articleList,
    questionList,
    hasMore,
    scrapArticle,
    scrapQuestion,
    voteQuestion
  };
};

export default usePostList;
