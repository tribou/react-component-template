import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import packageJson from '../../package.json';

const appRoot = document.createElement('div');

appRoot.id = 'app';
document.body.appendChild(appRoot);
ReactDOM.render(<App name={packageJson.name} />, appRoot);
