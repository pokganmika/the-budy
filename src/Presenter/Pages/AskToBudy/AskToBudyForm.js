import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from '../../Pages/HelpCenter/HelpCenterFooter';
import { PrimaryBtn as SubmitButton } from '../../../Common/Elements/Buttons/SolidButton';
import { SecondaryBtn as ImageButton } from '../../../Common/Elements/Buttons/BorderButton';
import { greyscales, sub } from '../../../Common/Styles/Colors';

const Container = styled.div`
  max-width: 680px;
  height: auto;
  margin: 40px auto 0;

  @media (max-width: 530px) {
    padding: 0 16px;
  }
`;

const Title = styled.div`
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  .ask-budy-title {
    font-size: 40px;
    font-weight: 300;
    line-height: 1.15;
  }
  .ask-budy-subTitle {
    margin: 24px 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.33;
  }
  border-bottom: 1px solid ${greyscales[200]};
`;

const AskForm = styled.div`
  margin-top: 24px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  font-weight: 600;
  .ask-message {
    font-size: 16px;
    line-height: 1.5;
  }

  .ask-detail {
    margin-top: 24px;
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 1.29;
  }

  .ask-text-container {
    border: 1px solid ${greyscales[200]};
    border-radius: 4px;
    background-color: #ffffff;
    width: 100%;
    height: 48px;
    padding: 12px;
    .ask-text {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
    }
  }
  .ask-text-field-container {
    border: 1px solid ${greyscales[200]};
    border-radius: 4px;
    width: 100%;
    height: 120px;
    .ask-text-field {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      resize: none;
      margin: 0;
      padding: 12px;

      ::-webkit-scrollbar {
        width: 16px;
      }
      ::-webkit-scrollbar-thumb {
        background: ${sub[200]};
        background-clip: padding-box;
        border-radius: 2px;
        border: 6px solid #ffffff;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
      }
      ::-webkit-scrollbar-thumb:active {
        background: ${sub[400]};
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${sub[400]};
      }
      ::-webkit-scrollbar-track {
        background-color: #ffffff;
      }
      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }
    }
  }

  .ask-detail-message {
    font-style: italic;
    font-weight: normal;
    margin-top: 6px;
    color: ${greyscales[500]};
  }

  .ask-temp-image-container {
    border-radius: 4px;
    width: 50%;
    padding: 8px;
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ask-temp-image {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      line-height: 1.33;
      color: ${greyscales[700]};
    }
    .budy-x {
      cursor: pointer;
    }
  }
  .ask-temp-image-container:hover {
    background-color: ${greyscales[100]};
  }

  .ask-submit-button-box {
    margin: 40px;
    display: flex;
    justify-content: center;

    .ask-submit-button {
      width: 434px;

      @media (max-width: 530px) {
        width: 100%;
      }
    }

    @media (max-width: 530px) {
      margin: 40px 0;
    }
  }
`;

const ImageSection = styled.div`
  width: 100%;
  min-height: 120px;
  border: dashed 1px ${sub[500]};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  .budy-upload {
    font-size: 16px;
    color: ${sub[500]};
  }
  .message {
    font-size: 14px;
    line-height: 1.45;
    color: ${greyscales[900]};
    margin: 0px 8px;
  }
  @media (max-width: 530px) {
    flex-direction: column;
    .message {
      margin-top: 6px;
      margin-bottom: 16px;
    }
  }
`;

/**
 *
 * @param {object} form
 * @param {boolean} validate
 * @param {string} errorMessage
 * @param {function} onChangeForm
 * @param {function} onDropImage
 * @param {function} selectImage
 * @param {function} removeImage
 * @param {function} checkValidation
 * @param {function} submitFormData
 */
const AskToBudyForm = ({
  form,
  validate,
  errorMessage,
  onChangeForm,
  onDropImage,
  selectImage,
  removeImage,
  checkValidation,
  submitFormData,
}) => {
  const onDragOver = e => {
    e.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
        <Title>
          <div className="ask-budy-title">Ask to Budy</div>
          <div className="ask-budy-subTitle">
            Still having issues? Let us know
          </div>
        </Title>

        <AskForm>
          <div className="ask-message">
            Can't find what you need in our Help Center? Fill out the form below
            to get in touch.
          </div>

          <div className="ask-email">
            <div className="ask-detail">Your email address</div>
            <div className="ask-text-container">
              <input
                type="text"
                className="ask-text"
                name="email"
                value={form.email}
                onChange={onChangeForm}
                onBlur={checkValidation}
              />
            </div>
          </div>

          <div className="ask-description">
            <div className="ask-detail">Description</div>
            <div className="ask-text-field-container">
              <textarea
                className="ask-text-field"
                name="description"
                value={form.description}
                onChange={onChangeForm}
                onBlur={checkValidation}
              />
            </div>
            <div className="ask-detail-message">
              Please enter the details of your request. A member of our support
              staff will respond ASAP.
            </div>
          </div>

          <div className="ask-username">
            <div className="ask-detail">{'Your Budy Username (Optional)'}</div>
            <div className="ask-text-container">
              <input
                type="text"
                className="ask-text"
                name="username"
                value={form.username}
                onChange={onChangeForm}
              />
            </div>
            <div className="ask-detail-message">
              Username of the account associated with your email address.
            </div>
          </div>

          <div className="ask-image">
            <div className="ask-detail">{'Reference Image (Optional)'}</div>

            <ImageSection
              onDrop={e => onDropImage(e)}
              onDragOver={e => onDragOver(e)}
            >
              <span className="budy-upload" />
              <span className="message">Upload your image here</span>
              <ImageButton
                text="Browse"
                size="small"
                width="80px"
                state="hovered"
                onClick={selectImage}
              />
            </ImageSection>

            <div className="ask-detail-message">
              JPG, JPEG, PNG and GIF file Only.
            </div>

            {errorMessage !== '' && (
              <div style={{ color: 'red' }}>{errorMessage}</div>
            )}

            {form.image && (
              <div className="ask-temp-image-container">
                <div className="ask-temp-image">{form.image.name}</div>
                <span className="budy-x" onClick={removeImage} />
              </div>
            )}
          </div>

          <div className="ask-submit-button-box">
            <SubmitButton
              className="ask-submit-button"
              text="Submit"
              state={validate ? 'normal' : 'disabled'}
              onClick={submitFormData}
            />
          </div>
        </AskForm>
      </Container>
      <Footer />
    </>
  );
};

AskToBudyForm.propTypes = {
  form: PropTypes.object.isRequired,
  validate: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onChangeForm: PropTypes.func.isRequired,
  onDropImage: PropTypes.func.isRequired,
  selectImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  checkValidation: PropTypes.func.isRequired,
  submitFormData: PropTypes.func.isRequired,
};

export default AskToBudyForm;
