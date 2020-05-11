import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { white, greyscales, positiveBlues, primary } from '../../Styles/Colors';

const ScrapBtn = ({ isScrap, clickHandler }) => {

  const [message, setMessage] = useState(false);
  
  const messageHandler = async () => {
    let ret_val = await clickHandler();
    let previousScrapCondition = isScrap;

    if (ret_val) {

      if (previousScrapCondition == false) {
        setMessage('Post stored');
      }

      if (previousScrapCondition == true) {
        setMessage('Store canceled');
      }
      
      setTimeout(() => setMessage(null), 1000);
      return true;
    }
  };

  return (
    <Fragment>
      <Button onClick={messageHandler} isScrap={isScrap} message={message}>
        {isScrap ? (
          <span className="budy-archive-fill" />
        ) : (
          <span className="budy-archive" />
        )}
      </Button>
      {message && (
        <Message>
          <span>{message}</span>
        </Message>
      )}
    </Fragment>
  );
};

export default ScrapBtn;

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

const Button = styled.div`
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: ${white};
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 40px;
  height: 40px;
  .budy-archive {
    font-size: 24px;
    color: ${greyscales[400]};
  }
  .budy-archive-fill {
    font-size: 24px;
    color: ${positiveBlues[500]};
  }
  :hover {
    background-color: ${greyscales[100]};
  }
  @media (max-width: 530px) {
    width: 28px;
    height: 24px;
    .budy-archive {
      font-size: 20px;
    }
    .budy-archive-fill {
      font-size: 20px;
    }
    :hover {
      background-color: ${white};
    }
  }
`;