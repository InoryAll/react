import {SHOW_STUDENT_INFO, UPDATE_STUDENT_INFO} from "../action/actions"

export default function student(state={},action) {
    switch(action.type){
        case SHOW_STUDENT_INFO:
            return action.student;
        case UPDATE_STUDENT_INFO:
            return Object.assign({},state,action.student);
        default:
            return {};
    }
}