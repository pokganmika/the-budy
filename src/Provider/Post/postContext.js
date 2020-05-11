import React, { createContext } from 'react';

export const PostContext = createContext({});

export const PostListContext = createContext({});

export function PostProvider({ children, store }) {
  return <PostContext.Provider value={store}>{children}</PostContext.Provider>;
}

export function PostListProvider({ children, store }) {
  return <PostListContext.Provider value={store}>{children}</PostListContext.Provider>;
}
