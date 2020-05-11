import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Textarea from '@material-ui/core/TextareaAutosize';
import AppContext from '../../../App/context';
import { primary, greyscales, white } from '../../../Common/Styles/Colors';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';

function CreateReplyView({
  postId,
  loading,
  CommentUserName,
  textLength,
  changeText,
  cancelView,
  createReply,
  borderList,
  getComments
}) {
  const textareaRef = useRef(null);

  const [isFocus, setFocus] = useState(false);

  const [appState] = useContext(AppContext);
  const userPhoto = appState.user.photoURL.small;
  const userName = appState.user.displayName;

  useEffect(() => {
    textareaRef.current.focus();
  }, []);


  return (
    <View name="createReply-view" isFocus={isFocus}>
      <div className="left">
        {borderList.map(({ level }, id) => (
          <BorderBox className={`border-level-${level}`} key={id}>
            <div className="border" />
          </BorderBox>
        ))}
      </div>
      <div className="right">
        <div className="guide">
          <span>Reply to comment by </span>
          <span>{CommentUserName}</span>
        </div>
        <div className="userPhoto">
          <img className="user-image" src={userPhoto || ''} alt="" />
          <div className="user-name">{userName}</div>
        </div>
        <div className="textarea-wrapper">
          <Textarea
            className="textarea"
            placeholder="Add your comment..."
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
              state={textLength > 0 ? 'normal' : 'disabled'}
              width="64px"
              onClick={() => createReply(postId, getComments)}
            />
          )}
        </div>
      </div>
    </View>
  );
}

const View = styled.div`
  display: flex;
  background-color: ${white};
  .left {
    display: flex;
  }
  @media (max-width: 530px) {
    .left {
      display:none;
    }
  }

  .right {
    padding: 8px;
    width: 100%;
  }
  .border-level-1 {
    visibility: hidden;
  }
  .guide {
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 8px;
    span:first-child {
      color: ${greyscales[500]};
    }
    span:last-child {
      color: ${primary[500]};
      cursor: pointer;
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
      font-size: 16px;
      color: ${greyscales[900]};
      margin: 0px 16px;
    }
  }
`;

const BorderBox = styled.div`
  min-width: 40px;
  display: flex;
  justify-content: center;
  height: 100%;
  .border {
    border: solid 1px ${greyscales[200]};
  }
`;

export default CreateReplyView;
