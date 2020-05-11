import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { greyscales, white } from '../../../Common/Styles/Colors';
import Icon from '../../../Common/Elements/Icon';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import CustomQuill from '../../../Common/Collections/CustomQuill/CustomQuill';
import AppContext from '../../../App/context';
import { PostListContext } from '../../../Provider/Post/postContext';
import useCreateAnswer from '../../../Provider/Post/useCreateAnswer';

function useEditorContainer() {
  const initialState = {
    body: '',
    text: '',
    textLength: 0
  };
  const [state, setState] = useState(initialState);

  return [state, setState];
}

function CreateAnswerView({ questionId, setOpen }) {
  const _questionId = questionId || 0;
  const _setOpen = setOpen || function() {};

  const [appState] = useContext(AppContext);
  const userPhoto = appState.user.photoURL ? appState.user.photoURL.small : '';
  const userName = appState.user.displayName || '';

  const [answerListState, answerListHandlers] = useContext(PostListContext);
  const {} = answerListState;
  const { getAnswers } = answerListHandlers;

  const [container, setContainer] = useEditorContainer();
  const { body, text, textLength } = container;

  const [createAnswerState, createAnswerhandlers] = useCreateAnswer();
  const { answerId, loading } = createAnswerState;
  const { addAnswer, createDraft } = createAnswerhandlers;

  const _close = () => _setOpen(false);

  const _addAnswer = () => {
    if (textLength === 0) return;
    const updateAnswers = () => getAnswers(_questionId, answerId);
    return addAnswer(body, text, updateAnswers, _close);
  };

  useEffect(() => {
    createDraft(_questionId);
  }, []);

  useEffect(() => {
    const onResize = e => {
      document.body.style.overflow = (window.innerWidth <= 530) ? 'hidden' : 'auto';
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', onResize);
    }
  });

  return (
    <View name="createAnswer-view">
      <header>
        <UserInfo>
          <img className="userPhoto" src={userPhoto} alt="" />
          <span className="userName">{userName}</span>
          <Icon
            className="deleteBtn"
            name="delete"
            onClick={_close}
            size="16px"
          />
        </UserInfo>
      </header>
      <main>
        <CustomQuill
          postId={answerId}
          container={container}
          setContainer={setContainer}
          quillToolbarId="quillToolbarIdForCreate"
          quillContainerId="quillContainerIdForCreate"
        />
      </main>
      <footer>
        {loading ? (
            <PrimaryBtn size="small" width="120px" state="loading" />
        ) : (
            <PrimaryBtn
                text="ADD ANSWER"
                size="small"
                width="120px"
                state={textLength > 0 ? 'hovered' : 'disabled'}
                onClick={_addAnswer}
            />
        )}
      </footer>
    </View>
  );
}

const View = styled.div`
  border: solid 1px ${greyscales[200]};
  border-radius: 4px;
  display:flex;
  flex-direction: column;
  margin: 24px 0px 24px 56px;
  
  @media (max-width: 530px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: ${white};
    margin: 0px;
    width: 100%;
    height: 100vh;
  
    footer {
      position: fixed;
      bottom: 0px;
      width: 100%;
    }
  }
  
  header {
    padding: 16px 16px 0px 16px;
    border-bottom: solid 1px ${greyscales[200]};
  }
  
  main {
    @media (max-width: 530px) {
      flex: 1;
      overflow-y: auto;
    }
    
    .custom-quill.custom-quill {
      @media (max-width: 530px) {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-bottom: 56px;
      }
    }
    
    .custom-quill__toolbar.custom-quill__toolbar {
      top: 0;
    }
    
    .custom-quill__container.custom-quill__container {
      flex: 1;
      min-height: 175px;
      overflow: auto;
      padding: 16px;
    }
  }
  
  footer {
    min-height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 16px;
  }
`;

const UserInfo = styled.div`
  position: relative;
  min-height: 56px;
  display: flex;
  align-items: center;
  .userPhoto {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 0px 8px;
  }
  .userName {
    font-size: 16px;
    font-weight: 500;
    color: ${greyscales[900]};
  }
  .deleteBtn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px;
    cursor: pointer;
  }
`;

export default CreateAnswerView;
