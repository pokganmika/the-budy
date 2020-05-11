import styled from 'styled-components';
import { greyscales } from '../../../../Common/Styles/Colors';

export const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  @media (max-width: 650px) {
    display: none;
  }
`;

export const Icon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
`;

// Summary

// Questions

// Articles
