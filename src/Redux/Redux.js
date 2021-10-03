import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import countSlice from "./reducers/MainReducer"
import todoSlice from "./reducers/secontReducer"



const rootReducer = combineReducers({
   countSlice,
   todoSlice,
   
})


export const store = configureStore({
   reducer: rootReducer
})