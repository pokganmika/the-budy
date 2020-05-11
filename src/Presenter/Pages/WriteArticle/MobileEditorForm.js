import React, { useContext } from 'react';
import styled from 'styled-components';
import Icon from '../../../Common/Modules/Icon';
import CustomEditorMobile from '../../../Common/Modules/WysiwygEditor/CustomEditorMobile';
import { PostContext } from '../../../Provider/Post/postContext';

function MobileEditorForm() {
  const {
    state: { body, bodyLength },
    handlers: { changeBody, closeMobileEditor, completeBody }
  } = useContext(PostContext);
  return (
    <Form>
      <Header>
        <div className="mobileEditor-header-titleWrapper">
          <Icon
            type="arrow-ios-back-outline"
            size="20px"
            cursor="pointer"
            onClick={closeMobileEditor}
          />
          <Title>Does It Help to Get High via ...</Title>
        </div>
        {bodyLength > 0 && <DoneButton onClick={completeBody}>Done</DoneButton>}
        {bodyLength <= 0 && <DoneButton disabled={true}>Done</DoneButton>}
      </Header>
      <CustomEditorMobile body={body} onChange={changeBody} />
    </Form>
  );
}

const Form = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 52;
  background-color: #ffffff;
`;

const Header = styled.header`
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
  padding: 0px 16px;
  .mobileEditor-header-titleWrapper {
    display: flex;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px 8px;
`;

const DoneButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ disabled }) =>
    disabled === true ? 'rgba(0, 0, 0, 0.3)' : '#0074ff'};
  cursor: pointer;
`;

export default MobileEditorForm;
