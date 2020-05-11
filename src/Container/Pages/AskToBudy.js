import React, { useState } from 'react';
import AskToBudyForm from '../../Presenter/Pages/AskToBudy/AskToBudyForm';
import axios from 'axios';
import { USER_API } from '../../Config/api';

import { emailSchema } from '../../Service/validate';

/**
 * initAskToBudyState
 *
 * email
 * description
 * username (optional)
 * image (optional)
 */
const initAskToBudyState = {
  email: '',
  description: '',
  username: '',
  image: null,
};

const AskToBudy = () => {
  const [form, setForm] = useState(initAskToBudyState);
  const [validate, setValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removeImage = () => setForm({ ...form, image: null });

  const checkValidation = () => {
    const checkedEmail = emailSchema(form.email);
    if (checkedEmail) {
      if (form.email.length !== 0 && form.description.length !== 0) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    } else {
      setValidate(false);
    }
  };

  const checkImage = (files) => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const { length } = files;
    const { size, type } = files[0];
    setErrorMessage('');

    if (length === 0) return false;
    if (!fileTypes.includes(type)) {
      setErrorMessage('File format must be either png or jpg');
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErrorMessage('File size exceeded the limit or 2MB');
      return false;
    }
    return true;
  };

  const onDropImage = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const result = checkImage(files);
    if (result) {
      const image = files[0];
      setForm({ ...form, image });
    }
  };

  const selectImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const image = input.files[0];
      setForm({ ...form, image });
    };
  };

  const submitFormData = async () => {
    try {
      if (!validate) throw new Error();

      const { email, description, username, image } = form;
      const formData = new FormData();
      formData.append('email', email);
      formData.append('body', description);

      if (username && image) {
        formData.append('name', username);
        formData.append('images', image);
      } else if (username && !image) {
        formData.append('name', username);
      } else if (!username && image) {
        formData.append('images', image);
      }

      const response = await axios({
        method: 'POST',
        url: `${USER_API}/helpcenters`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(
        '::AskToBudy Component - submitFormData:: ---> success : ',
        response
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AskToBudyForm
      form={form}
      validate={validate}
      errorMessage={errorMessage}
      onChangeForm={onChangeForm}
      onDropImage={onDropImage}
      selectImage={selectImage}
      removeImage={removeImage}
      checkValidation={checkValidation}
      submitFormData={submitFormData}
    />
  );
};

export default AskToBudy;
