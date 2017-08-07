/*
*项目入口
* */

import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";
import './index.css';
import {routers} from "./routers";
import Init from "./components/Init";
import store from './store/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Init>
            {routers}
        </Init>
    </Provider>,
    document.getElementById('root')
);
