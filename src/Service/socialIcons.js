import React from 'react';
import styled from 'styled-components';

import MediumIcon from '@iconscout/react-unicons/icons/uil-medium-m';
import FacebookIcon from '@iconscout/react-unicons/icons/uil-facebook';
import YoutubeIcon from '@iconscout/react-unicons/icons/uil-youtube';
import TwitterIcon from '@iconscout/react-unicons/icons/uil-twitter';

const SocialIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin: ${({ margin }) => margin ? margin : '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  &:hover::before {
    color: #dddddd;
    position: absolute;
    top: 25px;
    left: 10px;
    content: "${({linkUrl}) => linkUrl || ''}";
  }
  /* div {
    display: none;
    width: 100%;
  }
  &:hover + div {
    display: block;
    border: 1px solid red;
    width: 100%
  } */
`;

const Medium = ({ color, onClick, margin, linkUrl }) => (
  <SocialIconWrapper onClick={onClick} margin={margin} linkUrl={linkUrl}>
    {/* <div>{linkUrl}</div> */}
    <MediumIcon
      color={color ? '#000000' : 'rgba(0, 0, 0, 0.4)'}
    />
  </SocialIconWrapper>
);

const Facebook = ({ color, onClick, margin, linkUrl }) => (
  <SocialIconWrapper onClick={onClick} margin={margin} linkUrl={linkUrl}>
    {/* <div>{linkUrl}</div> */}
    <FacebookIcon
      color={color ? '#356bc4' : 'rgba(0, 0, 0, 0.4)'}
    />
  </SocialIconWrapper>
);

const Youtube = ({ color, onClick, margin, linkUrl }) => (
  <SocialIconWrapper onClick={onClick} margin={margin} linkUrl={linkUrl}>
    {/* <div>{linkUrl}</div> */}
    <YoutubeIcon
      color={color ? '#e62117' : 'rgba(0, 0, 0, 0.4)'}
    />
  </SocialIconWrapper>
);

const Twitter = ({ color, onClick, margin, linkUrl }) => (
  <SocialIconWrapper onClick={onClick} margin={margin} linkUrl={linkUrl}>
    {/* <div>{linkUrl}</div> */}
    <TwitterIcon
      color={color ? '#1da1fe' : 'rgba(0, 0, 0, 0.4)'}
    />
  </SocialIconWrapper>
);

export {
  Medium,
  Facebook,
  Youtube,
  Twitter
};
