import styled from 'styled-components';
import {
  primary,
  greyscales,
  sub,
  white
} from '../../../../../Common/Styles/Colors';

export const Wrapper = styled.div`
  .content-status {
    display: flex;
    justify-content: center;
  }
`;

/**
 * Question - border (O) / box-shadow (X)
 * Article - border (X) / box-shadow (O)
 */
export const Content = styled.div`
  width: 100%;
  /* width: 600px; */
  max-width: 632px;
  height: auto;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid ${greyscales[200]};
  margin: 16px 0;

  @media (max-width: 530px) {
    margin: 0;
    border: 0px;
    border-bottom: ${(props) => props.borderWidth} solid ${greyscales[200]};
  }

  .content-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-profile-outter-wrapper {
      display: flex;
    }
    .content-profile-inner-wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 8px;
      .content-display-name {
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
        color: ${greyscales[900]};
        cursor: pointer;
      }
      .content-created-at {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: ${greyscales[500]};
      }
    }
  }

  .content-data-wrapper {
    padding: 16px 0;
    .content-title {
      font-size: 20px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.4;
      letter-spacing: normal;
      color: #0a0a0a;
      cursor: pointer;
      margin-bottom: 16px;
      word-break: keep-all;
      word-wrap: break-word;
    }
    .content-topics {
      display: flex;
      flex-wrap: wrap;
      .content-topic {
        width: auto;
        height: 24px;
        background-color: ${primary[100]};
        margin-right: 2px;
        margin-bottom: 8px;
        padding: 4px 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: ${primary[500]};
        cursor: pointer;
      }
    }
  }

  .content-count-data-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-count-data-answer {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .content-count-data-answer-count {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: ${greyscales[900]};
      }
    }

    .content-count-data-icons {
      display: flex;
      align-items: center;
      .content-count-data-icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .content-count-data-icon-count {
        border-radius: 20px;
        background-color: ${sub[100]};
        width: auto;
        height: 40px;
        padding: 0 15px;
        display: flex;
        align-items: center;
      }
      .content-count-data-icon-vote {
        margin-left: 7px;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: ${greyscales[900]};
      }
    }
  }
`;

export const Article = styled.div`
  width: 100%;
  /* width: 600px; */
  max-width: 632px;
  height: auto;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 4px 40px 0 rgba(0, 40, 45, 0.08);
  margin: 16px 0;

  @media (max-width: 530px) {
    margin: 0;
    border-bottom: ${(props) => props.borderWidth} solid ${greyscales[200]};
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
  }

  .content-type {
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${greyscales[500]};
    margin-bottom: 8px;
  }
  .content-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content-profile-wrapper {
      display: flex;
      flex-direction: column;
      .content-display-name {
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
        color: ${greyscales[900]};
        cursor: pointer;
      }
      .content-created-at {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: ${greyscales[500]};
      }
    }
  }

  .content-data-wrapper {
    padding: 16px 0;
    height: fit-content;
    .content-title {
      font-size: 32px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      color: ${greyscales[900]};
      cursor: pointer;
      word-break: keep-all;
      word-wrap: break-word;
    }
    .content-topics {
      display: flex;
      flex-wrap: wrap;
      margin-top: 24px;
      .content-topic {
        width: auto;
        height: 24px;
        background-color: ${primary[100]};
        margin-right: 2px;
        margin-bottom: 8px;
        padding: 4px 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: ${primary[500]};
        cursor: pointer;
      }
    }
  }

  .content-count-data-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-count-data-answer {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .content-count-data-answer-count {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: ${greyscales[900]};
      }
    }

    .content-count-data-icons {
      display: flex;
      align-items: center;
      .content-count-data-icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
`;

export const Message = styled.div`
  width: 100%;
  /* width: 600px; */
  height: 80px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[400]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.span`
  display: inline-block;
  font-size: ${({ size }) => (size ? size : '16px')};
  color: ${({ color }) => (color ? color : greyscales[800])};
  cursor: pointer;
`;

export const AnswerButton = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${greyscales[900]};
  padding: 10px 0;
  display: flex;
  align-items: center;
  .content-count-data-detail {
    margin-left: 4px;
  }
`;

export const UserCard = styled.div`
  max-width: 632px;
  padding: 16px;

  border-bottom: ${(props) => props.borderWidth} solid ${greyscales[200]};
  display: flex;

  .usercard-profile-wrapper {
    width: 100%;
    max-width: 504px;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    margin-left: 16px;

    @media (max-width: 530px) {
      max-width: 192px;
    }

    .usercard-profile-header {
      display: flex;
      justify-content: space-between;

      @media (max-width: 530px) {
        display: block;
        .usercard-profile-budyid {
          margin-bottom: 16px;
        }
      }

      .usercard-follow-button {
        border-radius: 8px;
      }

      .usercard-profile-name-wrapper {
        cursor: pointer;
        .usercard-profile-username {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.5;
          color: ${greyscales[900]};
        }
        .usercard-profile-budyid {
          font-size: 12px;
          font-weight: 500;
          line-height: 1.33;
          color: ${sub[500]};
        }
      }
    }

    .usercard-profile-shortbio {
      font-size: 14px;
      font-weight: normal;
      line-height: 1.29;
      color: ${greyscales[700]};
      margin: 16px 0;
      word-break: keep-all;
      word-wrap: break-word;
    }

    .usercard-profile-divider {
      width: 80px;
      height: 1px;
      background-color: ${greyscales[200]};

      @media (max-width: 530px) {
        display: none;
      }
    }

    .usercard-profile-countdata-wrapper {
      display: flex;
      align-items: center;
      margin-top: 16px;
      .usercard-profile-countdata {
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
        color: ${greyscales[600]};
      }
      .usercard-profile-countdata:last-child {
        margin-left: 24px;
      }

      @media (max-width: 530px) {
        display: none;
        /* display: block;
        .usercard-profile-countdata:last-child {
          margin: 0;
          margin-top: 8px;
        } */
      }
    }
  }
`;

export const CopyMessage = styled.div`
  background-color: ${primary[500]};
  color: ${white};
  font-size: 16px;
  font-weight: 600;
  position: fixed;
  bottom: 16px;
  right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-radius: 4px;
  z-index: 500;
`;
