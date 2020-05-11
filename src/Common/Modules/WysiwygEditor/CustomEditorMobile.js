import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import Icon from '../Icon';

class CustomEditorMobile extends React.Component {
  state = {
    isOpen: false
  };
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
      container: '#toolbar-mobile',
      handlers: {
        image: () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          // 1. formData -v
          // input.onchange = () => {
          //   const file = input.files[0];
          //   console.log(file);
          //   this._converterImg(file);
          // };

          // 2. base64 -v
          input.onchange = async () => {
            const file = input.files[0];
            const editor = this.quill.getEditor();
            const range = editor.getSelection(true);
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
              const url = e.target.result;
              editor.insertEmbed(range.index, 'image', url, 'user');
              editor.setSelection(range.index + 1);
            };
          };
        }
      }
    }
  };

  setOpen = isOpen => this.setState({ isOpen });

  render() {
    const { isOpen } = this.state;
    const { className, body, onChange } = this.props;
    return (
      <Box className={className}>
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
        />
        <Toolbar>
          <div id="toolbar-mobile" className="ql-toolbar ql-snow">
            <span
              className="ql-formats"
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <div>
                <button className="ql-list icon" value="bullet" />
                <button className="ql-indent icon" value="+1" />
                <button className="ql-indent icon" value="-1" />
                <button className="ql-video icon" />
                <button className="ql-link icon" />
                <button className="ql-clean icon" />
              </div>
            </span>
            <span
              className="ql-formats"
              style={{ display: isOpen ? 'none' : 'block' }}
            >
              <div>
                <button className="ql-bold icon" />
                <button className="ql-italic icon" />
                <button className="ql-underline icon" />
                <button className="ql-strike icon" />
                <button className="ql-blockquote icon" />
                <button className="ql-image icon" />
              </div>
            </span>
          </div>
          <ToggleBtn
            onClick={() => this.setOpen(false)}
            style={{ display: isOpen ? 'flex' : 'none' }}
          >
            <Icon type="arrow-ios-upward-outline" cursor="pointer" />
          </ToggleBtn>
          <ToggleBtn
            onClick={() => this.setOpen(true)}
            style={{ display: !isOpen ? 'flex' : 'none' }}
          >
            <Icon type="arrow-ios-downward-outline" cursor="pointer" />
          </ToggleBtn>
        </Toolbar>
      </Box>
    );
  }
}

const Box = styled.div`
  .ql-container.ql-snow {
    padding-bottom: 15px;
    border: none;
  }
  .ql-editor.ql-blank::before {
    font-style: normal;
    color: rgba(0, 0, 0, 0.3);
  }
  .ql-editor {
    min-height: 30px !important;
    max-height: 50vh;
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
`;

const Toolbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  padding: 0px 16px 8px 16px;
  display: flex;
  justify-content: space-between;
  #toolbar-mobile {
    span {
      margin-right: 0px;
      display: flex;
      align-items: center;
    }
  }

  .ql-snow.ql-toolbar {
    border: none;
    padding: 0px;
  }

  .ql-snow.ql-toolbar .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin: 8px 8px 0px 0px;
    background-color: #f1f1f1;
    :hover {
      background-color: rgba(0, 116, 255, 0.1);
      svg {
        fill: #0074ff;
      }
    }
  }
`;

const ToggleBtn = styled.div`
  padding-top: 8px;
  display: flex;
  align-items: center;
`;

export default CustomEditorMobile;

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
