import { createReducer, createSlice } from "@reduxjs/toolkit";



export const todoSlice = createSlice({
   name: 'todoSlice',
   initialState: {
      todos: [],
   },
   reducers: {
      addTodo(state, action) {
         state.todos.push(action.payload)
      },
      removeTodo(state, action) {
         state.todos = state.todos.filter((el) => el.id !== action.payload)
      },


   }
})
export const { addTodo, removeTodo, changeTodoCompleted } = todoSlice.actions
export default todoSlice.reducer

