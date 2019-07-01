import { OBSERVEGAME, CANCELOBSERVE, GETISOBSERVE } from "../actions"


const defaultState = {
    isObserve:false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case OBSERVEGAME:
            return { ...state, isObserve: action.isObserve };
            break;

        case CANCELOBSERVE:
            return { ...state, isObserve: action.isObserve };
            break;
        case GETISOBSERVE:
            return { ...state, isObserve: action.isObserve };
            break;
        default:
            return state;
            break;
    }
}