
import {DELETE_STUDENT_COURSE, DO_FILTER, SEARCH_STUDENT_COURSE, SELECT_STUDENT_COURSE,JUDGE_STUDENT_COURSE} from "../action/actions";

export default function course(state={}, action) {
    switch(action.type){
        case SEARCH_STUDENT_COURSE:
            return Object.assign({},state, {
                courses:action.courses
            });
        case DO_FILTER:
            return Object.assign({},state, {
                filterCourses:action.filterCourses
            });
        case SELECT_STUDENT_COURSE:
            return Object.assign({},state,{
                courses:[...state.courses.slice(0,action.index),...state.courses.slice(action.index+1)],
                filterCourses:[...state.filterCourses.slice(0,action.index),...state.filterCourses.slice(action.index+1)]
            });
        case DELETE_STUDENT_COURSE:
            return Object.assign({},state,{
                courses:[...state.courses.slice(0,action.index),...state.courses.slice(action.index+1)],
                filterCourses:[...state.filterCourses.slice(0,action.index),...state.filterCourses.slice(action.index+1)]
            });
        case JUDGE_STUDENT_COURSE:
            return Object.assign({},state,{
                courses:[...state.courses.slice(0,action.index),...state.courses.slice(action.index+1)],
                filterCourses:[...state.filterCourses.slice(0,action.index),...state.filterCourses.slice(action.index+1)]
            });
        default:
            return state;
    }
}