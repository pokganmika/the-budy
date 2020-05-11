import React from 'react';
import styled from 'styled-components';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const targetElement = document.getElementsByClassName('App');

function TooltipBox({
  button,
  isOpen,
  _toggle,
  children,
  boxPosition,
  width
}) {
  if (window.innerWidth <= 580) {
    if (isOpen) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }
  }
  return (
    <Box>
      <div onClick={() => (_toggle ? _toggle() : null)}>
        {button ? button : null}
      </div>
      <Tooltip isOpen={isOpen} boxPosition={boxPosition} width={width}>
        {children}
      </Tooltip>
    </Box>
  );
}

const Box = styled.div`
  position: relative;
`;

const Tooltip = styled.div`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s linear;
  position: absolute;
  min-width: ${({ width }) => (width ? width : '180px')};
  left: ${({ boxPosition }) => (boxPosition ? boxPosition : '-76px')};
  top: 54px;
  border: solid 1px #e5e5e5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  @media (max-width: 580px) {
    position: fixed;
    left: 0px;
    top: 0px;
    width: -webkit-fill-available;
    height: 100%;
    border: solid 3px red;
  }
`;

// const Wrapper = styled.div`
//   position: relative;
//   border-radius: 3px;
//   ::before {
//     background-color: #ffffff;
//     position: absolute;
//     width: 10px;
//     height: 10px;
//     border-top: solid 1px #ccc;
//     border-left: solid 1px #ccc;
//     bottom: 100%;
//     left: ${({ arrowPositon }) => (arrowPositon ? arrowPositon : '87px')};
//     content: '';
//     transform: rotate(45deg);
//     margin-bottom: -4px;
//     @media (max-width: 580px) {
//       display: none;
//     }
//   }
// `;

export default TooltipBox;
