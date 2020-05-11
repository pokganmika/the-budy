import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { primary } from '../../../../Common/Styles/Colors';
import {
  Message,
} from '../../MyPage/MyPageForm/Scroll/style';

const TopicsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 530px) {
    padding: 16px;
  }
`;

const TopicTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin: 0 2px 8px 0;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${primary[500]};
  background-color: ${primary[100]};
  &:hover {
    background-color: ${primary[200]};
  }
  cursor: pointer;
`;

/**
 *
 * @param {array} topicsData
 */
function SearchTopics({ history, topicsData }) {
  return (
    <TopicsWrapper>
      {topicsData.length === 0 ? (
        <Message>NO TOPICS</Message>
      ) : (
        topicsData.map((topic, index) => (
          <TopicTag
            key={index}
            onClick={() => history.push(`/topic/${topic.TopicName}/articles`)}
          >
            {topic.TopicName}
          </TopicTag>
        ))
      )}
    </TopicsWrapper>
  );
}

SearchTopics.propTypes = {
  topicsData: PropTypes.array.isRequired
};

export default withRouter(SearchTopics);
