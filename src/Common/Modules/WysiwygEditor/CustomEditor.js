import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';

class CustomEditor extends React.Component {
  formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'header',
    'list',
    'script',
    'bullet',
    'indent',
    'direction',
    'size',
    'background',
    'align',
    'link',
    'image',
    'video',
    'font',
    'color',
    'clean'
  ];

  modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        image: () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          // 1. formData -v
          input.onchange = async () => {
            const file = input.files[0];
            const editor = this.quill.getEditor();
            const range = editor.getSelection(true);
            await this.props.imageConverter(file, editor, range);
          };

          // // 2. base64 -v
          // input.onchange = async () => {
          //   const file = input.files[0];
          //   const editor = this.quill.getEditor();
          //   const range = editor.getSelection(true);
          //   const fileReader = new FileReader();

          //   fileReader.readAsDataURL(file);
          //   fileReader.onload = function(e) {
          //     const url = e.target.result;
          //     editor.insertEmbed(range.index, 'image', url, 'user');
          //     editor.setSelection(range.index + 1);
          //   };
          // };
        }
      }
    }
  };

  render() {
    const { className, body, onChange } = this.props;
    return (
      <Box className={className}>
        <CustomToolbar />
        <ReactQuill
          value={body}
          onChange={html => {
            const bodyLength = this.quill.getEditor().getLength() - 1;
            const bodyText = this.quill.getEditor().getText();
            return onChange(html, bodyText, bodyLength);
          }}
          placeholder="Type here..."
          modules={this.modules}
          formats={this.formats}
          ref={ref => {
            this.quill = ref;
          }}
          maxLength="40"
        />
      </Box>
    );
  }
}

const Box = styled.div`
  .ql-container {
    padding-bottom: 15px;
  }
  .ql-editor.ql-blank::before {
    font-style: normal;
    color: rgba(0, 0, 0, 0.3);
  }
  .ql-editor {
    min-height: 30px !important;
    max-height: 800px;
    font-family: 'Work Sans';
    font-size: 18px;
    padding: 0px;
    margin: 16px 16px 0px 16px;
  }
  .ql-editor .ql-video {
    max-width: none;
    width: 100%;
    height: 45vh;
    @media (max-width: 530px) {
      height: 200px;
    }
  }
  .ql-snow .ql-editor img {
    width: 100%;
    height: 45vh;
    @media (max-width: 530px) {
      height: 200px;
    }
  }
  .ql-snow.ql-toolbar {
    padding: 8px 0px;
    margin-bottom: 8px;
  }

  .ql-snow.ql-toolbar button {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: red;
    margin-right: 8px;
    background-color: #f1f1f1;
    :hover {
      background-color: rgba(0, 116, 255, 0.1);
      svg {
        fill: #0074ff;
      }
    }
  }
`;

export default CustomEditor;

// const Size = Quill.import('formats/size');
// Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
// Quill.register(Size, true);

// const Font = Quill.import('formats/font');
// Font.whitelist = [
//   'arial',
//   'comic-sans',
//   'courier-new',
//   'georgia',
//   'helvetica',
//   'lucida'
// ];
// Quill.register(Font, true);
