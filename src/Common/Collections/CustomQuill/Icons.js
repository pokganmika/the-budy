import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill from 'react-quill';
import Icon from '../../Elements/Icon';
const icons = ReactQuill.Quill.import('ui/icons');

// console.log('====== default quill icons ======');
// console.log(JSON.parse(JSON.stringify(icons)));

icons['bold'] = ReactDOMServer.renderToString(<Icon name="bold" />);
icons['italic'] = ReactDOMServer.renderToString(<Icon name="italic" />);
icons['underline'] = ReactDOMServer.renderToString(<Icon name="underline" />);
icons['strike'] = ReactDOMServer.renderToString(<Icon name="strikethrough" />);
icons['blockquote'] = ReactDOMServer.renderToString(<Icon name="quote" />);
icons['image'] = ReactDOMServer.renderToString(<Icon name="image" />);
icons['list']['bullet'] = ReactDOMServer.renderToString(<Icon name="listBullet" />);
icons['list']['ordered'] = ReactDOMServer.renderToString(<Icon name="listOrdered" />);
icons['indent']['+1'] = ReactDOMServer.renderToString(<Icon name="indent" />);
icons['indent']['-1'] = ReactDOMServer.renderToString(<Icon name="outdent" />);
icons['video'] = ReactDOMServer.renderToString(<Icon name="film" />);
icons['link'] = ReactDOMServer.renderToString(<Icon name="link" />);
icons['clean'] = ReactDOMServer.renderToString(<Icon name="redo" />);

export default icons;
