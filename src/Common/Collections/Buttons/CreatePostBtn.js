import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../Modules/Icon';
import { PrimaryBtn } from '../../Elements/Buttons/SolidButton';
import { greyscales, white, alphaValues, primary } from '../../Styles/Colors';
import Modal from '../../Collections/Modal';
import CreateQuestion from '../../../Container/Modals/CreateQuestion';

function CreatePostBtn({ viewPortType, history }) {
  const node = useRef();
  const [isOpen, setOpen] = useState(false);
  const [currentView, setView] = useState(null);
  
  const handleClick = e => {
    if (node.current.contains(e.target)) return;
    setOpen(false);
  };

  const selectPost = type => {
    setOpen(false);
    if (type === 'article') history.push('/write-article');
    if (type === 'question') setView('createQuestion');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  let button = (
    <PrimaryBtn
      onClick={() => setOpen(!isOpen)}
      size="small"
      state={'pressed'}
      Icon={
        <Icon
          type="plus-outline"
          size="20px"
          color="#FFFFFF"
          cursor="pointer"
        />
      }
    />
  );
  if (viewPortType === 'mobile') {
    button = (
      <Icon
        type="plus-square-outline"
        width="24px"
        height="24px"
        cursor="pointer"
        // onClick={openPostTypeSelection}
      />
    );
  }
  return (
    <View ref={node} isOpen={isOpen}>
      <PrimaryBtn
        className="createPostBtn"
        onClick={() => setOpen(!isOpen)}
        size="small"
        Icon={
          <Icon
            type="plus-outline"
            size="20px"
            color="#FFFFFF"
            cursor="pointer"
          />
        }
      />
      {isOpen && (
        <Tooltip positionType="right">
          <Title>
            <div className="label">Select Post Type</div>
            <div className="text">Choose a type of post on your context.</div>
          </Title>
          <Selector onClick={() => selectPost('article')}>
            <div className="label">Article</div>
            <div className="text">
              Here's the most effective way of share your knowledge and
              know-hows for the others.
            </div>
          </Selector>
          <Selector onClick={() => selectPost('question')}>
            <div className="label">Question</div>
            <div className="text">
              Add a question post if you have some curiosities about any kind of
              Cannabis, And get the answers quickly.
            </div>
          </Selector>
        </Tooltip>
      )}
      {currentView === 'createQuestion' && (
        <Modal close={() => setView(null)}>
          <CreateQuestion
            closeModal={() => setView(null)}
            closeCreateQuestion={() => setView(null)}
          />
        </Modal>
      )}
    </View>
  );
}

const View = styled.div`
  position: relative;
`;

const Tooltip = styled.div`
  position: absolute;
  min-width: 152px;
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

const Title = styled.div`
  width: 400px;
  height: 104px;
  padding: 24px;
  border-bottom: solid 2px ${greyscales[200]};
  background-color: ${white};
  .label {
    font-size: 20px;
    font-weight: 600;
    color: ${greyscales[900]};
    line-height: 1.6;
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[500]};
    line-height: 1.75;
  }
`;

const Selector = styled.div`
  width: 400px;
  padding: 32px 24px;
  background-color: ${white};
  cursor: pointer;
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
  :hover {
    background-color: ${greyscales[100]};
  }
`;

export default withRouter(CreatePostBtn);
