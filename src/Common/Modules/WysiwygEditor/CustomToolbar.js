import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill from 'react-quill';
import Icon from '../../../Common/Modules/Icon';
const icons = ReactQuill.Quill.import('ui/icons');

icons['bold'] = ReactDOMServer.renderToString(
  <Icon type="bold" cursor="pointer" />
);
icons['italic'] = ReactDOMServer.renderToString(
  <Icon type="italic" cursor="pointer" />
);
icons['underline'] = ReactDOMServer.renderToString(
  <Icon type="underline" cursor="pointer" />
);
icons['strike'] = ReactDOMServer.renderToString(
  <Icon type="text-strike-through" cursor="pointer" />
);
icons['blockquote'] = ReactDOMServer.renderToString(
  <Icon type="left-to-right-text-direction" cursor="pointer" />
);
icons['image'] = ReactDOMServer.renderToString(
  <Icon type="image" cursor="pointer" />
);
icons['list'] = ReactDOMServer.renderToString(
  <Icon type="list-ul" cursor="pointer" />
);
icons['indent'] = ReactDOMServer.renderToString(
  <Icon type="right-indent-alt" cursor="pointer" />
);
icons['indent'] = ReactDOMServer.renderToString(
  <Icon type="right-indent-alt" cursor="pointer" />
);
icons['video'] = ReactDOMServer.renderToString(
  <Icon type="film" cursor="pointer" />
);
icons['link'] = ReactDOMServer.renderToString(
  <Icon type="link-h" cursor="pointer" />
);
icons['clean'] = ReactDOMServer.renderToString(
  <Icon type="redo" cursor="pointer" />
);
icons['down'] = ReactDOMServer.renderToString(
  <Icon type="arrow-ios-downward-outline" cursor="pointer" />
);
icons['up'] = ReactDOMServer.renderToString(
  <Icon type="arrow-ios-upward-outline" cursor="pointer" />
);

function CustomToolbar() {
  return (
    <div id="toolbar" className="ql-toolbar ql-snow">
      <span className="ql-formats">
        <button className="ql-bold icon" />
        <button className="ql-italic icon" />
        <button className="ql-underline icon" />
        <button className="ql-strike icon" />
      </span>

      <span className="ql-formats">
        <button className="ql-blockquote icon" />
      </span>
      <span className="ql-formats">
        <button className="ql-image icon" />
      </span>

      <span className="ql-formats">
        <button className="ql-list icon" value="bullet" />
        <button className="ql-indent icon" value="+1" />
        <button className="ql-indent icon" value="-1" />
      </span>

      <span className="ql-formats">
        <button className="ql-video icon" />
        <button className="ql-link icon" />
      </span>

      <span className="ql-formats">
        <button className="ql-clean icon" />
      </span>
    </div>
  );
}

export default CustomToolbar;
