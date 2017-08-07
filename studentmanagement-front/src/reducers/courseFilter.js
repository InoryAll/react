import {FILTER_COURSE} from "../action/actions";

export default function courseFilter(state={}, action) {
    switch(action.type){
        case FILTER_COURSE:
            return action.filter;
        default:
            return state;
    }
}