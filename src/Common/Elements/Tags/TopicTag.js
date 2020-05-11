import React from 'react';
import styled from 'styled-components';
import { primary } from '../../Styles/Colors';

function TopicTag({ topic, onClick }) {
  return (
    <View>
      <TopicName>{topic.TopicName}</TopicName>
      <span
        className="budy-x"
        onClick={() => (onClick ? onClick(topic) : null)}
      />
    </View>
  );
}

const View = styled.div`
  background-color: ${primary[100]};
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0px 4px 0px 8px;
  margin: 0px 2px 8px 0px;
  .budy-x {
    cursor: pointer;
    font-size: 12px;
    color: ${primary[500]};
  }
  :last-child {
    margin-right: 0px;
  }
`;

const TopicName = styled.div`
  font-size: 12px;
  color: ${primary[500]};
  margin-right: 4px;
  line-height: 1;
`;

export default TopicTag;
