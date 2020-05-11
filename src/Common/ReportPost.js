import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { white, greyscales, negativeReds, primary } from './Styles/Colors';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { POST_API, COMMENT_API } from '../Config/api';
import axios from 'axios';
import firebase from 'firebase';

const ReportPost = ({ dismissHandler, isShown, reportedContentId, reportType }) => {
    const isBlock = isShown ? 'flex' : 'none';
    const [content, setContent] = useState('');
    const [isResultPage, setIsResultPage] = useState(false);
    const [isReportSuccess, setIsReportSuccess] = useState(false);
    const isReportTypePost = reportType && reportType === 'comment' ? false : 'post';

    const dismissMe = () => {
        dismissHandler();
        setIsResultPage(false);
        setContent('');
    }

    const reportContent = async () => {
        try {
            const idToken = await firebase.auth().currentUser.getIdToken();

            const formData = new FormData();
            formData.append('Body', content);

            const url = isReportTypePost ? `${POST_API}/${reportedContentId}/report` : `${COMMENT_API}/${reportedContentId}/report`;
            const config = {
                headers: {
                    'x-access-token': idToken,
                }
            }
            const response = await axios.post(url, formData, config);

            setIsResultPage(true);

            const payload = response.data;

            if (payload.errors) {
                throw payload.errors;
            }

            if (payload.success) {
                setIsReportSuccess(true);
            }

        } catch (err) {
            
            setIsResultPage(true);
            setIsReportSuccess(false);
            return false;
        }
    }

    return (
        <Dimmer displayBlock={isBlock}>
            {isResultPage ? (
                <View>
                    <Header>
                        <TitleWrapper>
                            <div className="title">{isReportSuccess ? "Report Completed" : "Report Failed"}</div>
                        </TitleWrapper>
                        <MessageWrapper>
                            {isReportSuccess ? "Thank you for using. We will review it as soon as possible." : "Please check your network or resport contents"}
                        </MessageWrapper>
                    </Header>
                    <Main>
                        <CancelButton onClick={dismissMe}>Close</CancelButton>
                    </Main>
                </View>
            ) : (
                    <View>
                        <Header>
                            <TitleWrapper>
                                <div className="title">What's happening?</div>
                            </TitleWrapper>
                            <MessageWrapper>
                                Your report will be forwarded to Buddy's Content Manager. After confirming the contents of the report, it may be disadvantageous to the author.
                                <br />
                                <br />
                                <p>Please fill out the report below.</p>
                            </MessageWrapper>

                            <Textarea type
                                className="textarea-view"
                                type="article"
                                placeholder="Type your message here."
                                value={content}
                                onChange={event => setContent(event.target.value)}
                            >

                            </Textarea>
                        </Header>
                        <Main>
                            <ConfirmButton onClick={() => reportContent()}>Report</ConfirmButton>
                            <CancelButton onClick={dismissMe}>Cancle</CancelButton>
                        </Main>
                    </View>
                )}

            <ClickOutsideCloser onClick={dismissMe} />
        </Dimmer>
    );
};

export default ReportPost;

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 40;
  transition: opacity 0.15s linear;
  display:${props => props.displayBlock};
  justify-content: center;
  align-items: center;
`;

const ClickOutsideCloser = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 41;
`;

const View = styled.div`
  position: relative;
  z-index: 51;
  width: 600px;
  background-color: ${white};
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

const Header = styled.header`
  position: relative;
  padding: 24px 24px 10px 24px;
  border-radius: 4px 4px 0px 0px;
  .closeBtn {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    justify-content: left;
    align-items: left;
    width: 24px;
    height: 24px;
    .budy-x {
      font-size: 16px;
    }
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.6;
    color: ${greyscales[900]};
  }
  .caption {
    font-size: 14px;
    line-height: 1.75;
    color: ${greyscales[500]};
  }
`;

const Main = styled.main`
  padding: 0px 24px 24px 24px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: #454545;
`;

const TitleWrapper = styled.div`
  align-items: left;
  justify-content: left;
  display: flex;
  align-items: left;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const MessageWrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
  display: block;
  text-align: left;
  color: #999999;
  margin-top:10px;
`;

const ConfirmButton = styled.button`
  cursor: pointer;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 4px;
  width: 100%;
  height:32px;
  background-color:${negativeReds[500]};
  color:white;
  margin-top:16px;
`;

const CancelButton = styled.button`
  cursor: pointer;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  width: 100%;
  height:32px;
  background-color:white;
  color:${greyscales[500]};
  margin-top:16px;
`;

///// inline textarea //////
///// inline textarea //////
///// inline textarea //////

function Textarea({
    className,
    value,
    placeholder,
    onChange
}) {
    const [isFocus, setFocus] = useState(false);
    const _value = value || '';
    const _placeholder =
        placeholder || 'Ask with summarize what you want to know ...';
    const _maxLength = 500;
    const _rowsMax = 7;

    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        const length = textarea.value.length;
        textarea.focus();
        textarea.setSelectionRange(length, length);
    }, []);

    return (
        <TextViewWrapper name="textarea-view" className={className}>
            <TextBox isFocus={isFocus}>
                <TextareaAutosize
                    className="textarea"
                    ref={textareaRef}
                    value={_value}
                    onChange={e => (onChange ? onChange(e) : null)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    rowsMax={_rowsMax}
                    maxLength={_maxLength}
                    placeholder={_placeholder}
                />
            </TextBox>
            <CountBox>
                +{_value.length > 0 ? _maxLength - _value.length : _maxLength}
            </CountBox>
        </TextViewWrapper>
    );
}

const TextViewWrapper = styled.div``;

const TextBox = styled.div`
    caret-color: ${greyscales[900]};
    display: flex;
    padding: 12px 0px;
    border-bottom: solid 1px ${primary[500]};

    .textarea {
      width: 100%;
      background: none;
      color: ${greyscales[800]};
      border: none;
      outline: none;
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      line-height: 1.35;
      font-weight: 500;
      resize: none;
      ::placeholder {
        color: ${greyscales[400]};
      }
    }
  `;

const CountBox = styled.div`
    text-align: end;
    line-height: 1.3;
    margin-top: 6px;
    font-size: 14px;
    font-weight: 500;
    color: ${greyscales[800]};
  `;