// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { init } from 'emailjs-com';

// Initialize EmailJS with your user ID
init(process.env.REACT_APP_EMAILJS_USER_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);