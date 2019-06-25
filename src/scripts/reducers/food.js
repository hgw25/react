const defaultState = {
    food: [],
    tabs: [],
    foodList: [],
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case "getFood":
            return { ...state, food: action.food };
            break;
        case "getFoodType":
            return { ...state, tabs: action.tabs };
            break;
        case "getFoodList":
            return { ...state, foodList: action.foodList };
            break;
        default:
            return state;
            break;
    }

}