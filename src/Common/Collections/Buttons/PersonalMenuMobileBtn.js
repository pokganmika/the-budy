import React, { Fragment, useState, useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import removeLocalStorage from '../../../Service/removeLocalStorage';
import firebase from 'firebase';
import AppContext from '../../../App/context';
import budyWordmark from '../../../Images/budy_Wordmark_white.svg';
import Modal from '../Modal';
import { white, primary, greyscales } from '../../Styles/Colors';
import { OnDarkBtn, PrimaryBtn } from '../../Elements/Buttons/SolidButton';
import CreateQuestion from '../../../Container/Modals/CreateQuestion';

const PersonalMenuMobileBtn = ({ history }) => {
  const [isOpen, setOpen] = useState(false);
  const [currentView, setView] = useState(null);
  const [appState, appDispatch] = useContext(AppContext);
  const authentication = appState.user.authentication || false;
  const image = appState.user.photoURL || '';
  const displayName = appState.user.displayName || '';
  const budyId = appState.user.budyId || '';

  const moveRoute = type => {
    setOpen(false);
    switch (type) {
      case 'postTypeSelection':
        return setView('postTypeSelection');
      case 'createArticle':
        setView(null);
        return history.push('/write-article');
      case 'createQuestion':
        return setView('createQuestion');
      case 'login':
        return history.push('/login');
      case 'signup':
        return history.push('/signup');
      case 'profile':
        return history.push('/mypage/profile');
      case 'questions':
        return history.push('/mypage/questions/asked');
      case 'articles':
        return history.push('/mypage/articles/published');
      case 'inbox':
        return history.push('/mypage/inbox');
      case 'settings':
        return history.push('/settings/account-setting');
      case 'helpcenter':
        return history.push('/helpcenter');
      default:
        return null;
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      removeLocalStorage();
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
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      {authentication && (
        <Image src={image ? image.small : ''} onClick={() => setOpen(true)} />
      )}
      {!authentication && (
        <Icon onClick={() => setOpen(true)}>
          <span className="budy-menu" />
        </Icon>
      )}
      {isOpen && (
        <Modal type="menu">
          <PersonalMenuView>
            <Header>
              <Logo src={budyWordmark} />
              <span className="budy-x" onClick={() => setOpen(false)} />
            </Header>
            <UserCollection>
              {authentication && (
                <Fragment>
                  <img className="profile" src={image ? image.small : ''} />
                  <div className="userName">{displayName}</div>
                  <div className="budyId">{budyId}</div>
                  <OnDarkBtn
                    text="CREATE POST"
                    size="small"
                    width="208px"
                    onClick={() => moveRoute('postTypeSelection')}
                  />
                </Fragment>
              )}
              {!authentication && (
                <Fragment>
                  <PrimaryBtn
                    className="loginBtn"
                    text="Login"
                    size="small"
                    width="208px"
                    onClick={() => moveRoute('login')}
                  />
                  <OnDarkBtn
                    text="Create account"
                    size="small"
                    width="208px"
                    onClick={() => moveRoute('signup')}
                  />
                </Fragment>
              )}
            </UserCollection>
            <Main authentication={authentication}>
              {authentication && (
                <Section>
                  <div onClick={() => moveRoute('profile')}>Profile</div>
                  <div onClick={() => moveRoute('questions')}>Questions</div>
                  <div onClick={() => moveRoute('articles')}>Articles</div>
                  <div onClick={() => moveRoute('inbox')}>Inbox</div>
                  <div onClick={() => moveRoute('settings')}>Settings</div>
                </Section>
              )}
              <Section>
                <div >About Budy</div>
                <div onClick={() => {history.push('/terms-of-service')}}>Terms of service</div>
                <div onClick={() => {history.push('/privacy-policy')}}>Privacy policy</div>
                <div onClick={() => {history.push('/ask-to-budy')}}>Contact</div>
              </Section>
              {authentication && (
                <Section>
                  <div onClick={logout}>Log out</div>
                </Section>
              )}
            </Main>
            <Footer>
              <div className="followUs">
                <span className="budy-facebook-f icon" />
                <span className="budy-youtube_playbt icon" />
                <span className="budy-medium-m icon" />
                <span className="budy-twitter icon" />
              </div>
              <div className="copyright">
              {new Date().getFullYear().toString() } GANA Networks LLC. © All rights reserved.
              </div>
            </Footer>
          </PersonalMenuView>
        </Modal>
      )}

      {currentView === 'postTypeSelection' && (
        <Modal>
          <PostTypeSelectionView>
            <header>
              <div className="title">Create Post</div>
              <span className="budy-x" onClick={() => setView(null)} />
            </header>
            <Selector onClick={() => moveRoute('createArticle')}>
              <div className="label">Article</div>
              <div className="text">
                Here's the most effective way of share your knowledge and
                know-hows for the others.
              </div>
            </Selector>
            <Selector onClick={() => moveRoute('createQuestion')}>
              <div className="label">Question</div>
              <div className="text">
                Add a question post if you have some curiosities about any kind
                of Cannabis, And get the answers quickly.
              </div>
            </Selector>
          </PostTypeSelectionView>
        </Modal>
      )}

      {currentView === 'createQuestion' && (
        <Modal>
          <CreateQuestion
            closeModal={() => setView(null)}
            closeCreateQuestion={() => setView(null)}
          />
        </Modal>
      )}
    </Fragment>
  );
};

const PersonalMenuView = styled.div`
  position: relative;
  z-index: 53;
  background-color: #008695;
  width: 100%;
`;

const PostTypeSelectionView = styled.div`
  position: relative;
  z-index: 54;
  background-color: ${white};
  width: 100%;
  height: 100%;
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 56px;
    border-bottom: solid 1px ${greyscales[200]};
    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.3;
      color: #2e2e2e;
    }
    .budy-x {
      position: absolute;
      right: 16px;
      font-size: 24px;
      color: #000000;
    }
  }
`;

const Selector = styled.div`
  padding: 40px 16px;
  .label {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    color: ${primary[500]};
    margin-bottom: 8px;
  }
  .text {
    font-size: 14px;
    line-height: 1.43;
    color: ${greyscales[700]};
  }
  :last-child {
    border-top: solid 1px ${greyscales[200]};
  }
`;

const Logo = styled.img`
  width: 65px;
  height: 25px;
`;

const Image = styled.img`
  width: ${({ width }) => width || '24px'};
  height: ${({ height }) => height || '24px'};
  border-radius: 50%;
  margin-left: 16px;
`;

const Icon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  .budy-menu {
    font-size: 24px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
  padding: 0px 20px;
  .budy-x {
    font-size: 24px;
    color: ${white};
  }
`;

const UserCollection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  .profile {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 8px;
  }
  .userName {
    font-size: 16px;
    font-weight: 600;
    color: ${white};
    min-height: 24px;
    line-height: 1.33;
  }
  .budyId {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    min-height: 16px;
    line-height: 1.2;
    margin-bottom: 24px;
  }
  .loginBtn {
    border: solid 1px ${white};
    margin-bottom: 16px;
  }
`;

const Main = styled.main`
  overflow-y: auto;
  height: ${({ authentication }) =>
    authentication ? 'calc(100% - 385px)' : 'calc(100% - 281px)'};
`;

const Footer = styled.footer`
  padding: 16px;
  height: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  .followUs {
    font-size: 16px;
    color: ${primary[200]};
    line-height: 1;
    .icon {
      margin-right: 24px;
      color: ${greyscales[200]};
      :last-child {
        margin: 0px;
      }
    }
  }
  .copyright {
    margin-top: 16px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.35;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Section = styled.div`
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  padding: 20px;
  div {
    color: ${white};
    font-size: 16px;
    padding: 10px 16px;
    text-align: center;
    line-height: 1.25;
  }
`;

export default withRouter(PersonalMenuMobileBtn);
