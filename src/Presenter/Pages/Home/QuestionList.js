import React, { Fragment, useRef } from 'react';
import usePostList from '../../../Provider/Post/usePostList';
import QuestionPost from './QuestionPost';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {
  primary,
} from '../../../Common/Styles/Colors';

function QuestionList() {
  const scrollerFooter = useRef();
  const { posts, scrapHandler, eol, isLoading } = usePostList('question', scrollerFooter);

  return (
    <Fragment>
      {posts.map((question, id) => (
        <QuestionPost
          question={question}
          scrapHandler={scrapHandler}
          key={id}
          index={id}
        />
      ))}
      <div ref={scrollerFooter} />
      {
        isLoading && (
          <div className="content-status" style={{ textAlign: "center" }}>
            <Loader
              type="ThreeDots"
              color={primary[500]}
              height={40}
              width={40}
            />
          </div>
        )}
      {eol &&
        (<EndOfList>
          No more contents
        </EndOfList>)
      }
    </Fragment>
  );
}

const EndOfList = styled.div`
  text-align:center;
  margin-top:20px;
  margin-bottom:30px;
  font-size: 14px;
  font-weight: normal;
  color: #b8b8b8;
`;

export default QuestionList;
