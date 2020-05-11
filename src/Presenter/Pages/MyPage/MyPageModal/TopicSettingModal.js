import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import millify from 'millify';
import SearchInput from '../../../../Common/Elements/TextFields/TopicSearchInput';
import { primary, greyscales, sub } from '../../../../Common/Styles/Colors';
import { PrimaryBtn as SubmitButton } from '../../../../Common/Elements/Buttons/SolidButton';
import { DefaultBtn as ClearButton } from '../../../../Common/Elements/Buttons/BorderButton';

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 40;
  transition: opacity 0.15s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// TODO: height fix
const Wrapper = styled.div`
  width: 480px;
  height: fit-content;

  border-radius: 4px;
  background-color: #ffffff;

  @media (max-width: 530px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
  }
`;

const UpperWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 24px;
  .topic-setting-modal-upper-header {
    display: flex;
    justify-content: space-between;
  }
  .topic-setting-modal-upper-header-title {
    font-size: 20px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    color: ${greyscales[900]};
  }
  .topic-setting-modal-upper-message {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    color: ${greyscales[500]};
  }
`;

const MiddleWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px 24px;
  border-top: 1px solid ${greyscales[200]};
  border-bottom: 1px solid ${greyscales[200]};
  .topic-setting-modal-middle-list {
    width: 100%;
    margin-top: 8px;
    padding: 8px 6px;
    border-radius: 4px;
    border: 1px solid ${sub[500]};
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-height: 120px;
    align-items: center;
    ::-webkit-scrollbar {
      width: 16px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${sub[200]};
      background-clip: padding-box;
      border-radius: 2px;
      border: 6px solid #ffffff;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
    }
    ::-webkit-scrollbar-thumb:active {
      background: ${sub[400]};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${sub[400]};
    }
    ::-webkit-scrollbar-track {
      background-color: #ffffff;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }
  }
  .topic-setting-modal-middle-list-count {
    width: 45px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid ${sub[300]};
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${sub[400]};
  }
  .topic-setting-modal-middle-list-count-length {
    color: ${({ count }) => (count === 0 ? sub[500] : primary[500])};
  }
  .topic-setting-modal-middle-list-count-limit {
    color: ${({ count }) => (count === 0 ? sub[900] : sub[400])};
  }
`;

const LowerWrapper = styled.div`
  width: 100%;
  height: 50vh;
  overflow: auto;

  @media (max-width: 530px) {
    height: 40vh;
  }

  ::-webkit-scrollbar {
    width: 16px;
  }
  ::-webkit-scrollbar-thumb {
    height: 10vh;
    background: ${sub[200]};
    background-clip: padding-box;
    border-radius: 2px;
    border: 6px solid #ffffff;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
  }
  ::-webkit-scrollbar-thumb:active {
    background: ${sub[400]};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${sub[400]};
  }
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 24px;
  border-top: 1px solid ${greyscales[200]};

  .topic-setting-modal-button {
    width: 100%;
  }

  @media (max-width: 530px) {
    padding: 0 0 max(8px, env(safe-area-inset-bottom));
  }
`;

const TopicList = styled.div`
  background-color: ${({ selected }) => selected && sub[100]};
  border-left: ${({ selected }) =>
    selected ? `2px solid ${primary[500]}` : `2px solid #ffffff`};
  border-bottom: 1px solid ${greyscales[100]};
  width: 100%;
  height: 64px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) =>
      selected ? primary[200] : greyscales[100]};
  }
  .topic-setting-modal-lower-topic {
    display: flex;
    align-items: center;
  }
  .topic-setting-modal-lower-topic-name {
    margin-left: 16px;
    padding: 4px 8px;
    background-color: ${primary[100]};
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${primary[500]};
  }
  .topic-setting-modal-lower-count {
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${greyscales[600]};
  }
`;

const TopicTag = styled.div`
  background-color: ${primary[100]};
  margin: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  .topic-setting-modal-middle-list-name {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${primary[500]};
  }
`;

const CreateTopic = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* .create-topic-button {
        width: 64px;
        height: 32px;
        padding: 8px;
        font-size: 14px;
      } */
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
`;

/**
 *
 * @param {string} type
 * @param {string} topicValue
 * @param {array} topicList
 * @param {array} dataKnowsAbout
 * @param {array} dataInterests
 * @param {array} selectedTempTopicList
 * @param {function} onChangeTopicToggleState
 * @param {function} onChangeTopicValue
 * @param {function} removeTopicValue
 * @param {function} selectTopicToggle
 * @param {function} deleteTopicTag
 * @param {function} submitTopicList
 * @param {function} clearAllTopicTag
 * @param {function} createTopic
 * @param {boolean} showCreate
 */
export default function TopicSettingModal({
  type,
  topicValue,
  topicList,
  dataKnowsAbout,
  dataInterests,
  selectedTempTopicList,
  onChangeTopicToggleState,
  onChangeTopicValue,
  removeTopicValue,
  selectTopicToggle,
  deleteTopicTag,
  submitTopicList,
  clearAllTopicTag,
  createTopic,
  showCreate,
}) {
  /**
   *
   * @param {array} selectedList
   * @param {number} id
   */
  const typeCheck = (selectedList, id) => {
    for (let i = 0; i < selectedList.length; i++) {
      if (selectedList[i]['topicId'] === id) return true;
    }
    return false;
  };

  console.log('topicValue : ', topicValue);
  console.log('topicList : ', topicList);

  // TODO: Search State check in LowerWrapper
  return (
    <Background>
      <Wrapper>
        <UpperWrapper>
          <div className="topic-setting-modal-upper-header">
            <div className="topic-setting-modal-upper-header-title">
              Add topic tags
            </div>
            <Icon
              className="budy-x"
              size="20px"
              color={greyscales[500]}
              cursor="pointer"
              onClick={onChangeTopicToggleState}
            />
          </div>
          <div className="topic-setting-modal-upper-message">
            Add topic tags to Knows about of your profile.
          </div>
        </UpperWrapper>

        <MiddleWrapper count={selectedTempTopicList.length}>
          <SearchInput
            placeholder="Search Topics..."
            width="100%"
            height="48px"
            value={topicValue}
            onChange={onChangeTopicValue}
            removeValue={removeTopicValue}
          />
          <div className="topic-setting-modal-middle-list">
            {/* list mapping... */}

            {selectedTempTopicList.map((value, index) => {
              return (
                <TopicTag key={index}>
                  <div className="topic-setting-modal-middle-list-name">
                    {value.topicName}
                  </div>
                  <IconWrapper>
                    <Icon
                      className="budy-x"
                      size="12px"
                      cursor="pointer"
                      color={primary[500]}
                      onClick={() => deleteTopicTag(value.topicId)}
                    />
                  </IconWrapper>
                </TopicTag>
              );
            })}

            <div className="topic-setting-modal-middle-list-count">
              <div className="topic-setting-modal-middle-list-count-length">
                {selectedTempTopicList.length}
              </div>
              /
              <div className="topic-setting-modal-middle-list-count-limit">
                20
              </div>
            </div>
          </div>
        </MiddleWrapper>

        <LowerWrapper>
          <>
            {showCreate && (
              <CreateTopic>
                <TopicTag>
                  <div className="topic-setting-modal-middle-list-name">
                    {topicValue}
                  </div>
                </TopicTag>

                <SubmitButton
                  className="create-topic-button"
                  text="Create"
                  size="small"
                  onClick={createTopic}
                />
              </CreateTopic>
            )}
            {topicList.map((topic, index) => {
              return (
                <TopicList
                  key={index}
                  onClick={() =>
                    selectTopicToggle(topic.topicId, topic.TopicName)
                  }
                  selected={typeCheck(selectedTempTopicList, topic.topicId)}
                >
                  <div className="topic-setting-modal-lower-topic">
                    <Icon
                      className={
                        typeCheck(selectedTempTopicList, topic.topicId)
                          ? 'budy-check-circle-fill'
                          : 'budy-circle'
                      }
                      size="20px"
                      color={
                        typeCheck(selectedTempTopicList, topic.topicId)
                          ? primary[500]
                          : sub[500]
                      }
                      cursor="pointer"
                    />
                    <div className="topic-setting-modal-lower-topic-name">
                      {topic.TopicName}
                    </div>
                  </div>
                  <div className="topic-setting-modal-lower-count">
                    {`${millify(topic.PostCount, { precision: 1 })} Posts`}
                  </div>
                </TopicList>
              );
            })}
          </>
          {/* {topicList.length === 0 ? (
            <CreateTopic>
              <TopicTag>
                <div className="topic-setting-modal-middle-list-name">
                  {topicValue}
                </div>
              </TopicTag>

              <SubmitButton
                className="create-topic-button"
                text="Create"
                size="small"
                onClick={createTopic}
              />
            </CreateTopic>
          ) : (
            <>
              {topicList.map((topic, index) => {
                return (
                  <TopicList
                    key={index}
                    onClick={() =>
                      selectTopicToggle(topic.topicId, topic.TopicName)
                    }
                    selected={typeCheck(selectedTempTopicList, topic.topicId)}
                  >
                    <div className="topic-setting-modal-lower-topic">
                      <Icon
                        className={
                          typeCheck(selectedTempTopicList, topic.topicId)
                            ? 'budy-check-circle-fill'
                            : 'budy-circle'
                        }
                        size="20px"
                        color={
                          typeCheck(selectedTempTopicList, topic.topicId)
                            ? primary[500]
                            : sub[500]
                        }
                        cursor="pointer"
                      />
                      <div className="topic-setting-modal-lower-topic-name">
                        {topic.TopicName}
                      </div>
                    </div>
                    <div className="topic-setting-modal-lower-count">
                      {`${millify(topic.PostCount, { precision: 1 })} Posts`}
                    </div>
                  </TopicList>
                );
              })}
            </>
          )} */}
        </LowerWrapper>

        <ButtonWrapper>
          <div
            className="topic-setting-modal-button"
            style={{ marginBottom: '16px' }}
          >
            <SubmitButton
              text="Update changes"
              width="100%"
              state={
                (type === 'knowsAbout'
                  ? dataKnowsAbout.length === 0
                  : dataInterests.length === 0) &&
                selectedTempTopicList.length === 0
                  ? 'disabled'
                  : 'normal'
              }
              onClick={() => submitTopicList(type)}
            />
          </div>
          <div className="topic-setting-modal-button">
            <ClearButton
              text="Clear all"
              width="100%"
              onClick={clearAllTopicTag}
            />
          </div>
        </ButtonWrapper>
      </Wrapper>
    </Background>
  );
}

TopicSettingModal.propTypes = {
  type: PropTypes.string.isRequired,
  topicValue: PropTypes.string.isRequired,
  topicList: PropTypes.array.isRequired,
  dataKnowsAbout: PropTypes.array.isRequired,
  dataInterests: PropTypes.array.isRequired,
  selectedTempTopicList: PropTypes.array.isRequired,
  onChangeTopicToggleState: PropTypes.func.isRequired,
  onChangeTopicValue: PropTypes.func.isRequired,
  removeTopicValue: PropTypes.func.isRequired,
  selectTopicToggle: PropTypes.func.isRequired,
  deleteTopicTag: PropTypes.func.isRequired,
  submitTopicList: PropTypes.func.isRequired,
  clearAllTopicTag: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  showCreate: PropTypes.bool.isRequired,
};
