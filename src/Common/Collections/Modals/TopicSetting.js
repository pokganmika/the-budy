import React, { Fragment } from 'react';
import styled from 'styled-components';
import { white, greyscales, primary, sub } from '../../../Common/Styles/Colors';
import TopicSearchInput from '../../Elements/TextFields/TopicSearchInput';
import TopicTag from '../../Elements/Tags/TopicTag';
import SelectTopic from '../../Elements/SelectTopic';
import { PrimaryBtn } from '../../../Common/Elements/Buttons/SolidButton';
import { DefaultBtn } from '../../../Common/Elements/Buttons/BorderButton';

function TopicSetting({ headerTitle, close }) {
  const _headerTitle = headerTitle || 'Add topic tags';
  const _close = close || function() {};

  // const _topicName = topicName || '';
  // const _tempSelectedTopics = tempSelectedTopics || new Map();
  // const _maxTopicCount = maxTopicCount || 5;
  // const _completeTopic = completeTopic || function() {};
  // const _createTopic = createTopic || function() {};
  // const _addTopic = addTopic || function() {};
  // const _deleteTopic = deleteTopic || function() {};
  // const _clearTopics = clearTopics || function() {};
  // const _changeTopicName = changeTopicName || function() {};
  // const _removeTopicName = removeTopicName || function() {};

  // let topics = topicList ? [...topicList.values()] : [];

  // if (_topicName.length > 0) {
  //   topics = searchResultTopics;
  // }

  return (
    <View>
      <Header>
        <div className="closeBtn" onClick={_close}>
          <span className="budy-chevron-left" />
          <span className="label">Back</span>
        </div>
        <div className="title">{_headerTitle}</div>
        <div className="caption">Add topic tags to your new question post.</div>
      </Header>
      {/* <Wrapper>
        <TopicSearchInput
          placeholder="Search Topics..."
          value={topicName}
          onChange={e => _changeTopicName(e.target.value)}
          removeValue={_removeTopicName}
        />
        <SelectedTopicList>
          {[..._tempSelectedTopics.values()].map((topic, id) => {
            return <TopicTag topic={topic} key={id} onClick={_deleteTopic} />;
          })}
          <div className="topicCount">
            <span className="selectedCount">{_tempSelectedTopics.size}</span>
            <span className="maxCount">/{_maxTopicCount}</span>
          </div>
        </SelectedTopicList>
      </Wrapper>
      <Main>
        {_topicName.length > 0 && (
          <CreateTopicBox>
            <div className="topic">{_topicName}</div>
            <PrimaryBtn
              text="Create"
              size="small"
              state="hovered"
              onClick={_createTopic}
            />
          </CreateTopicBox>
        )}
        {topics.map((topic, id) => {
          const selectedCount = _tempSelectedTopics.size;
          const maxCount = _maxTopicCount;
          if (topic.selected) {
            return (
              <SelectTopic
                key={id}
                topic={topic}
                type="selected"
                onClick={_deleteTopic}
              />
            );
          }
          return (
            <SelectTopic
              key={id}
              topic={topic}
              type={selectedCount === maxCount ? 'disabled' : null}
              onClick={_addTopic}
            />
          );
        })}
      </Main>
      <Footer>
        {_tempSelectedTopics.size > 0 ? (
          <Fragment>
            <PrimaryBtn
              className="doneBtn"
              text="Done"
              width="100%"
              state="hovered"
              onClick={_completeTopic}
            />
            <DefaultBtn
              text="Clear all"
              width="100%"
              state="hovered"
              onClick={_clearTopics}
            />
          </Fragment>
        ) : (
          <Fragment>
            <PrimaryBtn
              className="doneBtn"
              text="Done"
              width="100%"
              state="disabled"
              onClick={_completeTopic}
            />
            <DefaultBtn text="Clear all" width="100%" state="disabled" />
          </Fragment>
        )}
      </Footer> */}
    </View>
  );
}

const View = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 52;
  width: 480px;
  height: 800px;
  background-color: ${white};
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  .added-topics {
    padding: 0px 16px;
    font-weight: 500;
    display: flex;
    .title {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 8px;
    }
    .topicCount {
      font-size: 14px;
      color: #999999;
    }
  }
  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

const Header = styled.header`
  position: relative;
  border-bottom: solid 1px ${greyscales[200]};
  padding: 24px;
  .closeBtn {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 80px;
    height: 32px;
    margin-bottom: 8px;
    .budy-chevron-left {
      font-size: 16px;
      color: ${greyscales[900]};
    }
    .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.43;
      color: ${greyscales[900]};
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

const Wrapper = styled.div`
  padding: 16px 24px;
  border-bottom: solid 2px ${greyscales[200]};
`;

const Main = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Footer = styled.footer`
  border-top: solid 1px #e5e5e5;
  padding: 24px;
  .doneBtn {
    margin-bottom: 16px;
  }
`;

const SelectedTopicList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: solid 1px ${sub[500]};
  border-radius: 4px;
  max-height: 120px;
  overflow-y: auto;
  padding: 8px 8px 0px 8px;
  margin-top: 8px;
  .topicCount {
    font-size: 12px;
    font-weight: 600;
    width: auto;
    height: 24px;
    display: flex;
    align-items: center;
    border: solid 1px ${sub[300]};
    background-color: ${white};
    margin-bottom: 8px;
    padding: 0px 8px;
    border-radius: 4px;
    .selectedCount {
      color: ${primary[500]};
    }
    .maxCount {
      color: ${sub[400]};
    }
  }
`;

const CreateTopicBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  padding: 0px 24px;
  border-bottom: solid 1px ${greyscales[100]};
  .topic {
    background-color: ${primary[100]};
    color: ${primary[500]};
    padding: 4px 8px;
    font-size: 12px;
    line-height: 1.4;
  }
`;

export default TopicSetting;
