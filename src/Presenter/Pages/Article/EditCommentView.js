import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Textarea from '@material-ui/core/TextareaAutosize';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import { greyscales, white } from '../../../Common/Styles/Colors';
import AppContext from '../../../App/context';

function EditCommentView({ loading, text, changeText, cancelView, updateReply }) {
  const [isFocus, setFocus] = useState(false);
  const textareaRef = useRef(null);

  const [appState] = useContext(AppContext);
  const userPhoto = appState.user.photoURL.small;
  const userName = appState.user.displayName;

  useEffect(() => {
    const textarea = textareaRef.current;
    const length = textarea.value.length;
    textarea.focus();
    textarea.setSelectionRange(length, length);
  }, []);

  return (
    <View isFocus={isFocus}>
      <div className="guide">
        <span>Editing comment...</span>
      </div>
      <div className="userPhoto">
        <img className="user-image" src={userPhoto} alt="" />
        <div className="user-name">{userName}</div>
      </div>
      <div className="textarea-wrapper">
        <Textarea
          className="textarea"
          placeholder="Add your comment..."
          value={text}
          onChange={changeText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={textareaRef}
        />
      </div>
      <div className="actions">
        <div className="cancelBtn" onClick={cancelView}>
          Cancel
        </div>
        {loading ? (
          <PrimaryBtn size="small" state="loading" width="64px" />
        ) : (
          <PrimaryBtn
            text="REPLY"
            size="small"
            state={text.length > 0 ? 'normal' : 'disabled'}
            width="64px"
            onClick={() => updateReply()}
          />
        )}
      </div>
    </View>
  );
}

const View = styled.div`
  padding: 8px;
  width: 100%;
  .guide {
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 8px;
    span {
      color: ${greyscales[500]};
    }
  }
  .userPhoto {
    display: flex;
    align-items: center;
    min-height: 32px;
    .user-image {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      border-radius: 50%;
    }
    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: ${greyscales[900]};
    }
  }
  .textarea-wrapper {
    margin: 4px 0px;
    padding: 8px;
    display: flex;
    background-color: ${({ isFocus }) => (isFocus ? white : greyscales[100])};
    .textarea {
      width: 100%;
      border: none;
      outline: none;
      margin: 0px;
      padding: 0px;
      font-size: 16px;
      resize: none;
      background-color: inherit;
      color: ${greyscales[700]};
      ::placeholder {
        color: ${greyscales[300]};
      }
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 48px;
    .cancelBtn {
      cursor: pointer;
      font-size: 14px;
      color: ${greyscales[900]};
      margin: 0px 16px;
    }
  }
`;

export default EditCommentView;
