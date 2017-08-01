/*
*项目路由
* */
import React from 'react';
import {Router,Route,browserHistory,IndexRoute,Redirect} from 'react-router';
import Main from "./Main";
import {LoginForm} from "./form/Login";
import Init from "./Init";
import Form from './form/Form'
import {RegisterForm} from "./form/Register";

export const routers=(
    <Router history={browserHistory}>
        <Route path="/" components={Init}>
            <IndexRoute components={Main}/>

            {/*重定向user到user/login*/}
            <Redirect from="user" to="user/login"/>

            <Route path="user" components={Form}>
                <Route path="login" components={LoginForm}/>
                <Route path="register" components={RegisterForm}/>
            </Route>
        </Route>
    </Router>);
