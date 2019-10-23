import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/GlobalReducer';

const storeRedux = createStore(rootReducer)

ReactDOM.render(
    <Provider store={storeRedux}>
        <App/>
    </Provider>, document.getElementById('root'));

