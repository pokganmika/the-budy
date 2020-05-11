import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues, safeYellows, negativeReds } from '../../../Common/Styles/Colors';
import mainImage from '../../../Images/helpcenter_main.jpg';


class HelpCenterSearchBarMain extends Component {

  render (){
    return (
      <UpperContainer>
        <img className='mainImage' src={mainImage} alt={mainImage} vertical-align='middle' />
        <div className='upperText'>
          Hello, this is Budy Help center!<br/>How can we help you?
        </div>
      </UpperContainer>
    )
  }
}

export default HelpCenterSearchBarMain;


const UpperContainer = styled.div`  
  width: 100%;
  height: 480px;
  background-color: ${primary[900]};
  position: relative;

  .mainImage {
    width: 100%;
    position: absolute;
    left: 0px; 
    top: 50%;
    transform: translateY(-43%);
  
    opacity: 0.4;
  }

  .upperText {
    width: 632px;
    height: 80px;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: ${white};

    position: absolute;
    left: 50%; 
    transform: translateX(-50%);
    top: 200px;
  }
`;