import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { white, greyscales, primary } from '../../Styles/Colors';
import copy from 'copy-to-clipboard';

const ShareBtn = ({ className, postType, postId }) => {
  const [message, setMessage] = useState(false);

  const clipboardHandler = e => {
    if (postType && postId) {
      const result = copy(`https://www.thebudy.com/${postType}/${postId}`);
      if (result) {
        setMessage(true);
        setTimeout(() => setMessage(false), 1000);
        return true;
      }
    }
    return false;
  };

  return (
    <Fragment>
      <Button className={className} onClick={clipboardHandler}>
        <span className="budy-share" />
      </Button>
      {message && (
        <Message>
          <span>Copyed to clipboard!</span>
        </Message>
      )}
    </Fragment>
  );
};

const Button = styled.div`
  cursor: pointer;
  border: none;
  outline: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0px;
  background-color: ${white};
  .budy-share {
    font-size: 24px;
    color: ${greyscales[400]};
  }
  :hover {
    background-color: ${greyscales[100]};
  }
  @media (max-width: 530px) {
    width: 28px;
    height: 24px;
    .budy-share {
      font-size: 20px;
    }
    :hover {
      background-color: ${white};
    }
  }
`;

const Message = styled.div`
  background-color: ${primary[500]};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  position: fixed;
  bottom: 16px;
  right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-radius: 4px;
  z-index: 500;
`;

export default ShareBtn;
