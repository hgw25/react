const defaultState = {
    food:[]
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case "getFood":
            return {...state,food:action.food}
        default:
            return state;
            break;
    }

}