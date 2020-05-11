import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Image({
  className,
  type,
  src,
  onClick,
  link,
  width,
  height,
  margin,
  padding,
  cursor,
  borderRadius,
  cover
}) {
  return link ? (
    <Link to={link}>
      <Img
        className={className}
        type={type}
        src={src}
        cursor={cursor}
        width={width}
        height={height}
        margin={margin}
        padding={padding}
        borderRadius={borderRadius}
        cover={cover}
        alt=""
        onClick={onClick ? onClick : null}
      />
    </Link>
  ) : (
    <Img
      className={className}
      type={type}
      src={src}
      cursor={cursor}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      borderRadius={borderRadius}
      cover={cover}
      alt=""
      onClick={onClick ? onClick : null}
    />
  );
}

const Img = styled.img`
  display: block;
  border-radius: ${({ type, borderRadius }) =>
    type === 'profile' ? '50%' : borderRadius || '0px'};
  width: ${({ width }) => width || '300px'};
  height: ${({ height }) => height || '200px'};
  margin: ${({ margin }) => margin || '0px'};
  padding: ${({ padding }) => padding || '0px'};
  cursor: ${({ cursor, type }) => {
    if (cursor === 'pointer' || type === 'profile') {
      return 'pointer';
    } else {
      return 'auto';
    }
  }};
  object-fit: ${({ cover }) => (cover === 'none' ? 'initial' : 'cover')};
`;

export default Image;
