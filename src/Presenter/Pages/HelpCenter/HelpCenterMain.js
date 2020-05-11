import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues } from '../../../Common/Styles/Colors';
import Image from '../../../Common/Elements/Image';
import budyWordmark from '../../../Images/budy_Wordmark.svg';
import helpCenterCategories from './HelpCenterMenu';
import HelpCenterSearchBarMain from './HelpCenterSearchBarMain';
import HelpCenterItemComponent from './HelpCenterItemComponent';
import HelpCenterFooter from  './HelpCenterFooter';
import HelpCenterAskMoreComponent from './HelpCenterAskMoreComponent';

class HelpCenterMain extends Component {  

  render(){
    const allItems = helpCenterCategories.map((item, i) => {
      return (
        <HelpCenterItemComponent item={item} isMain={true} key={i}/>
      )
    })

    return (
      <Container>
        <HelpCenterSearchBarMain/>

        <TopContainer>
          <div className='topText'>
            Top Categories
          </div>
          <div className='topItemContainer'>
            <Link className='linkDefault' to='/helpcenter/account/main'>
              <div className='topItem'>
                <div className='topItemImage'><span className='budy-user'/></div>
                <div className='topItemText'>Account &<br/>Preferences</div>
                <div className='topItemMoreText'>11 Items</div>
                <div className='topItemMoreImage'><span className='budy-arrow-right'/></div>
              </div>
            </Link>
            <Link className='linkDefault' to='/helpcenter/reading/main'>
              <div className='topItem'>
                <div className='topItemImage'><span className='budy-message'/></div>
                <div className='topItemText'>Reading</div>
                <div className='topItemMoreText'>6 Items</div>
                <div className='topItemMoreImage'><span className='budy-arrow-right'/></div>
              </div>
            </Link>
            <Link className='linkDefault' to='/helpcenter/writing/main'>
              <div className='topItem'>
                <div className='topItemImage'><span className='budy-edit'/></div>
                <div className='topItemText'>Writing</div>
                <div className='topItemMoreText'>7 Items</div>
                <div className='topItemMoreImage'><span className='budy-arrow-right'/></div>
              </div>
            </Link>
            <Link className='linkDefault' to='/helpcenter/policy/main'>
              <div className='topItem'>
                <div className='topItemImage'><span className='budy-globe'/></div>
                <div className='topItemText'>Polices & Safety</div>
                <div className='topItemMoreText'>13 Items</div>
                <div className='topItemMoreImage'><span className='budy-arrow-right'/></div>
              </div>
            </Link>
          </div>
        </TopContainer>

        <UpdateContainer>
          <div className='categoryUpperText update'>Lastest update</div>
          <div className='categoryContainer update'>
            <div className='categoryItem update'>
              <div className='itemUpper'>
                Released DD.MM.YYYY
              </div>
              <div className='itemLower'>
                <div className='itemContent'>Contact Budy Support</div>
                <div className='itemContent'>Using Budy</div>
                <div className='itemContent'>Budy Glossary</div>
                <div className='itemContent'>Supported browsers</div>
              </div>
            </div>
            <div className='categoryItem'>
              <div className='itemUpper'>
                Released DD.MM.YYYY
              </div>
              <div className='itemLower'>
                <div className='itemContent'>Contact Budy Support</div>
                <div className='itemContent'>Using Budy</div>
                <div className='itemContent'>Budy Glossary</div>
                <div className='itemContent'>Supported browsers</div>
                <div className='itemContent'>Budy Glossary</div>
                <div className='itemContent'>Supported browsers</div>
              </div>
            </div>
            <div className='categoryItem'>
              <div className='itemUpper'>
                Released DD.MM.YYYY
              </div>
              <div className='itemLower'>
                <div className='itemContent'>Contact Budy Support</div>
                <div className='itemContent'>Using Budy</div>
                <div className='itemContent'>Budy Glossary</div>
              </div>
            </div>
          </div>
          <div className='updateMoreContainer'>
            <div className='updateMoreWrapper'>
              <div className='updateMoreText'>View all</div>
              <div className='updateMoreBtn'><span className='budy-arrow-right' /></div>
            </div>
          </div>
        </UpdateContainer>

        <AllContainer>
          <div className='categoryUpperText all'>All update</div>
          {allItems}
        </AllContainer>

        <AskMoreContainer>
          <HelpCenterAskMoreComponent/>
        </AskMoreContainer>

        <HelpCenterFooter/>
      </Container>
    )
  }
}

export default HelpCenterMain;

const Container = styled.div`
  width: 100%;
  min-height: 3299px;
  background-color: ${white};
  
  .linkDefault {
    color: black;
  }

  .categoryName {
    width: 1032px; 
    height: 47px;
    margin: 0 auto;
    margin-top: 24px;
    border-bottom: 1px solid ${greyscales[200]}

    .categoryNameText {
      width: 1032px; 
      height: 40px;
      font-size: 32px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      color: ${greyscales[900]}
    }
  }

  .categoryUpperText {
    width: 1032px;
    height: 24px;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: right;
    color: ${greyscales[500]};
    text-align: left;  

    &.update {
      position: absolute;
      left: 50%; 
      transform: translateX(-50%);
      top: 72px;
    }

    &.all {
      margin: 0 auto;
      margin-top: 72px;
    }
  }

  .categoryContainer {
    width: 1032px;
    margin: 0 auto;
    margin-top: 24px;

    &.update {
      position: absolute;
      left: 50%; 
      transform: translateX(-50%);
      top: 120px;
    }

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .categoryItem {
    width: 328px;
  }

  .itemUpper {
    width: 328px;
    height: 40px;
    padding: 8px 0;
    text-align: left;  
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${greyscales[900]};

    &.all {
      padding: 0px;
      height: 28px;
      font-size: 24px;
      color: ${greyscales[700]};
    }

  }

  .itemLower {
    width: 328px;
    padding-top: 8px;
    padding-bottom: 40px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .itemContent {
    width: 328px;
    height: 24px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${primary[500]};
    margin-top: 8px;

    &.double {
      height: 48px;
    }
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 402px;
  background-color: ${sub[100]};
  position: relative;

  .topText {  
    width: 1032px;
    height: 24px;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: ${greyscales[500]};

    position: absolute;
    left: 50%; 
    transform: translateX(-50%);
    top: 72px;
  }

  .topItemContainer {
    width: 1032px;
    height: 178px;

    position: absolute;
    left: 50%; 
    transform: translateX(-50%);
    top: 120px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .topItem {  
    width: 240px;
    height: 178px;
    border-radius: 8px;
    box-shadow: 0 40px 45px 0 rgba(0, 0, 0, 0.08);
    background-color: ${white};

    position: relative;

    .topItemImage {
      .budy-user {
        font-size: 40px;
        color: ${sub[200]};

        position: absolute;
        left: 29px; 
        top: 27px;
      }

      .budy-message {
        font-size: 40px;
        color: ${sub[200]};

        position: absolute;
        left: 29px; 
        top: 27px;
      }

      .budy-edit {
        font-size: 40px;
        color: ${sub[200]};

        position: absolute;
        left: 29px; 
        top: 27px;
      }

      .budy-globe {
        font-size: 40px;
        color: ${sub[200]};

        position: absolute;
        left: 29px; 
        top: 27px;
      }
    }

    .topItemText {
      width: 192px;
      height: 42px;
      font-size: 18px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: ${greyscales[900]};

      position: absolute;
      left: 50%; 
      transform: translateX(-50%);
      top: 72px;
      text-align: left
    }

    .topItemMoreText{  
      width: 58px;
      height: 16px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: ${greyscales[500]};

      position: absolute;
      left: 128px; 
      top: 134px;
    }

    .topItemMoreImage {

      .budy-arrow-right {
        font-size: 24px;
        color: ${primary[500]};
      }

      position: absolute;
      left: 196px; 
      top: 134px;
    }
  }
`;

const UpdateContainer = styled.div`  
  width: 100%;
  height: 480px;
  position: relative;
  background-color: ${white}

  .updateMoreContainer {
    width: 1032px;
    height: 32px;

    position: absolute;
    left: 50%; 
    transform: translateX(-50%);
    top: 424px;

    padding-right: 10px;

    .updateMoreWrapper {  
      width: 72px;
      height: 32px;
    
      float: right;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .updateMoreText {  
        width: 54px;
        height: 16px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: right;
        color: ${greyscales[500]};  
      }

      .updateMoreBtn {
        .budy-arrow-right {
          font-size: 16px;
          color: ${greyscales[500]}
        }
      }
    }
  }

`;

const AllContainer = styled.div`  
  width: 100%;
  height: 1478px;
  background-color: ${sub[100]};

  border: 1px solid ${sub[100]};

  position: relative;
`;

const AskMoreContainer = styled.div`  
  width: 100%;
  position: relative;
  padding-top: 24px;
  padding-bottom: 40px;
`