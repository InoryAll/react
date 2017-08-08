/*
*项目路由
* */
import React from 'react';
import {Router,Route,browserHistory,IndexRoute,Redirect} from 'react-router';
import Main from "./components/Main";
import {LoginForm} from "./form/containers/Login";
import Init from "./components/Init";
import Form from './form/components/Form';
import {RegisterForm} from "./form/containers/Register";
import Student from "./student/components/Student";
import Teacher from "./teacher/Teacher";
import StudentCarousel from "./student/components/StudentCarousel";
import TeacherCarousel from "./teacher/TeacherCarousel";
import {StudentInfoShowForm} from "./student/containers/StudentInfoShow";
import {StudentInfoUpdateForm} from "./student/containers/StudentInfoUpdate";
import {TeacherInfoShowForm} from "./teacher/TeacherInfoShow";
import {TeacherInfoUpdateForm} from "./teacher/TeacherInfoUpdate";
import StudentCourseSearch from "./student/containers/StudentCourseSearch";
import StudentCourseSelect from "./student/containers/StudentCourseSelect";
import StudentCourseDelete from "./student/containers/StudentCourseDelete";
import StudentCourseJudgeSearch from "./student/containers/StudentCourseJudgeSearch";
import StudentCourseJudge from "./student/containers/StudentCourseJudge";
import TeacherCourseSearch from "./teacher/TeacherCourseSearch";

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

            <Route path="student(/:id)" components={Student}>
                <IndexRoute components={StudentCarousel}/>
                <Route path="/student/info/search" components={StudentInfoShowForm}/>
                <Route path="/student/info/update" components={StudentInfoUpdateForm}/>
                <Route path="/student/course/search" components={StudentCourseSearch}/>
                <Route path="/student/course/select" components={StudentCourseSelect}/>
                <Route path="/student/course/delete" components={StudentCourseDelete}/>
                <Route path="/student/judge/search" components={StudentCourseJudgeSearch}/>
                <Route path="/student/judge/dojudge" components={StudentCourseJudge}/>
            </Route>
            <Route path="teacher(/:id)" components={Teacher}>
                <IndexRoute components={TeacherCarousel}/>
                <Route path="/teacher/info/search" components={TeacherInfoShowForm}/>
                <Route path="/teacher/info/update" components={TeacherInfoUpdateForm}/>
                <Route path="/teacher/course/search" components={TeacherCourseSearch}/>
            </Route>

        </Route>
    </Router>);
