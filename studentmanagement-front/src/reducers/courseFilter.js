import {DO_FILTER, FILTER_COURSE} from "../action/actions";

export default function courseFilter(state={}, action) {
    switch(action.type){
        case FILTER_COURSE:
            return Object.assign({},state,action.filter);
        default:
            return state;
    }
}