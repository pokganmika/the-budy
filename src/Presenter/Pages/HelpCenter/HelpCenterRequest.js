import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { primary, greyscales, sub, white, positiveBlues, safeYellows, negativeReds } from '../../../Common/Styles/Colors';
import helpCenterCategories from './HelpCenterMenu';
import HelpCetnerFooter from './HelpCenterFooter';

class HelpCenterRequest extends Component {

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  render(){

    return (
      <Container>
        <SeactionContainer>
          <div className='upperContainer'>
            <div className='depth'>
              <Link className='linkDefault' to='/helpcenter'><span className='depthDefault'>Budy Help Center</span></Link>
              <span className='budy-chevron-right'/>
              <span className='depthDefault middle'>Ask to Budy</span>
            </div>
          </div>
          <div className='lowerContainer'>
            <div className='lowerTitle'>Ask to Budy</div>
            <div className='lowerSubTitle'>Still having issues? Let us know</div>
            <div className='lowerDivLine'/>
            <div className='lowerText'>
              Can't find what you need in our Help Center? Fill out the form below to get in touch.
            </div>

            <div className='inputTitle'>Your email address</div>
            <div className='inputContainer'>
              <input type='text' className='inputText' name='email'/>
            </div>

            <div className='inputTitle'>Description</div>
            <div className='inputContainer with textfield'>
              <textarea className='inputTextField' name='description'></textarea>
            </div>
            <div className='inputInfo'>Please enter the details of your request. A member of our support staff will respond ASAP.</div>
            
            <div className='inputTitle'>Your Budy Username (Optional)</div>
            <div className='inputContainer with'>
              <input type='text' className='inputText' name='username'/>
            </div>
            <div className='inputInfo'>Username of the account associated with your email address.</div>
            
            <div className='inputTitle'>Reference image (Optional)</div>
            <div className='dataContainer'>
              <div className='dataIcon'>
                <span className='budy-upload'></span>
              </div>
              <div className='dataText'>Drop files here or</div>
              <div className='dataBtn'>Browse</div>
            </div>
            <div className='inputInfo last'>JPG, JPEG, PNG and GIF file Only..</div>
            <div className='btnSubmitContainer'>

            </div>
          </div>
        </SeactionContainer>
        <HelpCetnerFooter/>
      </Container>
    )
  }
}

export default withRouter(HelpCenterRequest);

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

      &.middle {
        color: ${greyscales[900]}
      }
    }

    .budy-chevron-right {
      padding-top:7px;
      padding-left: 9px;
      padding-right: 9px;
      font-sizeL 16px;
      color: ${greyscales[300]}
    }
  }

  .searchContainer {  
    width: 328px;
    height: 32px;
    border-radius: 4px;
    background-color: ${sub[100]};
  }

  .lowerContainer {
    width: 680px;

    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 64px;
    border: 1px solid ${white};

    .lowerTitle {
      width: 100%; 
      margin-bottom: 24px;

      height: 46px;
      font-size: 40px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      color: ${greyscales[900]};
    }
    .lowerSubTitle {
      width: 100%; 
      margin-bottom: 24px;

      height: 32px;
      font-size: 24px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      color: ${greyscales[900]};
    }
    .lowerDivLine {
      width: 100%; 
      margin-bottom: 24px;

      border: 1px solid ${greyscales[200]};
    }
    .lowerText {
      width: 100%; 
      margin-bottom: 24px;

      height: 24px;
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: ${greyscales[900]};
    }

    .inputTitle {
      width: 100%; 
      height: 24px;  
      font-size: 14px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: normal;
      color: ${greyscales[900]};

      padding-bottom: 6px;
    }
    .inputContainer {
      width: 100%; 
      margin-bottom: 24px;

      border-radius: 4px;
      border: solid 1px ${greyscales[200]};
      background-color: ${white};
      padding: 12px;
      height: 48px;

      &.with {
        margin-bottom: 6px;
      }

      &.textfield {
        height: 144px;
      }
    }
    .inputInfo {
      width: 100%;
      margin-bottom: 24px;

      height: 18px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: italic;
      line-height: 1.29;
      letter-spacing: normal;
      color: ${greyscales[500]};

      padding-left: 8px;

      &.last {
        margin-bottom: 0px;
      }
    }
    .dataContainer {  
      width: 100%;
      height: 120px;
      border-radius: 4px;
      border: dashed 1px ${sub[500]};
      margin-bottom: 6px;

      display: flex;
      justify-content: center;
      align-items: center;

      .dataIcon {  
        margin-right: 8px;
        padding-top: 5px;

        .budy-upload {
          font-size: 17px;
          color: ${sub[500]};
        }
      }
      .dataText {  
        width: 121px;
        height: 20px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        color: ${greyscales[900]};
        margin-right: 8px;
      }
      .dataBtn {  
        width: 80px;
        height: 32px;
        border-radius: 8px;
        border: solid 1px ${primary[500]};
        background-color: ${white}
        text-align: center;
        padding: 8px 0;

        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
        text-align: center;
        color: ${primary[500]};
      }
    }

    .inputText {
      width: 100%;
      height: 24px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      color: ${greyscales[900]};

      border: none;
      outline: none;
    }

    .inputTextField {
      width: 100%;  
      height: 130px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      color: ${greyscales[900]};

      border: none;
      outline: none;
    }

    .btnSubmitContainer {
      width: 424px;
      height: 48px;
      border-radius: 8px;
      background-color: ${primary[200]};
    
      margin: 0 auto;
      margin-top: 40px;
    }
  }
`;