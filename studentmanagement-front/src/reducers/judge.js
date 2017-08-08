import {JUDGE_STUDENT_COURSE, SET_JUDGE_MODAL, SHOW_JUDGE_MODAL} from "../action/actions";

export default function judge(state={}, action) {
    switch (action.type){
        case SHOW_JUDGE_MODAL:
            return Object.assign({},state,{
                visible:action.visible,
                handleIndex:action.handleIndex
            });
        case SET_JUDGE_MODAL:
            return Object.assign({},state,{
                appearance:action.appearance,
                quality:action.quality,
                atmosphere:action.atmosphere,
                method:action.method,
                attitude:action.attitude,
                other:action.other
            });
        default:
            return state;
    }
}