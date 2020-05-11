import React, { Component } from 'react';
import HelpCenterMain from '../../Presenter/Pages/HelpCenter/HelpCenterMain';
import HelpCenterDetailSection from '../../Presenter/Pages/HelpCenter/HelpCenterDetailSection';
import HelpCenterDetailPage from '../../Presenter/Pages/HelpCenter/HelpCenterDetailPage';
import HelpCenterRequest from '../../Presenter/Pages/HelpCenter/HelpCenterRequest';
import HelpCenterSearchResult from '../../Presenter/Pages/HelpCenter/HelpCenterSearchResult'
import styled from 'styled-components';

const Container = styled.div`
  
`;

class HelpCenter extends Component {
  
  componentDidMount = () => {

    // const { path } = this.props.match;
    // const { category } = this.props.match.params;
    // const { section } = this.props.match.params;
    // console.log(path)
    // console.log(category)
    // console.log(this.props.match.params)
  }

  render(){
    const { path } = this.props.match;

    let div = <div/>

    if (path == '/helpcenter') {
      div = <HelpCenterMain />
    } else if (path == '/helpcenter/:category/:section') {
      const { category } = this.props.match.params;
      const { section } = this.props.match.params;
      div = <HelpCenterDetailSection category={category} section={section} />
    } else if (path == '/helpcenter/post/:id') {
      const { id } = this.props.match.params;
      div = <HelpCenterDetailPage id={id} />
    } else if (path == '/helpcenter/ask') {
      div = <HelpCenterRequest />
    } else if (path == '/helpcenter/search') {
      div = <HelpCenterSearchResult/>
    } else {
      div = <HelpCenterMain />
    }
    return (
      <Container>
        {div}
      </Container>
    );
  }
}

export default HelpCenter;
