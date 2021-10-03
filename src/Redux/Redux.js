import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import { applyMiddleware, combineReducers, createStore } from "redux"
import rootSaga from "../ReduxSaga/TodosSaga"
import countSlice from "./reducers/MainReducer"
import todoSlice from "./reducers/secontReducer"

const sagaMiddleWare = createSagaMiddleware()
//creating saga middleWare then don't foget to run it

const rootReducer = combineReducers({
   countSlice,
   todoSlice,
})

export const store1 = createStore(
   rootReducer,
   applyMiddleware(sagaMiddleWare) // add redux-saga as a middleWare


)

//runing saga here 
sagaMiddleWare.run(rootSaga)
