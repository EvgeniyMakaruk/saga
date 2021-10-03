import { createReducer, createSlice } from "@reduxjs/toolkit";



export const todoSlice = createSlice({
   name: 'todoSlice',
   initialState: {
      todos: [],
      asyncTodo: [],
      asyncComments: [],
   },
   reducers: {
      addTodo(state, action) {
         state.todos.push(action.payload)
      },
      removeTodo(state, action) {
         state.todos = state.todos.filter((el) => el.id !== action.payload)
      },
      addAsyncTodo(state, action) {
         state.asyncTodo.push(action.payload)
      },
      addAsyncComments(state, action) {
         state.asyncComments.push(action.payload)
      },


   }
})
export const { addTodo, removeTodo, addAsyncTodo, addAsyncComments } = todoSlice.actions
export default todoSlice.reducer

