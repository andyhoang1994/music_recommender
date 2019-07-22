import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function getAccessToken() {
    var result = window.location.hash.match(/#(?:access_token)=([\S\s]*?)&/);
    return (result ? result[1] : '');
};

ReactDOM.render(<App accessToken={getAccessToken()}/>, document.getElementById('root'));