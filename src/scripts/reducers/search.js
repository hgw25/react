const defaultState = {
    searchList: []
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case "searchList":
            return { ...state, searchList: action.searchList };
            break;
        case "getReverseFood":
            return { ...state, searchList: state.searchList.reverse() }
            break;
        default:
            return state;
            break;
    }

}