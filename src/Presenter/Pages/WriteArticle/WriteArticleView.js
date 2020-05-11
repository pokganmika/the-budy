import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import 'quill/dist/quill.snow.css';
import Image from '../../../Common/Elements/Image';
import BudyWordmark from '../../../Images/budy_Wordmark.svg';
import AddTopicsBtn from '../../../Common/Elements/Buttons/AddTopicsBtn';
import Textarea from '../../../Common/Elements/Textarea';
import { PostContext } from '../../../Provider/Post/postContext';
import {
  white,
  greyscales,
  primary,
  negativeReds,
  positiveBlues
} from '../../../Common/Styles/Colors';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import CustomQuill from '../../../Common/Collections/CustomQuill/CustomQuill';
import CoverImageUploader from './CoverImageUploader';

const WriteArticleView = ({ type, viewRef }) => {
  const _type = type || 'create';
  const {
    state: {
      postId,
      coverImage,
      title,
      body,
      text,
      textLength,
      selectedTopics
    },
    handlers: {
      openTopicSetting,
      initTitle,
      changeTitle,
      editTopic,
      createArticle,
      setImage,
      removeImage,
      setContainer
    }
  } = useContext(PostContext);

  const container = { body, text, textLength };

  const _createArticle = () => createArticle(container);

  const [message, setMessage] = useState("");

  const messageHandler = (message) => {
    // let ret_val = await clickHandler();
    // let previousScrapCondition = isScrap;
    setMessage(message);  
    setTimeout(() => setMessage(null), 2000);

    return;
  };

  const scrollBottom = () => {
    const element = viewRef.current;
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };

  return (
    <View coverImage={coverImage} ref={viewRef}>
      <Header>
        <Nav type={_type}>
          <div className="title-wrapper">
            <Image
              className="logo"
              src={BudyWordmark}
              link="/"
              cursor="pointer"
              cover="none"
            />
            <div className="title">
              {_type === 'create' && 'Write new article'}
              {_type === 'edit' && 'Editing article...'}
            </div>
          </div>

          <PrimaryBtn
              text={_type === 'edit' ? 'Update' : 'Publish'}
              size="small"
              width="80px"
              state="hovered"
              onClick={ title.length <= 0 ? ()=>{messageHandler('Please write title')} : selectedTopics.length <= 0 ? ()=>{messageHandler('Please select topics')} : _createArticle}
            />
        </Nav>
      </Header>
      <CoverImageUploader
        initialCoverImage={coverImage}
        setImage={setImage}
        removeImage={removeImage}
      />
      <Main>
        <div className="container">
          <Title>
            <Textarea
              className="textarea-view"
              type="article"
              placeholder="Type Headline here..."
              coverImage={coverImage ? true : false}
              value={title}
              onChange={changeTitle}
              initText={initTitle}
            />
          </Title>
          <Body>
            <CustomQuill
              postId={postId}
              type={'edit'}
              initialBody={container.body}
              container={container}
              setContainer={setContainer}
              quillToolbarId="quillToolbarId"
              quillContainerId="quillContainerId"
            />
          </Body>
          <TopicSetting>
            {selectedTopics.length > 0 ? (
              <div className="topicList">
                {selectedTopics.map((topic, id) => (
                  <div className="topicTag" key={id}>
                    {topic.TopicName}
                  </div>
                ))}
                <div className="editBtn" onClick={editTopic}>
                  <span className="budy-edit-2" />
                </div>
              </div>
            ) : (
              <AddTopicsBtn onClick={openTopicSetting} />
            )}
          </TopicSetting>
        </div>
      </Main>
      {message && (
        <Message>
          <span>{message}</span>
        </Message>
      )}
    </View>
  );
};

const Message = styled.div`
  background-color: ${negativeReds[300]};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  position: fixed;
  top: 55px;
  right: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0px 12px;
  z-index: 500;
`;

const View = styled.div`
  position: relative;
`;

const Header = styled.header`
  position: sticky;
  width: 100%;
  height: 56px;
  left: 0;
  top: 0;
  background-color: ${white};
  border-bottom: solid 1px ${greyscales[200]};
  z-index: 10;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1064px;
  margin: 0 auto;
  padding: 0px 16px;
  height: 100%;
  .title-wrapper {
    display: flex;
    .logo {
      width: 50px;
      height: 32px;
    }
    .title {
      font-size: 14px;
      font-weight: 500;
      color: ${({ type }) =>
        type === 'edit' ? positiveBlues[500] : greyscales[900]};
      padding: 6px 16px;
      border-left: solid 2px ${greyscales[200]};
      line-height: 1.4;
      margin: 0px 16px;
    }
  }
  .createArticle-header-left {
    display: flex;
    align-items: center;
    .mobile-logo {
      display: none;
    }
    @media (max-width: 530px) {
      .desktop-logo {
        display: none;
      }
      .desktop-title {
        display: none;
      }
      .mobile-logo {
        display: block;
      }
    }
  }
`;

const Main = styled.main`
  margin-top: 76px;
  position: relative;
  z-index: 1;
  
  .container {
    max-width: 808px;
    margin: 0 auto;
    padding: 0 16px 100px;
    
    @media (max-width: 530px) {
      
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 40px;
  height: 256px;
  @media (max-width: 530px) {
    height: 182px;
    .textarea-view {
      .textarea {
        font-size: 28px;
      }
    }
  }
`;

const Body = styled.div`
  margin-bottom: 16px;
`;

const TopicSetting = styled.div`
  padding: 0px 16px;
  display: flex;
  align-items: center;
  min-height: 56px;
  .topicList {
    display: flex;
    flex-wrap: wrap;
    .topicTag {
      font-size: 12px;
      color: ${primary[500]};
      padding: 4px 8px;
      background-color: ${primary[100]};
      margin-right: 2px;
      line-height: 1.4;
    }
    .editBtn {
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .budy-edit-2 {
        font-size: 16px;
        color: ${greyscales[800]};
      }
    }
  }
`;

export default WriteArticleView;
