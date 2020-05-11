import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../../../App/context';
import { white, greyscales, sub } from '../../../Common/Styles/Colors';
import Icon from '../../../Common/Modules/Icon';
import TextEditor from './TextEditor';
import useCreateComment from '../../../Provider/Comment/useCreateComment';

function CreateCommentView({
  className,
  postUserName,
  postId,
  history,
  getComments,
  presentAccountRequirePopup,
}) {
  const [appState] = useContext(AppContext);
  const userPhoto = appState.user.photoURL ? appState.user.photoURL.small : '';
  const authentication = appState.user.authentication;

  const [createCommentState, createCommentHandlers] = useCreateComment();
  const { isComment, loading, text } = createCommentState;
  const {
    setCommentView,
    changeComment,
    cancelComment,
    createComment
  } = createCommentHandlers;

  const _createComment = () => createComment(postId, getComments);

  return (
    <View name="createComment-view" className={className}>
      {isComment ? (
        <TextEditor
          postUserName={postUserName}
          changeComment={changeComment}
          text={text}
          loading={loading}
          cancelComment={cancelComment}
          createComment={_createComment}
        />
      ) : (
        <AddCommentBtn
          name="addComment-btn"
          onClick={() => {
            if (authentication) return setCommentView();
            presentAccountRequirePopup();
            // alert('You must be registered to post a comment.');
            // history.push('/signup');
          }}
        >
          {authentication ? (
            <img className="image" src={userPhoto} alt="" />
          ) : (
            <Icon
              type="message-circle-outline"
              color={greyscales[900]}
              size="24px"
              margin="8px"
            />
          )}
          <div className="text">Add your comments...</div>
        </AddCommentBtn>
      )}
    </View>
  );
}

const View = styled.div`
  background-color: ${white};
`;

const AddCommentBtn = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
  background-color: ${sub[100]};
  cursor: pointer;
  padding: 0px 16px;
  .image {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[500]};
    margin-left: 8px;
    line-height: 1.75;
  }
  :hover {
    background-color: ${sub[200]};
  }
  @media (max-width: 530px) {
    min-height: 40px;
    :hover {
      background-color: ${sub[100]};
    }
  }
`;

export default withRouter(CreateCommentView);
