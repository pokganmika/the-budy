import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues, safeYellows, negativeReds } from '../../../Common/Styles/Colors';



class HelpCenterAskMoreComponent extends Component {

  render (){
    return (
    <Container>
      <div className='btnContainer'>
        <div className='btnText'>Have more question?</div>
        <Link className='linkDefault' to='/helpcenter/ask'>
          <div className='btn'>
            ASK TO BUDY
          </div>
        </Link>
      </div>
      </Container>
    )
  }
}

export default HelpCenterAskMoreComponent;


const Container = styled.div`  

.linkDefault {
  color: black;
}

.btnContainer {
  width: 100%;
  height: 128px;
  padding: 24px 0;
  
  .btnText {  
    width: 146px;
    height: 32px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: center;
    color: ${greyscales[900]};
    
    margin: 0 auto;
    padding-bottom: 16px;
  }

  .btn {  
    width: 424px;
    height: 48px;
    border-radius: 8px;
    background-color: ${primary[500]};
    
    margin: 0 auto;
    padding: 14px 0;
    text-align: center;  
    
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: ${white};
  }
}


`