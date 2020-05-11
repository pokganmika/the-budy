import React from "react";
import styled from "styled-components";
import {greyscales, primary, white} from "../../Styles/Colors";
import icons from './Icons';

export default ({id, textLength}) => {
    return (
        <Toolbar
            id={id}
            className="custom-quill__toolbar"
            textLength={textLength}
        >
            <div className="left">
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                </span>
                <span className="ql-formats">
                    <button className="ql-blockquote" />
                </span>
                <span className="ql-formats">
                    <button className="ql-image">
                    </button>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="bullet" />
                    <button className="ql-list" value="ordered" />
                    <button className="ql-indent" value="+1" />
                    <button className="ql-indent" value="-1" />
                </span>
                <span className="ql-formats">
                    <button className="ql-video" />
                    <button className="ql-link" />
                </span>
            </div>
        </Toolbar>
    );
};

const Toolbar = styled.div`
  &.custom-quill__toolbar.custom-quill__toolbar {
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0px 16px;
    background-color: ${white};
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
    border: none;
    border-radius: 4px;
    margin-bottom: 24px;
    position: sticky;
    top: 56px;
    z-index: 1;
    
    @media (max-width: 530px) {
    
    }
    
    .left {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .ql-formats {
      align-items: center;
      display: flex;
      margin-right: 0;
      
      :not(:last-child) {
        :after {
          border-right: 1px solid ${greyscales[200]};
          content: '';
          height: 24px;
        }
      }
    }
    
    .ql-active svg {
      fill: ${primary[500]};
    }
    
    button {
      position: relative;
      z-index: 1;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      background-color: ${white};
      
      :hover {
        background-color: ${greyscales[100]};
      }
      
      svg {
        fill: ${greyscales[900]};
        height: 16px;
        width: 16px;
      }
    }
  }
`;
