import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { greyscales, white } from '../../../Common/Styles/Colors';
import Icon from '../../../Common/Elements/Icon';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import CustomQuill from '../../../Common/Collections/CustomQuill/CustomQuill';
import AppContext from '../../../App/context';
import { PostListContext } from '../../../Provider/Post/postContext';

function useEditorContainer(body) {
  const initialState = {
    body: body || '',
    text: '',
    textLength: 0
  };
  const [state, setState] = useState(initialState);

  return [state, setState];
}

function EditAnswerView({ answerId, initialBody, close, type }) {
  const [appState] = useContext(AppContext);
  const userPhoto = appState.user.photoURL ? appState.user.photoURL.small : '';
  const userName = appState.user.displayName || '';

  const [container, setContainer] = useEditorContainer(initialBody);
  const { body, text, textLength } = container;

  const [answerListState, answerListHandlers] = useContext(PostListContext);
  const { loading } = answerListState;
  const { editAnswer } = answerListHandlers;

  const saveEdit = async () => {
    if ((textLength === 0) || (container.body === initialBody)) {
      return;
    }

    const result = await editAnswer(answerId, body, text);
    if (result) {
      return close();
    }
  };

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
          <span className="editing">Editing answer...</span>
          <Icon
            className="deleteBtn"
            name="delete"
            onClick={close}
            size="16px"
          />
        </UserInfo>
      </header>
      <main>
        <CustomQuill
          postId={answerId}
          container={container}
          initialBody={initialBody}
          setContainer={setContainer}
          quillToolbarId="quillToolbarIdForEdit"
          quillContainerId="quillContainerIdForEdit"
          type={type}
        />
      </main>
      <footer>
        {loading ? (
          <PrimaryBtn size="small" width="120px" state="loading" />
        ) : (
          <PrimaryBtn
            text="SAVE EDIT"
            size="small"
            width="120px"
            state={
              textLength > 0 && container.body !== initialBody
                ? 'hovered'
                : 'disabled'
            }
            onClick={saveEdit}
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
  .editing {
    margin-left: 8px;
    font-size: 12px;
    color: ${greyscales[500]};
  }
  .deleteBtn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px;
    cursor: pointer;
  }
`;

export default EditAnswerView;
