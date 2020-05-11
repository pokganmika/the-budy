import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App/App';
import dotenv from 'dotenv';
import './Config/firebase';
import * as serviceWorker from './serviceWorker';
dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
