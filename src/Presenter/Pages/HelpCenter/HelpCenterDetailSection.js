import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues } from '../../../Common/Styles/Colors';
import helpCenterCategories from './HelpCenterMenu';
import HelpCenterItemComponent from './HelpCenterItemComponent'
import HelpCetnerFooter from './HelpCenterFooter'

class HelpCenterDetailSection extends Component {

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  render(){
    const { category, section } = this.props;
    let index = 0;
    switch (category) {
      case 'account':
        index = 0;
        break;
      case 'reading':
        index = 1;
        break;
      case 'writing':
        index = 2;
        break;
      case 'policy':
        index = 3;
        break;
      default:
        index = 0;
    }

    let isCategory = true;
    let sectionIndex = 0;

    switch (section) {
      case '1':
        isCategory = false;
        sectionIndex = 0;
        break;
      case '2':
        isCategory = false;
        sectionIndex = 1;
        break;
      case '3':
        isCategory = false;
        sectionIndex = 2;
        break;
      default:
        isCategory = true;
    }

    const item = helpCenterCategories[index]

    const depthCurrent = isCategory ? 'depthCurrent' : 'depthCurrent Middle' 

    return (
      <Container>
        <SeactionContainer>
          <div className='upperContainer'>
            <div className='depth'>
              <Link className='linkDefault' to='/helpcenter'><span className='depthDefault'>Budy Help Center</span></Link>
              <span className='budy-chevron-right'/>
              {
                isCategory
                ?
                <span className={depthCurrent}>{item.title}</span>
                :
                <Link className='linkDefault' to={item.url}><span className={depthCurrent}>{item.title}</span></Link>
              }
              {
                isCategory
              ?
              null
              :
              <Fragment>        
                <span className='budy-chevron-right'/>
                <span className='depthSection'>{item.sections[sectionIndex].title}</span>
              </Fragment>
              }
            </div>
          </div>
          <HelpCenterItemComponent item={item} isMain={false} isCategory={isCategory} sectionIndex={sectionIndex}/>
        </SeactionContainer>
        <HelpCetnerFooter/>
      </Container>
    )
  }
}

export default HelpCenterDetailSection;

const Container = styled.div`
`;

const SeactionContainer = styled.div`    
  width: 100%;;
  height: 920px;
  background-color: ${white};
  border: 1px solid ${white};

  position: relative;
  

  .linkDefault {
    color: black;
  }

  .upperContainer {  
    width: 1032px;
    height: 64px;

    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .depth {
    height: 24px;

    .depthDefault {  
      width: 138px;
      height: 24px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: ${primary[500]}
    }

    .budy-chevron-right {
      padding-top:7px;
      padding-left: 9px;
      padding-right: 9px;
      font-sizeL 16px;
      color: ${greyscales[300]}
    }

    .depthCurrent {
      height: 24px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: ${greyscales[900]}

      &.Middle {
        color: ${primary[500]}
      }
    }

    .depthSection {  
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: ${greyscales[900]}
    }
  }
`;