import React, { useState } from 'react';
import styled from 'styled-components';
import {
  greyscales,
  alphaValues,
  negativeReds
} from '../../../Common/Styles/Colors';
import { DefaultBtn } from '../../../Common/Elements/Buttons/BorderButton';

function CoverImageUploader({ initialCoverImage, setImage, removeImage }) {
  const [data, setData] = useState(initialCoverImage || false);
  const [err, setErr] = useState(false);

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

  const selectImage = e => {
    e.preventDefault();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const files = input.files;
      const result = checkImage(files);
      if (result) {
        const reader = new FileReader();
        const file = files[0];
        reader.readAsDataURL(file);
        reader.onload = loadEvent => {
          const base64 = loadEvent.target.result;
          if (setImage) setImage(file);
          return setData(base64);
        };
      }
    };
  };

  const _removeImage = () => {
    if (removeImage) removeImage();
    return setData(null);
  };

  return (
    <View className="coverImageUploader">
      <div className="actions">
        <DefaultBtn
          className="imageUploadBtn"
          text="Upload Cover Image"
          size="small"
          width="160px"
          state="hovered"
          onClick={selectImage}
        />
        {data && (
          <DefaultBtn
            size="small"
            width="32px"
            state="hovered"
            Icon={
              <span
                className="budy-trash"
                style={{ fontSize: '16px', color: negativeReds[500] }}
              />
            }
            onClick={_removeImage}
          />
        )}
        {err && <ErrorMsg>{err}</ErrorMsg>}
      </div>
      {data && <img className="coverImage" src={data} />}
      {data && <div className="background" />}
    </View>
  );
}

const View = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 400px;
  border-bottom: solid 1px ${greyscales[200]};
  .actions {
    display: flex;
    align-items: center;
    max-width: 808px;
    margin: 0 auto;
    padding: 24px 16px;
    position: absolute;
    z-index: 22;
    left: 50px;
    right: 50px;
    top: 0px;
    
    @media (max-width: 530px) {
      left: 0;
      right: 0;
    }
    
    .imageUploadBtn {
      margin-right: 8px;
    }
  }
  .coverImage {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: ${alphaValues[300]};
    width: 100%;
    height: 100%;
  }

  @media (max-width: 530px) {
    height: 320px;
    .actions {
      left: 0px;
      right: 0px;
      padding: 16px;
    }
  }
`;

const ErrorMsg = styled.div`
  font-size: 14px;
  color: red;
`;

export default CoverImageUploader;
