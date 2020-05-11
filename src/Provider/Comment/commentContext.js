import React, { createContext } from 'react';

export const CommentContext = createContext({});

export const CommentProvider = ({ children, store }) => (
  <CommentContext.Provider value={store}>{children}</CommentContext.Provider>
);
