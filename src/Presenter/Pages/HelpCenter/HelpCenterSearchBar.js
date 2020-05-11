import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues, safeYellows, negativeReds } from '../../../Common/Styles/Colors';



class HelpCenterSearchBar extends Component {

  render (){
    return (
    <Container>
      <div className='searchContainer'>
        <div className='searchIcon'>
          <span className='budy-search'/>
        </div>
        <div className='searchInput'>
          <input type='text' className='searchInputText' placeholder='Search'/>
        </div>
      </div>
      </Container>
    )
  }
}

export default HelpCenterSearchBar;

const Container = styled.div`  

  .linkDefault {
    color: black;
  }

  .searchContainer {  
    width: 328px;
    height: 32px;
    border-radius: 4px;
    background-color: ${sub[100]};

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .searchIcon {
      width: 20px;
      height: 20px;
      text-align: center;
      margin-left: 8px;
      margin-right: 4px;
    }
    .budy-search {  
      font-size: 12px;
      color: ${greyscales[500]};
    }
    .searchInput {    
      width: 288px;
      height: 20px;

      .searchInputText {
        width: 100%;
        height: 100%;

        border: none;
        outline: none;  
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        background-color: ${sub[100]};
        color: ${greyscales[900]};

        ::placeholder {
          color: ${greyscales[400]};
        }
      }
    }
`