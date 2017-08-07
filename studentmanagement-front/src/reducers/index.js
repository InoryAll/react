import {combineReducers} from 'redux';
import login from '../reducers/login';
import register from '../reducers/register';
import student from '../reducers/student';
import course from '../reducers/course';
import courseFilter from '../reducers/courseFilter';

export const rooterReducer=combineReducers({
    login,
    register,
    student,
    course,
    courseFilter
});