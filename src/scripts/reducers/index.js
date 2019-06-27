import {combineReducers} from "redux"
import food from "./food"
import searchList from "./search"
import item from "./item"
import evaluate from "./evaluate"

export const reducers = combineReducers({
    food:food,
    searchList:searchList,
    item:item,
    evaluate:evaluate
})