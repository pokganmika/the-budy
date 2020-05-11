import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AgeVerificationForm from '../../Presenter/Modals/AgeVerification/AgeVerificationForm';
import { disableBodyScroll } from 'body-scroll-lock';

const targetElement = document.getElementsByClassName('App');

function AgeVerification() {
  const [show] = useState(false);

  useEffect(() => {
    disableBodyScroll(targetElement);
  }, []);

  return (
    <Modal show={show}>
      <AgeVerificationForm />
    </Modal>
  );
}

const Modal = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default AgeVerification;
