import React from "react";
import styled from "styled-components";

export default props => {
    return (
        <Editor id={props.id} className="custom-quill">
            {props.children}
        </Editor>
    );
};

const Editor = styled.div`
  &.custom-quill {
    display: flex;
    flex-direction: column;
    
    .budy-alert-circle-fill {
      font-size: 40px;
    }    
  }
`;
