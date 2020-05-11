import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { primary, greyscales, sub, white, positiveBlues, safeYellows, negativeReds } from '../../../Common/Styles/Colors';
import { Link } from 'react-router-dom';

class HelpCenterDetailPageComponent extends Component {

  render(){
  
    const { post } = this.props;
    const type = post.type;
    const content = post.content;

    let component = <div className={type}>{content}</div>

    if (type === 'list') {
      const subtype = post.subtype;
      const listItems = content.map((item, i) => {
        return (
          <div className='listItem' key={i}>
            {subtype === 'ordered' 
            ? 
            <div className='listItemNum'>{i+1}.</div>
            :
            <div className='listItemNum'>•</div>
            }
            <div className='listItemContent'>{item}</div>
          </div>
        )
      })
      component = <div className='list'>
        {listItems}
      </div>
    } else if (type.indexOf('tip') != -1) {
      component = <div className={type}><span className='bold'>TIP: </span>{content}</div>
    } else if (type.indexOf('normal') != -1) {

      const subContents = content.map((subContent, i) => {

        if (subContent.type === 'bold' || subContent.type === 'linked') {
          return (<span className={subContent.type} key={i}>{subContent.content}</span>)
        } else {
          return(<span key={i}>{subContent.content}</span>)
        }

      })
      component = <div className={type}>
        {subContents}
      </div>
    }

    return (
      <Fragment>{component}</Fragment>
    )
  }
}

export default HelpCenterDetailPageComponent;

const Container = styled.div`
`;
