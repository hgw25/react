const defaultState = {
    item:[]
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case "saveItem":
            return { ...state, item: action.item };
            break;
        default:
            return state;
            break;
    }

}