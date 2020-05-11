import React from "react";
import styled from "styled-components";
import {greyscales} from "../../Styles/Colors";

export default props => {
    const addedClassName = props.className || '';

    return (
        <Container id={props.id} className={`custom-quill__container ${addedClassName}`}>
            {props.children}
        </Container>
    );
};

const Container = styled.div`
  &.custom-quill__container.custom-quill__container {
    border: none;
    font-family: 'Work Sans', sans-serif;
    height: auto !important;
    padding: 16px 0;
    
    .ql-editor {
      position: relative;
      padding: 0;
      color: ${greyscales[900]};
      
      &.ql-blank::before {
        font-size: 20px;
        font-style: normal;
        line-height: 1.6;
        color: ${greyscales[400]};
        left: 0;
        right: 0;
        
        @media (max-width: 530px) {
          font-size: 16px;
          line-height: 1.5;
        }
      }
      
      blockquote {
        font-size: 20px;
        line-height: 1.6;
      }

      p {
        font-size: 20px;
        line-height: 1.6;
        
        @media (max-width: 530px) {
          font-size: 16px;
          line-height: 1.5;
        }

        strong {
          font-weight: 700;
        }

        img {
          height: 300px;
          object-fit: contain;
          width: 100%;
          
          @media (max-width: 530px) {
            height: 216px;
          }
        }
      }

      ul {
        font-size: 16px;
        line-height: 1.5;
        padding-left: 16px;

        li {
          padding-left: 24px;

          ::before {
            text-align: center;
            width: 16px;
          }
        }
      }

      ol {
        font-size: 16px;
        line-height: 1.5;
        padding-left: 16px;

        li {
          padding-left: 24px;

          ::before {
            text-align: center;
            width: 16px;
          }
        }
      }
    }
    
    .ql-video {
      height: 300px;
      width: 100%;
    }

    .ql-tooltip {
      left: 10% !important;
      z-index: 1;
    }
  }
`;
