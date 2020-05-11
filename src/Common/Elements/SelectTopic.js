import React from 'react';
import styled from 'styled-components';
import { white, greyscales, primary, sub } from '../../Common/Styles/Colors';

function SelectTopic({ topic, type, onClick }) {
  const _type = type || null;
  return (
    <View type={_type} onClick={() => onClick(topic)}>
      <div className="checkbox-wrapper">
        <CheckBox type={_type}>
          {type === 'selected' ? (
            <span className="budy-check-circle-fill" />
          ) : (
            <span className="budy-circle" />
          )}
        </CheckBox>
        <div className="topic">{topic.TopicName}</div>
      </div>
      <div className="postCount">{topic.PostCount} Posts</div>
    </View>
  );
}

const View = styled.div`
  cursor: pointer;
  background-color: ${({ type }) =>
    type === 'selected' ? primary[100] : white};
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  border-left: solid 2px;
  border-left-color: ${({ type }) =>
    type === 'selected' ? primary[500] : white};
  border-bottom: solid 1px ${greyscales[100]};
  .checkbox-wrapper {
    display: flex;
    .topic {
      background-color: ${({ type }) =>
        type === 'selected'
          ? primary[500]
          : type === 'disabled'
          ? greyscales[100]
          : primary[100]};
      color: ${({ type }) =>
        type === 'selected'
          ? white
          : type === 'disabled'
          ? greyscales[400]
          : primary[500]};
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1.4;
    }
  }
  .postCount {
    font-size: 12px;
    font-weight: 500;
    color: ${({ type }) =>
      type === 'disabled' ? greyscales[300] : greyscales[600]};
    line-height: 1.4;
  }
  :hover {
    background-color: ${greyscales[100]};
  }
`;

const CheckBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  .budy-circle {
    font-size: 16px;
    color: ${({ type }) => (type === 'disabled' ? sub[300] : sub[500])};
  }
  .budy-check-circle-fill {
    font-size: 16px;
    color: ${primary[500]};
  }
`;

export default SelectTopic;
