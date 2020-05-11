import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import helpCenterCategories from './HelpCenterMenu';
import HelpCenterSearchBarMain from './HelpCenterSearchBarMain';
import HelpCenterFooter from  './HelpCenterFooter';
import { primary, greyscales, sub, white, positiveBlues } from '../../../Common/Styles/Colors';
import { string } from 'prop-types';

class HelpCenterSearchResult extends Component {  

  render(){

    const searchedItems = helpCenterCategories.map((category, i) => {
      const categoryName = category.title;
      const categoryUrl = category.url;

      const resultSections = category.sections.map((section, i) => {
        const sectionName = section.title;
        const sectionUrl = section.url;

        const searchedMenus = section.menus.filter ((menu, i) => {
          // 검색어 부분
          const keyword = 'test';

          const rawContents = menu.contents.map((content, i) => {
            if (typeof(content.content) === 'string') {
              return content.content;
            } else {
              const strings = content.content.map ((string, i) => {
                return string;
              })
              return strings.join(' ');
            }
          })
          const rawStrings = rawContents.join(' ');
          // 검색어 부분
          return rawStrings.indexOf(keyword) != -1
        })

        return {
          sectionName: sectionName,
          sectionUrl: sectionUrl,
          data: searchedMenus
        }
      })

      return {
        categoryName: categoryName,
        categoryUrl: categoryUrl,
        sections: resultSections
      }
    });

    const searchedResultItems = searchedItems.map((category, i) => {
      const temp = category.sections.map((section, i) => {
        section.data.map((item, i) => {
          if (typeof(item.contents[0].content) === 'string') {
            console.log(category.categoryName, category.categoryUrl, section.sectionName, section.sectionUrl, item.title, item.url, item.contents[0].content);
            return (
              <div className='itemContainer'>
                <Link className='linkDefault' to={item.url}><div className='itemName'>{item.title}</div></Link>
                <div className='depth'>
                  <span className='depthText'>Budy Help Center</span>
                  <span className='budy-chevron-right'/>
                  <span className='depthText'>{searchedItems.categoryName}</span>
                  <span className='budy-chevron-right'/>
                  <span className='depthText'>{section.sectionName}</span>
                </div>
                <div className='contents'>
                  {item.contents[0].content}
                </div>
              </div>
            )
            
          } else {
            const strings = item.contents[0].content.map ((string, i) => {
              return string;
            })
            console.log(category.categoryName, category.categoryUrl, section.sectionName, section.sectionUrl, strings.join(' '));
            return (
              <div className='itemContainer'>
                <Link className='linkDefault' to={item.url}><div className='itemName'>{item.title}</div></Link>
                <div className='depth'>
                  <span className='depthText'>Budy Help Center</span>
                  <span className='budy-chevron-right'/>
                  <span className='depthText'>{searchedItems.categoryName}</span>
                  <span className='budy-chevron-right'/>
                  <span className='depthText'>{section.sectionName}</span>
                </div>
                <div className='contents'>
                  {strings.join(' ')}
                </div>
              </div>
            )
          }
        })
      })
      return temp;
    })

    return (
      <Container>
        <HelpCenterSearchBarMain/>

        <ResultContainer>
          {searchedResultItems[0][0]}
        </ResultContainer>

        <PaginationContainer>
        </PaginationContainer>

        <HelpCenterFooter/>
      </Container>
    )
  }
}

export default HelpCenterSearchResult;

const Container = styled.div`
  width: 100%;
  background-color: ${white};
  
  .linkDefault {
    color: black;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  min-height: 400px;
  position: relative;

  background-color: ${white};

  .itemContainer {
    border: 1px solid red;
  }

`;

const PaginationContainer = styled.div`
  width: 100%;

  background-color: ${white};
  position: relative;

`;


