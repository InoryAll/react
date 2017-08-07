import {SET_LOGIN} from '../action/actions';

export default function login(state=false,action) {
    switch(action.type){
        case SET_LOGIN:
            return action.isSucceed;
        default:
            return state;
    }
}