import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import ArticleDetailView from './ArticleDetailView';
import { white, primary } from '../../../Common/Styles/Colors';
import GlobalFooter from '../../../Common/Collections/GlobalFooter';
import copy from 'copy-to-clipboard';

function ArticlePostPage() {
  const [message, setMessage] = useState(false);

  const clipboardHandler = articleId => {
    if (articleId) {
      const result = copy(`https://www.thebudy.com/question/${articleId}`);
      if (result) {
        setMessage(true);
        setTimeout(() => setMessage(false), 1000);
        return true;
      }
    }
    return false;
  };

  return (
    <Fragment>
      <Page name="articlePost-page">
        <ArticleDetailView clipboardHandler={clipboardHandler}/>
      </Page>
      <GlobalFooter />
      {message && (
        <Message>
          <span>Copyed to clipboard!</span>
        </Message>
      )}
    </Fragment>
  );
}

const Page = styled.main`
  position: relative;
  background-color: ${white};
  min-height: calc(100vh - 57px - 320px);
`;

const Message = styled.div`
  background-color: ${primary[500]};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  position: fixed;
  bottom: 16px;
  right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-radius: 4px;
`;

export default ArticlePostPage;
