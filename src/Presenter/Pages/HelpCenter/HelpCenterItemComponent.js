import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues } from '../../../Common/Styles/Colors';


class HelpCenterItemComponent extends Component {


  render(){
    const { item, isCategory, sectionIndex, isMain } = this.props;

    const sections = item.sections.map((section, i) => {
      const menus = section.menus.map((menu, i) => {
        let className = 'itemContent'
        if (menu.title.length >= 39) {
          className = 'itemContent double'
        }
        return (
          <Link className='linkDefault' to={menu.url} key={i}><div className={className}>{menu.title}</div></Link> 
        );
      });
      return (
        <Fragment key={i}>
          <div className='categoryItem'>
            <Link className='linkDefault' to={section.url}><div className='itemUpper all'>{section.title}</div></Link>
            <div className='itemLower'>
              {menus}
            </div>
          </div>
        </Fragment>
      );
    });

    let menus = null
    if (!isMain && !isCategory) {
      menus = item.sections[sectionIndex].menus.map((menu, i) => {
        let className = 'itemContent'
        if (menu.title.length >= 39) {
          className = 'itemContent double'
        }
        return (
          <Link className='linkDefault' to={menu.url} key={i}><div className={className}>{menu.title}</div></Link> 
        );
      });
    }

    return(
      <Container>
        {
          isMain
          ?
          <Fragment>     
            <div className='categoryName'><Link className='linkDefault' to={item.url}><div className='categoryNameText'>{item.title}</div></Link></div>
            <div className='categoryContainer'>
              {sections}
              {item.sections.length < 3 ? <div className='categoryItem'></div> : null}
            </div>
          </Fragment>   
          :
          (
          isCategory
          ?
          <Fragment>         
            <div className='categoryName'><div className='categoryNameText'>{item.title}</div></div>
            <div className='categoryContainer'>
              {sections}
              {item.sections.length < 3 ? <div className='categoryItem'></div> : null}
            </div>
          </Fragment>   
          :
          <Fragment>         
            <div className='categoryName'><div className='categoryNameText'>{item.sections[sectionIndex].title}</div></div>
            <div className='categoryContainer'>
              <div className='categoryItem'>
                <div className='itemLower'>
                  {menus}
                </div>
              </div>
            </div>
          </Fragment>   
          )
        }          
      </Container>
    )
  }
}

export default HelpCenterItemComponent;

const Container = styled.div`

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

    margin: 0 auto;
    margin-top: 72px;
  }

  .categoryContainer {
    width: 1032px;
    margin: 0 auto;
    margin-top: 24px;

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

`