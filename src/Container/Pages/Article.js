import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { PostProvider } from '../../Provider/Post/postContext';
import useArticleDetail from '../../Provider/Post/useArticleDetail';
import ArticlePostPage from '../../Presenter/Pages/Article/ArticlePostPage';
import Loader from 'react-loader-spinner';
import {primary} from '../../Common/Styles/Colors';
function Article({ match }) {
  const postId = match.params.postId;

  const [redirect, setRedirect] = useState(false);

  const articleDetailStore = useArticleDetail();
  const [articleDetailState, articleDetailHandlers] = articleDetailStore;
  const { getArticleDetail } = articleDetailHandlers;

  useEffect(() => {
    (async () => {
      const result = await getArticleDetail(postId);
      if (!result) setRedirect(true); 
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/error" />;
  } else if (articleDetailState.isLoaded && redirect === false) {
    return (
      <PostProvider store={articleDetailStore}>
        <ArticlePostPage />
      </PostProvider>
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader type="ThreeDots" color={primary[500]} height={40} width={40} />
      </LoaderWrapper>
    )
  }
}

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default Article;
