import {SET_REGISTER} from "../action/actions";

export default function register(state=false,action) {
    switch(action.type){
        case SET_REGISTER:
            return action.canRegistered;
        default:
            return state;
    }
}