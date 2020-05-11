import React from 'react';
import styled from 'styled-components';
import {
  AlertTriangle,
  AlertCircle,
  AlertCircleOutline,
  CheckmarkCircle2,
  SearchOutline,
  PlusSquareOutline,
  BellOutline,
  CloseOutline,
  QuestionMarkCircle,
  Edit,
  Edit2,
  EditOutline,
  Checkmark,
  Eye,
  MoreHorizontalOutline,
  MoreVerticalOutline,
  ExternalLinkOutline,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Bookmark,
  AtOutline,
  PlusOutline,
  PlusCircleOutline,
  ImageOutline,
  Video,
  Link2Outline,
  ArrowDownwardOutline,
  ArrowUpwardOutline,
  PaperPlaneOutline,
  ArrowIosUpwardOutline,
  ArrowIosDownwardOutline,
  ArrowIosBackOutline,
  ArrowIosForwardOutline,
  QuestionMarkOutline,
  ListOutline,
  Google,
  Facebook,
  EmailOutline,
  PlusCircle,
  GlobeOutline,
  Trash2Outline,
  ExternalLink,
  MessageCircleOutline,
  Share,
  RadioButtonOffOutline
} from '@forefront-ux/react-eva-icons';

import Bold from '@iconscout/react-unicons/icons/uil-bold';
import Italic from '@iconscout/react-unicons/icons/uil-italic';
import Underline from '@iconscout/react-unicons/icons/uil-underline';
import TextStrikeThrough from '@iconscout/react-unicons/icons/uil-text-strike-through';
import LeftToRightTextDirection from '@iconscout/react-unicons/icons/uil-left-to-right-text-direction';
import Image from '@iconscout/react-unicons/icons/uil-image';
import ListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import RightIndentAlt from '@iconscout/react-unicons/icons/uil-right-indent-alt';
import Film from '@iconscout/react-unicons/icons/uil-film';
import LinkH from '@iconscout/react-unicons/icons/uil-link-h';
import Redo from '@iconscout/react-unicons/icons/uil-redo';
import Youtube from '@iconscout/react-unicons/icons/uil-youtube';
import Medium from '@iconscout/react-unicons/icons/uil-medium-m';
import Twitter from '@iconscout/react-unicons/icons/uil-twitter';

const Icon = ({
  type,
  className,
  cursor,
  display,
  size,
  color,
  margin,
  padding,
  onClick,
  linkUrl,
}) => {
  if (type) {
    return (
      <Box
        className={className || null}
        cursor={cursor}
        display={display}
        size={size}
        onClick={onClick || null}
        margin={margin}
        padding={padding}
        linkUrl={linkUrl}
      >
        {type === 'youtube' && (
          <Youtube size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'medium' && (
          <Medium size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'twitter' && (
          <Twitter size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'bold' && (
          <Bold size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'italic' && (
          <Italic size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}

        {type === 'underline' && (
          <Underline size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'text-strike-through' && (
          <TextStrikeThrough
            size="100%"
            color={color ? color : 'rgba(0, 0, 0, 0.4)'}
          />
        )}
        {type === 'left-to-right-text-direction' && (
          <LeftToRightTextDirection
            size="100%"
            color={color ? color : 'rgba(0, 0, 0, 0.4)'}
          />
        )}
        {type === 'image' && (
          <Image size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'list-ul' && (
          <ListUl size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'right-indent-alt' && (
          <RightIndentAlt
            size="100%"
            color={color ? color : 'rgba(0, 0, 0, 0.4)'}
          />
        )}
        {type === 'film' && (
          <Film size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'link-h' && (
          <LinkH size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'redo' && (
          <Redo size="100%" color={color ? color : 'rgba(0, 0, 0, 0.4)'} />
        )}
        {type === 'Weak' && (
          <AlertCircle size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'alert-circle-outline' && (
          <AlertCircleOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'Good' && (
          <AlertTriangle size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'Strong' && (
          <CheckmarkCircle2 size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'search-outline' && (
          <SearchOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'plus-square-outline' && (
          <PlusSquareOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'bell-notice' && (
          <BellOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'close-outline' && (
          <CloseOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'question-mark-circle' && (
          <QuestionMarkCircle size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'edit' && (
          <Edit size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'checkmark' && (
          <Checkmark size="100%" color={color ? color : '#000000'} />
        )}

        {type === 'edit2' && (
          <Edit2 size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'edit-outline' && (
          <EditOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'eye' && (
          <Eye size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'more-horizontal-outline' && (
          <MoreHorizontalOutline
            size="100%"
            color={color ? color : '#000000'}
          />
        )}
        {type === 'more-vertical-outline' && (
          <MoreVerticalOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'external-link-outline' && (
          <ExternalLinkOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'message-circle' && (
          <MessageCircle size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'arrow-up' && (
          <ArrowUp size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'arrow-down' && (
          <ArrowDown size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'bookmark' && (
          <Bookmark size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'at-outline' && (
          <AtOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'plus-outline' && (
          <PlusOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'plus-circle-outline' && (
          <PlusCircleOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'image-outline' && (
          <ImageOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'video' && (
          <Video size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'link2-outline' && (
          <Link2Outline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'arrow-downward-outline' && (
          <ArrowDownwardOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'arrow-upward-outline' && (
          <ArrowUpwardOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'paper-plane-outline' && (
          <PaperPlaneOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'arrow-ios-upward-outline' && (
          <ArrowIosUpwardOutline
            size="100%"
            color={color ? color : '#000000'}
          />
        )}
        {type === 'arrow-ios-downward-outline' && (
          <ArrowIosDownwardOutline
            size="100%"
            color={color ? color : '#000000'}
          />
        )}
        {type === 'arrow-ios-back-outline' && (
          <ArrowIosBackOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'arrow-ios-forward-outline' && (
          <ArrowIosForwardOutline
            size="100%"
            color={color ? color : '#000000'}
          />
        )}
        {type === 'question-mark-outline' && (
          <QuestionMarkOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'list-outline' && (
          <ListOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'google' && (
          <Google size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'facebook' && (
          <Facebook size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'email' && (
          <EmailOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'plus-circle' && (
          <PlusCircle size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'globe-outline' && (
          <GlobeOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'trash-2-outline' && (
          <Trash2Outline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'external-link' && (
          <ExternalLink size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'message-circle-outline' && (
          <MessageCircleOutline size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'share' && (
          <Share size="100%" color={color ? color : '#000000'} />
        )}
        {type === 'radio-button-off-outline' && (
          <RadioButtonOffOutline
            size="100%"
            color={color ? color : '#000000'}
          />
        )}
      </Box>
    );
  } else {
    return null;
  }
};

const Box = styled.div`
  cursor: ${({ cursor }) => cursor || 'auto'};
  display: ${({ display }) => display || 'block'};
  width: ${({ size }) => size || '24px'};
  height: ${({ size }) => size || '24px'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '0px'};
  line-height: 1;
  position: relative;

  &:hover::before {
    color: #cccccc;
    position: absolute;
    top: 25px;
    left: 10px;
    content: "${({linkUrl}) => linkUrl || ''}";
  }
`;

export default Icon;
