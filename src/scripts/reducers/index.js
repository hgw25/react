import {combineReducers} from "redux"
import food from "./food"
import searchList from "./search"

export const reducers = combineReducers({
    food:food,
    searchList:searchList
})