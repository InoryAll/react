
import {SEARCH_STUDENT_COURSE} from "../action/actions";

export default function course(state=[], action) {
    switch(action.type){
        case SEARCH_STUDENT_COURSE:
            return action.courses;
        default:
            return state;
    }
}