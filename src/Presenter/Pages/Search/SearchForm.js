import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import SearchArticles from './SearchForm/SearchArticles';
import SearchQuestions from './SearchForm/SerachQuestions';
import SearchTopics from './SearchForm/SearchTopics';
import SearchUsers from './SearchForm/SearchUsers';
import { primary, greyscales } from '../../../Common/Styles/Colors';

const Main = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  margin-bottom: 40px;
  max-width: 1064px;
  min-height: 900px;
`;

const SelectorWrapper = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;

  @media (max-width: 530px) {
    padding: 0 8px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    border-bottom: 1px solid ${greyscales[200]};
  }
`;

const Selector = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  padding: 16px;
  color: ${({ selected }) => (selected ? primary[500] : greyscales[500])};
  border-bottom: ${({ selected }) => selected && `2px solid ${primary[500]}`};
  &:hover {
    color: ${primary[500]};
  }

  @media (max-width: 530px) {
    display: inline-block;
    padding: 12px 0;
    margin: 0 8px;
  }
`;

const ListWrapper = styled.div`
  padding: 40px 24px;

  @media (max-width: 530px) {
    padding: 24px 0;
  }
`;

/**
 *
 * @param {string} idToken
 * @param {string} path
 * @param {string} value
 * @param {function} onChangeValue
 * @param {object} countData
 * @param {array} topicsData
 * @param {array} usersData
 * @param {function} searchKeyword
 * @param {boolean} keywordChanged
 * @param {function} onChangeKeywordChanged
 */
const SearchForm = ({
  idToken,
  keyword,
  value,
  onChangeValue,
  countData,
  topicsData,
  usersData,
  searchKeyword,
  keywordChanged,
  onChangeKeywordChanged
}) => {
  const location = useLocation();
  return (
    <Main>
      <SearchInput
        value={value}
        onChange={onChangeValue}
        onKeyPress={searchKeyword}
      />

      <SelectorWrapper>
        <Selector
          to={`/search/${keyword}/articles`}
          selected={
            searchPathCheck(location.pathname) === 'articles' ? true : null
          }
        >
          {`Articles (${countData.articles})`}
        </Selector>
        <Selector
          to={`/search/${keyword}/questions`}
          selected={
            searchPathCheck(location.pathname) === 'questions' ? true : null
          }
        >
          {`Questions (${countData.questions})`}
        </Selector>
        <Selector
          to={`/search/${keyword}/topics`}
          selected={
            searchPathCheck(location.pathname) === 'topics' ? true : null
          }
        >
          {`Topics (${countData.topics})`}
        </Selector>
        <Selector
          to={`/search/${keyword}/users`}
          selected={
            searchPathCheck(location.pathname) === 'users' ? true : null
          }
        >
          {`Users (${countData.users})`}
        </Selector>
      </SelectorWrapper>

      <ListWrapper>
        <Route
          path={`/search/:search/articles`}
          render={() => (
            <SearchArticles
              idToken={idToken}
              keyword={keyword}
              topicsData={topicsData}
              usersData={usersData}
              keywordChanged={keywordChanged}
              onChangeKeywordChanged={onChangeKeywordChanged}
            />
          )}
        />
        <Route
          path={`/search/:search/questions`}
          render={() => (
            <SearchQuestions
              idToken={idToken}
              keyword={keyword}
              topicsData={topicsData}
              usersData={usersData}
            />
          )}
        />
        <Route
          path={`/search/:search/topics`}
          render={() => <SearchTopics topicsData={topicsData} />}
        />
        <Route
          path={`/search/:search/users`}
          render={() => <SearchUsers idToken={idToken} keyword={keyword} />}
        />
      </ListWrapper>
    </Main>
  );
};

SearchForm.propTypes = {
  idToken: PropTypes.string,
  keyword: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  countData: PropTypes.object.isRequired,
  topicsData: PropTypes.array.isRequired,
  usersData: PropTypes.array.isRequired,
  searchKeyword: PropTypes.func.isRequired,
  keywordChanged: PropTypes.bool.isRequired,
  onChangeKeywordChanged: PropTypes.func.isRequired
};

// Search Path check
/**
 *
 * @param {string} path
 */
const searchPathCheck = path => {
  let slashCount = 0;
  for (let i = 0; i < path.length; i++) {
    if (slashCount === 3) return path.slice(i);
    path[i] === '/' && slashCount++;
  }
};

// Search Input
const Wrapper = styled.div`
  width: 100%;
  padding: 16px 24px;

  @media (max-width: 530px) {
    padding: 8px 16px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid ${greyscales[500]};
`;

const Input = styled.input`
  font-size: 48px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background-color: transparent;
  color: ${greyscales[900]};
  ::-webkit-input-placeholder {
    color: ${greyscales[400]};
  }
  min-width: 50px;

  @media (max-width: 530px) {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
  }
`;

/**
 *
 * @param {string} value
 * @param {function} onChange
 * @param {function} onKeyPress
 */
const SearchInput = ({ value, onChange, onKeyPress }) => (
  <Wrapper>
    <InputWrapper>
      <Input
        type="text"
        placeholder="Search here"
        maxLength="200"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </InputWrapper>
  </Wrapper>
);

export default SearchForm;
