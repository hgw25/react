import {combineReducers} from "redux"
import food from "./food"
import searchList from "./search"
import item from "./item"

export const reducers = combineReducers({
    food:food,
    searchList:searchList,
    item:item
})