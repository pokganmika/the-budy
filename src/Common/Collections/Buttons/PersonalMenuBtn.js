import React, { useState, useContext, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import firebase from 'firebase';
import removeLocalStorage from '../../../Service/removeLocalStorage';
import AppContext from '../../../App/context';
import { greyscales, white, primary, alphaValues } from '../../Styles/Colors';

function PersonalMenuBtn({ type, history }) {
  const positionType = type || 'right';
  const node = useRef();
  const [isOpen, setOpen] = useState(false);
  const [appState, appDispatch] = useContext(AppContext);
  const image = appState.user.photoURL;
  const handleClick = e => {
    if (node.current.contains(e.target)) return;
    setOpen(false);
  };

  const moveRoute = type => {
    setOpen(false);
    switch (type) {
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <View ref={node}>
      <Image
        src={image ? image.small : ''}
        alt=""
        onClick={() => setOpen(!isOpen)}
      />
      {isOpen && (
        <Tooltip positionType={positionType}>
          <Item onClick={() => moveRoute('profile')}>
            <div>Profile</div>
          </Item>
          <Item onClick={() => moveRoute('questions')}>
            <div>Questions</div>
          </Item>
          <Item onClick={() => moveRoute('articles')}>
            <div>Articles</div>
          </Item>
          <Item onClick={() => moveRoute('inbox')}>
            <div>Inbox</div>
          </Item>
          <Item onClick={() => moveRoute('settings')}>
            <div>Settings</div>
          </Item>
          <Item onClick={logout}>
            <div>Log out</div>
          </Item>
        </Tooltip>
      )}
    </View>
  );
}

const View = styled.div`
  position: relative;
  margin: 0px 24px;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Tooltip = styled.div`
  position: absolute;
  min-width: 152px;
  padding: 8px 16px;
  left: ${({ positionType }) => (positionType === 'left' ? '0px' : 'auto')};
  right: ${({ positionType }) => (positionType === 'right' ? '0px' : 'auto')};
  top: 46px;
  border: solid 1px ${greyscales[200]};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 ${alphaValues[100]};
  background-color: ${white};
  z-index: 1;
  ::before {
    background-color: ${white};
    position: absolute;
    right: 10px;
    width: 10px;
    height: 10px;
    border-top: solid 1px ${greyscales[200]};
    border-left: solid 1px ${greyscales[200]};
    bottom: 100%;
    left: ${props => props.arrowPosition};
    content: '';
    transform: rotate(45deg);
    margin-bottom: -4px;
  }
`;

const Item = styled.div`
  padding: 8px 0px;
  div {
    cursor: pointer;
    line-height: 1.2;
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[900]};
    :hover {
      color: ${primary[500]};
    }
  }
`;

export default withRouter(PersonalMenuBtn);
