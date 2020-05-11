import React, {useEffect, useState} from 'react';
import Quill from 'quill';
import axios from 'axios';
import { getAccessToken } from '../../../Service/token';
import { POST_API } from '../../../Config/api';
import Toolbar from './Toolbar';
import Container from './Container';
import Editor from './Editor';

function useEditorContainer(propsState) {
  return useState(propsState || {
    body: '',
    text: '',
    textLength: 0
  });
}

function CustomQuill({
  postId,
  type,
  container,
  initialBody,
  setContainer,
  quillToolbarId,
  quillContainerId,
}) {
  const [initialContainer, setInitialContainer] = useEditorContainer();

  const _postId = postId;
  const _container = container || initialContainer;
  const _body = initialBody || null;
  const _setContainer = setContainer || setInitialContainer;

  let editor = null;

  const uploadImage = async (postId, file) => {
    try {
      const user = await getAccessToken();
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': user.accessToken
        }
      };

      const formData = new FormData();
      formData.append('attach', file);

      const response = await axios.put(
        `${POST_API}/${postId}/upload`,
        formData,
        config
      );

      const { success, result } = response.data;
      return success ? result.url : '';
    } catch (err) {
      console.log(err);
    }
  };

  const options = {
    modules: {
      toolbar: {
        container: `#${quillToolbarId}`,
        handlers: {
          image: () => {
            // const input = document.createElement('input');
            // input.setAttribute('type', 'file');
            // input.setAttribute('accept', 'image/*');
            const input = document.querySelector('#imageUploader');
            input.click();
            input.onchange = async () => {
              const file = input.files[0];

              if (!/^.*\/(jpg|jpeg|png)$/.test(file.type.toLowerCase())) {
                alert('File types except for jpg, jpeg, png are not allowed.');
                return;
              }

              const url = await uploadImage(_postId, file);
              const range = editor.getSelection(false);
              editor.insertEmbed(range.index + 1, 'image', url);
              editor.insertEmbed(range.index + 3, 'text', '');
              editor.setSelection(range.index + 3);
            };
          }
        }
      }
    },
    placeholder: 'Type here...',
    theme: 'snow' // or 'bubble'
  };

  useEffect(() => {
    const Font = Quill.import('formats/font');
    Font.whitelist = ['Work Sans', 'sans-serif'];
    Quill.register(Font, true);

    editor = new Quill(`#${quillContainerId}`, options);

    editor.theme.tooltip.textbox.addEventListener('keyup', e => {
      if (!e.target.value.startsWith('http://') && !e.target.value.startsWith('https://')) {
        e.target.value = 'http://' + e.target.value;
      }
    });

    editor.on('text-change', function () {
      const body = editor.root.innerHTML;
      const text = editor.getText();
      const textLength = editor.getLength() - 1;

      _setContainer({
        body,
        text: text.slice(0, text.length - 1),
        textLength
      });
    });
  }, []);

  useEffect(() => {
    const delta = editor.clipboard.convert(_body);
    editor.setContents(delta, 'silent');
  }, [type]);

  return (
      <Editor>
        <input id="imageUploader" type="file" accept="image/*" style={{visibility: 'hidden', height: '0', width: '0'}} />
        <Toolbar id={quillToolbarId} textLength={_container.textLength} />
        <Container id={quillContainerId} />
      </Editor>
  );
}

export default CustomQuill;
