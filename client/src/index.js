import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let state = {};
window.setState = (changes) => {
    state = Object.assign({}, changes);
    ReactDOM.render(<App {...state} />, document.getElementById('root'));
};

let initialState = {
    location: window.location.pathname.replace(/^\/?|\/$/g,""),
};

window.setState(initialState);

serviceWorker.unregister();
