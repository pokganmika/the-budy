import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  primary,
  greyscales,
  sub,
  white,
  positiveBlues,
} from '../../../Common/Styles/Colors';
import Image from '../../../Common/Elements/Image';
import budyWordmark from '../../../Images/budy_Wordmark.svg';

export default function HelpCenterFooter() {
  return (
    <Container>
      <div className="footerContainer">
        <div className="footerLogo">
          <Image
            src={budyWordmark}
            link="/"
            cursor="pointer"
            width="84px"
            height="32px"
            cover="none"
          />
        </div>
        <div className="footerDescription">
          If you did not find the answer to your question,
          <br />
          contact to Budy support team directly.
        </div>
        <div className="footerEmail">support@thebudy.com</div>
        <div className="footerSNSContainer">
          <span className="budy-facebook-f" />
          <span className="budy-youtube_playbt" />
          <span className="budy-medium-m" />
          <span className="budy-twitter" />
        </div>
        <div className="footerCompany">
          GANA Technologies OÜ © All rights reserved.
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1032px;
  height: auto;
  margin: 0 auto;
  background-color: ${white};
  border-top: 1px solid ${greyscales[200]};
  border-bottom: 1px solid ${greyscales[200]};

  .footerContainer {
    margin: 80px 0;

    @media (max-width: 530px) {
      padding: 0 16px;
    }
  }

  .footerLogo {
    width: 100%;
    height: 32px;

    text-align: left;
  }

  .footerDescription {
    width: 100%;
    height: 40px;

    text-align: left;
    margin-top: 39px;

    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: ${greyscales[500]};
  }

  .footerEmail {
    width: 100%;
    height: 24px;
    text-align: left;
    margin-top: 16px;

    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${positiveBlues[500]};
  }

  .footerSNSContainer {
    width: 100%;
    text-align: left;
    margin-top: 40px;
  }

  .footerCompany {
    width: 100%;
    height: 16px;

    text-align: left;
    margin-top: 8px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${greyscales[500]};
  }

  .budy-facebook-f {
    font-size: 20px;
    margin-right: 25px;
    color: ${greyscales[200]};
  }
  .budy-youtube_playbt {
    font-size: 20px;
    margin-right: 25px;
    color: ${greyscales[200]};
  }
  .budy-medium-m {
    font-size: 20px;
    margin-right: 25px;
    color: ${greyscales[200]};
  }
  .budy-twitter {
    font-size: 20px;
    margin-right: 25px;
    color: ${greyscales[200]};
  }
`;
