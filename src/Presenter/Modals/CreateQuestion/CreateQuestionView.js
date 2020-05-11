import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Textarea from '../../../Common/Elements/Textarea';
import { PostContext } from '../../../Provider/Post/postContext';
import { white, greyscales, primary, negativeReds } from '../../../Common/Styles/Colors';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import ImageUploader from './ImageUploader';

function CreateQuestionView({ closeCreateQuestion }) {
  const {
    state: { title, selectedTopics, base64Image },
    handlers: {
      setTitle,
      removeTitle,
      setImage,
      removeImage,
      openTopicSetting,
      editTopic,
      createPost
    }
  } = useContext(PostContext);

  const [message, setMessage] = useState("");

  const messageHandler = (message) => {
    // let ret_val = await clickHandler();
    // let previousScrapCondition = isScrap;
    setMessage(message);  
    setTimeout(() => setMessage(null), 2000);

    return;
  };

  return (
    <View>
      <Header>
        <div className="closeBtn">
          <span className="budy-x" onClick={closeCreateQuestion} />
        </div>

        <div className="title">Ask new question</div>
        <div className="caption">Create a new question post.</div>
      </Header>

      <Main>
        <Label>About your curious</Label>
        <Textarea
          className="textarea-view"
          value={title}
          onChange={setTitle}
          initText={removeTitle}
        />
        <Label>Reference image (Optional)</Label>

        <ImageUploader
          base64={base64Image}
          setImage={setImage}
          removeImage={removeImage}
        />

        {selectedTopics.length > 0 ? (
          <TopicList>
            {selectedTopics.map((topic, id) => (
              <div className="topicTag" key={id}>
                {topic.TopicName}
              </div>
            ))}
            <div className="editBtn" onClick={editTopic}>
              <span className="budy-edit-2" />
            </div>
          </TopicList>
        ) : (
          <AddTopics>
            <div className="addTopicsBtn" onClick={openTopicSetting}>
              <span className="budy-plus-circle" />
              <span className="label">Add Topics</span>
            </div>
          </AddTopics>
        )}
      </Main>

      <Footer>
        <PrimaryBtn
          text="Post"
          size="small"
          width="80px"
          state="hovered"
          onClick={ title.length <= 0 ? ()=>{messageHandler('Please write title')} : selectedTopics.length <= 0 ? ()=>{messageHandler('Please select topics')} : createPost}
        />
      </Footer>

      {message && (
        <Message>
          <span>{message}</span>
        </Message>
      )}
    </View>
  );
}

const Message = styled.div`
  background-color: ${negativeReds[300]};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  top: 105px;
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
  z-index: 51;
  width: 672px;
  background-color: ${white};
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  .textarea-view {
    margin-bottom: 16px;
  }
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    .textarea-view {
      margin-bottom: 40px;
    }
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${greyscales[900]};
  line-height: 1.3;
  margin-bottom: 6px;
`;

const Header = styled.header`
  position: relative;
  border-bottom: solid 1px #e5e5e5;
  padding: 24px;
  border-radius: 4px 4px 0px 0px;
  .closeBtn {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  padding: 24px;
  min-height: 272px;
`;

const Footer = styled.footer`
  border-top: solid 1px #e5e5e5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 16px;
  min-height: 64px;
  border-radius: 0px 0px 4px 4px;
  background-color: ${white};
  @media (max-width: 530px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-radius: 0px;
  }
`;

const AddTopics = styled.div`
  margin-top: 16px;
  padding: 12px 0px;
  display: flex;
  .addTopicsBtn {
    cursor: pointer;
    color: ${primary[500]};
    display: flex;
    align-items: center;
    .budy-plus-circle {
      font-size: 16px;
      margin-right: 4px;
    }
    .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.2;
    }
  }
  @media (max-width: 530px) {
    margin-top: 40px;
  }
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 40px;
  align-items: center;
  margin-top: 16px;
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
`;

export default CreateQuestionView;
