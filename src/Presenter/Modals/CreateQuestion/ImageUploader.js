import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import {
  white,
  sub,
  greyscales,
  negativeReds
} from '../../../Common/Styles/Colors';
import { SecondaryBtn } from '../../../Common/Elements/Buttons/BorderButton';

const ImageUploader = ({ base64, setImage, removeImage }) => {
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);

  const _data = base64 || data;

  const checkImage = files => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const { length } = files;
    const { size, type } = files[0];

    if (length === 0) {
      return false;
    }

    if (!fileTypes.includes(type)) {
      setErr('File format must be either png or jpg');
      return false;
    }

    if (size / 1024 / 1024 > 2) {
      setErr('File size exceeded the limit of 2MB');
      return false;
    }

    setErr(false);
    return true;
  };

  const onDrop = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log('Files-onDrop: ', files);
    const result = checkImage(files);
    if (result) {
      const reader = new FileReader();
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onload = loadEvent => {
        const base64 = loadEvent.target.result;
        if (setImage) return setImage({ file, base64 });
        return setData(base64);
      };
    }
  };

  const selectImage = e => {
    e.preventDefault();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const files = input.files;
      console.log('Files-select: ', files);
      const result = checkImage(files);
      if (result) {
        const reader = new FileReader();
        const file = files[0];
        reader.readAsDataURL(file);
        reader.onload = loadEvent => {
          const base64 = loadEvent.target.result;
          if (setImage) return setImage({ file, base64 });
          return setData(base64);
        };
      }
    };
  };

  const _removeImage = () => {
    if (removeImage) return removeImage(false);
    return setData(false);
  };

  // const onDragStart = e => {
  //   e.preventDefault();
  // };

  const onDragOver = e => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {_data ? (
        <ImagePreview>
          <img className="image" src={_data} alt="" />
          <div className="removeBtn" onClick={_removeImage}>
            <span className="budy-trash" />
          </div>
        </ImagePreview>
      ) : (
        <ImageUploadView>
          {err && <ErrorMsg>{err}</ErrorMsg>}
          <DropZone onDrop={e => onDrop(e)} onDragOver={e => onDragOver(e)}>
            <span className="budy-upload" />
            <span className="message">Upload your image here or</span>
            <SecondaryBtn
              text="Browse"
              size="small"
              width="80px"
              state="hovered"
              onClick={selectImage}
            />
          </DropZone>
          <div className="descriptionMsg">
            JPG, JPEG, PNG and GIF file Only.
          </div>
        </ImageUploadView>
      )}
    </Fragment>
  );
};

const ImageUploadView = styled.div`
  .descriptionMsg {
    font-size: 14px;
    font-style: italic;
    line-height: 1.3;
    color: ${greyscales[500]};
    margin-top: 6px;
  }
  
`;

const ErrorMsg = styled.div`
  font-size: 14px;
  color: red;
`;

const DropZone = styled.div`
  width: 100%;
  min-height: 120px;
  border: dashed 2px ${sub[500]};
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

const ImagePreview = styled.div`
  position: relative;
  padding: 16px;
  .image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 4px;
  }
  .removeBtn {
    cursor: pointer;
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${white};
    .budy-trash {
      font-size: 20px;
      color: ${negativeReds[500]};
    }
  }
`;

export default ImageUploader;
