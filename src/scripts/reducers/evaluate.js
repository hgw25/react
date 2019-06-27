const defaultState = {
    getInfo: [],
    commentInfo:[]
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case "getInfo":
            return { ...state, getInfo: action.getInfo };
            break;

        case "getCommentInfo":
            return { ...state, commentInfo: action.commentInfo };
            break;
        default:
            return state;
            break;
    }
}