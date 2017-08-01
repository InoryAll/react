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
import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import StudentCarousel from "./student/StudentCarousel";
import TeacherCarousel from "./teacher/TeacherCarousel";

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

            <Route path="student/:id" components={Student}>
                <IndexRoute components={StudentCarousel}/>
            </Route>
            <Route path="teacher/:id" components={Teacher}>
                <IndexRoute components={TeacherCarousel}/>
            </Route>

        </Route>
    </Router>);
