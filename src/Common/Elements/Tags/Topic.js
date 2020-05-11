import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { primary } from '../../Styles/Colors';

function Topic({ className, history, type, topicName, Icon }) {
  const _type = type || 'normal';
  const _topicName = topicName || '';
  const _Icon = Icon || null;

  return (
    <View cursorType={_type === 'normal' ? 'default' : 'pointer'} className={className}>
      <TopicName textColor={_type === 'normal' ? 'grey' : primary[500]}
        onClick={() =>
          _type === 'link' ? history.push(`/topic/${topicName}/articles`) : null
        }
      >
        {_topicName}
      </TopicName>
      {_Icon}
    </View>
  );
}

const View = styled.div`
  cursor: ${props => props.cursorType};
  background-color: ${primary[100]};
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0px 4px 0px 8px;
  margin-right: 2px;
  :last-child {
    margin-right: 0px;
  }
`;

const TopicName = styled.div`
  font-size: 12px;
  color: ${props => props.textColor};
  margin-right: 4px;
  line-height: 1;
`;

export default withRouter(Topic);
