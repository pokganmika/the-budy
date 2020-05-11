import React, { useEffect } from 'react';
import styled from 'styled-components';

function Modal({ type, children, close }) {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  return (
    <Backgrond type={type}>
      {children}
      <Close onClick={() => (close ? close() : null)} />
    </Backgrond>
  );
}

const Backgrond = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 40;
  transition: opacity 0.15s linear;
  display: flex;
  justify-content: ${({ type }) => (type === 'menu' ? 'left' : 'center')};
  align-items: ${({ type }) => (type === 'menu' ? 'left' : 'center')};
`;

const Close = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 41;
`;

export default Modal;
