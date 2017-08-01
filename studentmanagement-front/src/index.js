/*
*项目入口
* */

import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./Main";
import './index.css';
import {routers} from "./routers";
import Init from "./Init";

ReactDOM.render(
    <Init>
        {routers}
    </Init>,
    document.getElementById('root')
);
