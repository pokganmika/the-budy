import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues, safeYellows, negativeReds } from '../../../Common/Styles/Colors';
import helpCenterCategories from './HelpCenterMenu';
import HelpCetnerFooter from './HelpCenterFooter';
import HelpCenterDetailPageComponent from './HelpCenterDetailPageComponent';
import HelpCenterAskMoreComponent from './HelpCenterAskMoreComponent';

class HelpCenterDetailPage extends Component {

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  render(){
    const { id } = this.props;
    if (id === null || id === '') {
      this.props.history.push('/helpcenter');
    }

    const postInfo = id.split('_');
    const category = postInfo[0];
    const section = postInfo[1];
    const postId = parseInt(postInfo[2]);

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
        this.props.history.push('/helpcenter');
    }

    let sectionIndex = 0;

    switch (section) {
      case '1':
        sectionIndex = 0;
        break;
      case '2':
        sectionIndex = 1;
        break;
      case '3':
        sectionIndex = 2;
        break;
      default:
        sectionIndex = 0;
    }

    const item = helpCenterCategories[index];
    const menus = item.sections[sectionIndex].menus.map((menu, i) => {
      let className = 'itemContent'
      if (menu.title.length >= 39) {
        className = 'itemContent double'
      }
      return (
        <Link className='linkDefault' to={menu.url} key={i}><div className={className}>{menu.title}</div></Link> 
      );
    })

    const post = item.sections[sectionIndex].menus[postId-1];
    console.log(post);

    const contents = post.contents.map((content, i) => {
      return (
        <HelpCenterDetailPageComponent post={content} key={i}/>
      )
    })

    return (
      <Container>
        <SeactionContainer>
          <div className='upperContainer'>
            <div className='depth'>
              <Link className='linkDefault' to='/helpcenter'><span className='depthDefault'>Budy Help Center</span></Link>
              <span className='budy-chevron-right'/>
              <Link className='linkDefault' to={item.url}><span className='depthDefault'>{item.title}</span></Link>
              <span className='budy-chevron-right'/>
              <Link className='linkDefault' to={item.sections[sectionIndex].url}><span className='depthDefault'>{item.sections[sectionIndex].title}</span></Link>
            </div>
          </div>
          <div className='lowerContainer'>
            <div className='lowerLeft'>
              <div className='postItem'>
                {contents}
                {/* <div className='block h1'>H1 - Heading 1</div>
                <div className='block h2'>H2 - Heading 2</div>
                <div className='block h3'>H3 - Heading 3 with divider</div>
                <div className='block h4'>H4 - Heading 4</div>
                <div className='block normal'>This is normal text style that use in the paragraph. 
                In circumstances, text could be used as a <span className='linked'>linked text like this</span>, 
                or using <span className='bold'>bold text like this</span> for emphasize.</div>
                <div className='list'>
                  <div className='listItem'>
                    <div className='listItemNum'>1.</div>
                    <div className='listItemContent'>Ordered list</div>
                  </div>
                  <div className='listItem'>
                    <div className='listItemNum'>2.</div>
                    <div className='listItemContent'>Ordered list</div>
                  </div>
                  <div className='listItem'>
                    <div className='listItemNum'>3.</div>
                    <div className='listItemContent'>Ordered list</div>
                  </div>
                  <div className='listItem'>
                    <div className='listItemNum'>4.</div>
                    <div className='listItemContent'>Ordered list</div>
                  </div>
                </div>
                
                <div className='list'>
                  <div className='listItem'>
                    <div className='listItemNum'>•</div>
                    <div className='listItemContent'>Bulleted list</div>
                  </div>
                  <div className='listItem'>
                    <div className='listItemNum'>•</div>
                    <div className='listItemContent'>Bulleted list</div>
                  </div>
                  <div className='listItem'>
                    <div className='listItemNum'>•</div>
                    <div className='listItemContent'>Bulleted list</div>
                  </div>
                  <div className='listItem'>
                    <div className='listItemNum'>•</div>
                    <div className='listItemContent'>Bulleted list</div>
                  </div>
                </div>

                <div className='block image'></div>
                <div className='block imageRef'>Reference Image formatting.</div>

                <div className='block tip blue'>
                  <span className='bold'>TIP: </span>This is a Normal type of callout form, use this when need to provide some extra information to users. 
                  But, please make short, clearly and deliver to the point as you can.
                </div>
                <div className='block tip yellow'>
                  <span className='bold'>TIP: </span>This is a Normal type of callout form, use this when need to provide some extra information to users. 
                  But, please make short, clearly and deliver to the point as you can.
                </div>
                <div className='block tip pink'>
                  <span className='bold'>TIP: </span>This is a Normal type of callout form, use this when need to provide some extra information to users. 
                  But, please make short, clearly and deliver to the point as you can.
                </div> */}
              </div>
              
              <HelpCenterAskMoreComponent/>
            </div>
            <div className='lowerRight'>
              <div className="rightText">Items in this section</div>
              <div className="rightContent">{menus}</div>
            </div>
          </div>
        </SeactionContainer>
        <HelpCetnerFooter/>
      </Container>
    )
  }
}

export default withRouter(HelpCenterDetailPage);

const Container = styled.div`
`;

const SeactionContainer = styled.div`    
  width: 100%;;
  min-height: 920px;
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
    }
  }

  .searchContainer {  
    width: 328px;
    height: 32px;
    border-radius: 4px;
    background-color: ${sub[100]};
  }

  .lowerContainer {
    width: 1032px;

    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: ${white};
    border: 1px solid ${white};

    .lowerLeft {
      width: 680px;
    }

    .lowerRight {
      width: 328px;
    }

    .rightText {  
      width: 100%;
      height: 24px;
      font-size: 20px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      color: ${greyscales[900]};
    }

    .rightContent {
      width: 100%;
      padding-top: 16px;
      padding-bottom: 40px;
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
      margin-bottom: 8px;
  
      &.double {
        height: 48px;
      }
    }

    .postItem {
      width: 680px;
      border: 1px solid ${white};

      .block {
        width: 100%;
        margin-bottom: 24px;

        &.h1 {  
          height: 46px;
          font-size: 40px;
          font-weight: 300;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.15;
          letter-spacing: normal;
          color: ${greyscales[900]};
        }
        &.h2 {  
          height: 40px;
          font-size: 32px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.25;
          letter-spacing: normal;
          color: ${greyscales[900]};
        }
        &.h3 {  
          height: 56px;
          font-size: 24px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.33;
          letter-spacing: normal;
          color: ${greyscales[900]};

          padding-bottom: 24px;
          border-bottom: 2px solid ${greyscales[200]};
        }

        &.h4 {  
          height: 32px;
          font-size: 20px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.6;
          letter-spacing: normal;
          color: ${greyscales[900]};
        }

        &.normal { 
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.5;
          letter-spacing: normal;
          color: ${greyscales[900]};        
        }

        &.image {  
          height: 327px;
          border-radius: 4px;
          border: solid 1px ${greyscales[200]};

        }

        &.imageRef {
          height: 24px;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.5;
          letter-spacing: normal;
          color: ${greyscales[900]}; 
        }

        &.tip {  
          border-radius: 8px;
          padding: 24px;  
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.5;
          letter-spacing: normal;
          color: ${greyscales[900]}; 
          
          &.blue {
            background-color: ${sub[100]};
          }
          &.yellow {
            background-color: ${safeYellows[100]};
          }
          &.pink {
            background-color: ${negativeReds[100]};
          }

        }
      }    
      
      .list {
        width: 100%;
        margin-bottom: 8px;
        border: 1px solid ${white};
  
        .listItem {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 8px;
          
          .listItemNum {  
            width: 16px;
            height: 24px;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: ${greyscales[900]};
            margin-right: 8px;
            margin-left: 8px;
          }
    
          .listItemContent { 
            height: 24px;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            color: ${greyscales[900]};
          }
        }

      }
  
      .linked { 
        color: ${primary[500]};
      }
      .bold {
        font-weight: 600;
      }
    }
  }
`;