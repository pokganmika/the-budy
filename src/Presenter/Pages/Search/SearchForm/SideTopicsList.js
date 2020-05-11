import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import millify from 'millify';
import styled from 'styled-components';

import { primary, greyscales } from '../../../../Common/Styles/Colors';

const SideTopicsWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: 40px;
  .side-topic-title {
    width: 100%;
    height: 48px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: ${greyscales[900]};
    border-bottom: 1px solid ${greyscales[200]};
  }
  .side-topic-list {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .side-topic-list-name {
      padding: 4px 8px;
      background-color: ${primary[100]};
      color: ${primary[500]};
      cursor: pointer;
    }
    .side-topic-list-count {
      color: ${greyscales[500]};
    }
  }
  .side-topic-more {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 530px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background-color: ${greyscales[100]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreIcon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
`;

/**
 *
 * @param {string} keyword
 * @param {array} topicsData
 */
function SideTopicsList({ history, keyword, topicsData }) {
  const moveSearchDetail = () => history.push(`/search/${keyword}/topics`);
  const moveTopicDetail = topic => history.push(`/topic/${topic}/articles`);

  return (
    <SideTopicsWrapper>
      <div className="side-topic-title">TOPICS</div>

      {topicsData.map((topic, index) => (
        index < 10 && (
          <div className="side-topic-list" key={index}>
            <div
              className="side-topic-list-name"
              onClick={() => moveTopicDetail(topic.TopicName)}
            >
              {topic.TopicName}
            </div>
            <div className="side-topic-list-count">{`${millify(topic.PostCount, {
              precision: 1
            })} Posts`}</div>
          </div>)
      ))}

      {
        topicsData.length > 10 && (
          <div className="side-topic-more">
            <IconWrapper onClick={moveSearchDetail}>
              <MoreIcon className="budy-more-horizontal" />
            </IconWrapper>
          </div>
        )
      }

    </SideTopicsWrapper>
  );
}

SideTopicsList.propTypes = {
  keyword: PropTypes.string.isRequired,
  topicsData: PropTypes.array.isRequired
};

export default withRouter(SideTopicsList);
