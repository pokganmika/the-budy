import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  greyscales,
  primary,
  sub,
  safeYellows,
  negativeReds,
} from '../../../Common/Styles/Colors';
import Image from '../../../Common/Elements/Image';
import TermsImage from '../../../Images/terms_image.png';
import { PrimaryBtn as AskButton } from '../../../Common/Elements/Buttons/SolidButton';
import Footer from '../../Pages/HelpCenter/HelpCenterFooter';

const Container = styled.div`
  max-width: 1032px;
  height: auto;
  margin: 40px auto 0;

  @media (max-width: 530px) {
    padding: 0 16px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${greyscales[900]};
  padding: 8px 0;
  border-bottom: 1px solid ${greyscales[200]};
  margin-bottom: 40px;
`;

const Description = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${greyscales[900]};
  .terms-h1 {
    font-size: 40px;
    font-weight: 300;
    line-height: 1.15;
  }
  .terms-h2 {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.25;
    margin-top: 24px;
  }
  .terms-h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 2px solid ${greyscales[200]};
  }
  .terms-h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.6;
    margin-top: 24px;
  }
  .terms-text-style {
    font-size: 16px;
    line-height: 1.5;
    margin-top: 24px;
    .terms-text-link {
      color: ${primary[500]};
    }
    .terms-text-bold {
      font-weight: 600;
    }
  }

  .terms-list {
    margin-top: 24px;
    font-size: 16px;
    line-height: 1.5;
    .terms-list-group {
      padding: 0 8px;
      margin-bottom: 16px;
      .terms-list-detail {
        margin-bottom: 8px;
      }

      .terms-list-detail-descriptions {
        display: flex;
        margin-bottom: 8px;
        .terms-list-detail-description-bold {
          width: 240px;
          margin-right: 24px;
          font-weight: 600;
        }
        .terms-list-detail-description-emphasis {
          width: 240px;
          margin-right: 24px;
          font-weight: 600;
          color: ${primary[500]};
        }
      }
    }
  }

  .terms-image-message {
    font-size: 16px;
    line-height: 1.5;
    margin-top: 24px;
  }
`;

const TipBox = styled.div`
  margin-top: 24px;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor === 'green'
      ? sub[100]
      : backgroundColor === 'yellow'
      ? safeYellows[100]
      : backgroundColor === 'red' && negativeReds[100]};

  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${greyscales[900]};

  span {
    font-weight: 600;
  }
`;

const ImageBox = styled.div`
  border: 1px solid ${greyscales[200]};
  width: 100%;
  height: fit-content;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 128px;
  margin: 24px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .terms-button-box-message {
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    line-height: 1.14;
    letter-spacing: normal;
  }
  .terms-button {
    border-radius: 8px;
    width: 434px;

    @media (max-width: 530px) {
      width: 100%;
    }
  }
`;

/**
 *
 * @param {function} moveAskPage
 */
const TermsOfServiceForm = ({ moveAskPage }) => {
  return (
    <>
      <Container>
        <Title>Terms of Service</Title>
        <Description>
          <div className="terms-h1">H1 - Heading 1</div>
          <div className="terms-h2">H2 - Heading 2</div>
          <div className="terms-h3">H3 - Heading 3 with divider</div>
          <div className="terms-h4">H4 - Heading 4</div>
          <div className="terms-text-style">
            This is normal text style that use in the paragraph. In
            circumstances, text could be used as a{' '}
            <span className="terms-text-link">linked text like this</span>, or
            using <span className="terms-text-bold">bold text like this</span>{' '}
            for emphasize.
          </div>

          <div className="terms-list">
            <div className="terms-list-group">
              <div className="terms-list-detail">1. Ordered list</div>
              <div className="terms-list-detail">2. Ordered list</div>
              <div className="terms-list-detail">3. Ordered list</div>
              <div className="terms-list-detail">4. Ordered list</div>
            </div>
            <div className="terms-list-group">
              <div className="terms-list-detail">• Bulleted list</div>
              <div className="terms-list-detail">• Bulleted list</div>
              <div className="terms-list-detail">• Bulleted list</div>
              <div className="terms-list-detail">• Bulleted list</div>
            </div>
            <div className="terms-list-group">
              <div className="terms-list-detail-descriptions">
                <div className="terms-list-detail-description-bold">
                  Description-Terms
                </div>
                <div className="terms-list-detail-description">
                  Description-Description
                </div>
              </div>
              <div className="terms-list-detail-descriptions">
                <div className="terms-list-detail-description-bold">
                  Description-Terms
                </div>
                <div className="terms-list-detail-description">
                  Description-Description
                </div>
              </div>
              <div className="terms-list-detail-descriptions">
                <div className="terms-list-detail-description-emphasis">
                  {'Description-Terms (emphasis)'}
                </div>
                <div className="terms-list-detail-description">
                  Description-Description
                </div>
              </div>
              <div className="terms-list-detail-descriptions">
                <div className="terms-list-detail-description-emphasis">
                  {'Description-Terms (emphasis)'}
                </div>
                <div className="terms-list-detail-description">
                  Description-Description
                </div>
              </div>
            </div>
          </div>

          <ImageBox>
            <Image src={TermsImage} width="80%" height="80%" />
          </ImageBox>

          <div className="terms-image-message">Reference Image formatting.</div>

          <TipBox backgroundColor="green">
            <span>TIP:</span> This is a Normal type of callout form, use this
            when need to provide some extra information to users. But, please
            make short, clearly and deliver to the point as you can.
          </TipBox>

          <TipBox backgroundColor="yellow">
            <span>TIP:</span> This is a Normal type of callout form, use this
            when need to provide some extra information to users. But, please
            make short, clearly and deliver to the point as you can.
          </TipBox>

          <TipBox backgroundColor="red">
            <span>TIP:</span> This is a Normal type of callout form, use this
            when need to provide some extra information to users. But, please
            make short, clearly and deliver to the point as you can.
          </TipBox>

          <ButtonBox>
            <div className="terms-button-box-message">Have more question?</div>
            <AskButton
              className="terms-button"
              text="ASK TO BUDY"
              onClick={moveAskPage}
            />
          </ButtonBox>
        </Description>
      </Container>
      <Footer />
    </>
  );
};

TermsOfServiceForm.propTypes = {
  moveAskPage: PropTypes.func.isRequired,
};

export default TermsOfServiceForm;
