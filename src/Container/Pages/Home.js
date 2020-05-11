import React, { useEffect, useContext } from 'react';
import AppContext from '../../App/context';
import firebase from 'firebase';
import styled from 'styled-components';
import ArticleList from '../../Presenter/Pages/Home/ArticleList';
import QuestionList from '../../Presenter/Pages/Home/QuestionList';
import BudyInfo from '../../Presenter/Pages/Home/BudyInfo';
import SideFooter from '../../Presenter/Pages/Home/SideFooter';
import {
  greyscales,
  white,
  alphaValues,
  primary,
  sub
} from '../../Common/Styles/Colors';

function Home({ match, history }) {
  const [appState, appDispatch] = useContext(AppContext);
  const { authentication, budyId, emailVerified } = appState.user;
  const postType =
    match.params.postType === 'questions' ? 'questions' : 'articles';

  const checkUserState = async (auth, id, verified) => {
    if (auth) {
      if (id === '') {
        history.push('/signup/social');
      } else if (verified === false) {
        await firebase.auth().signOut();
        appDispatch({
          type: 'SET_USER',
          payload: {
            authentication: false,
            displayName: '',
            email: '',
            uid: '',
            photoURL: '',
            budyId: '',
            emailVerified: ''
          }
        });
        history.push('/verify-email');
      }
    }
  };

  useEffect(() => {
    checkUserState(authentication, budyId, emailVerified);
  }, []);

  return (
    <Page>
      <Header>
        <SelectBox postType={postType}>
          <div className="articles selector" onClick={() => history.push('/')}>
            ARTICLES
          </div>
          <div
            className="questions selector"
            onClick={() => history.push('/questions')}
          >
            QUESTIONS
          </div>
        </SelectBox>
      </Header>
      <Title>
        <div>{postType === 'articles' && 'Articles'}</div>
        <div>{postType === 'questions' && 'Questions'}</div>
      </Title>
      <Main>
        <div className="postList">
          {postType === 'articles' && <ArticleList />}
          {postType === 'questions' && <QuestionList />}
        </div>
        <div className="budyInfo">
          <BudyInfo history={history} />
          <SideFooter />
        </div>
      </Main>
    </Page>
  );
}

const Page = styled.main`
  position: relative;
  background-color: ${white};
  min-height: calc(100vh - 56px);
`;

const Header = styled.div`
  background-color: ${white};
  box-shadow: 0 0 10px 0 ${alphaValues[100]};
  position: sticky;
  z-index: 9;
  top: 56px;
  height: 40px;
  margin-bottom: 24px;
  @media (max-width: 530px) {
    margin-bottom: 16px;
    box-shadow: none;
    border-bottom: solid 1px ${greyscales[200]};
  }
`;

const Title = styled.div`
  max-width: 1032px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0px 24px;
  border-bottom: solid 1px ${greyscales[200]};
  div {
    font-size: 36px;
    font-weight: bold;
    color: ${sub[900]};
    line-height: 1.35;
  }
  @media (max-width: 530px) {
    display: none;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1032px;
  margin: 0 auto;
  margin-top: 40px;
  .postList {
    max-width: 632px;
    width: 100%;
    margin: 0px 24px;
    @media (max-width: 530px) {
      width: 100%;
      margin: 0px;
    }
  }
  .budyInfo {
    width: 336px;
    position: sticky;
    top: 140px;
    height: 100%;
    @media (max-width: 830px) {
      display: none;
    }
  }
  @media (max-width: 530px) {
    margin-top: 0px;
  }
`;

const SelectBox = styled.div`
  max-width: 1032px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 16px;
  .selector {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 116px;
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[500]};
    line-height: 1.75;
    height: 100%;
    background-color: ${white};
    :last-child {
      width: 129px;
    }
  }
  .${({ postType }) => postType} {
    color: ${primary[500]};
    background-color: ${sub[100]};
  }
  @media (max-width: 530px) {
    padding: 0px;
  }
`;

export default Home;
