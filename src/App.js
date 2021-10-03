import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Redux/reducers/MainReducer";
import { addTodo, changeTodoCompleted, removeTodo } from "./Redux/reducers/secontReducer";
import './Styles.css'


function App() {

  const dispatch = useDispatch()

  const { count } = useSelector(store => store.countSlice)
  const { todos } = useSelector(store => store.todoSlice)

  console.log(todos);
  const [inputValue, setInputValue] = useState('')

  const addTodoAndSetInput = () => {
    if (inputValue) {
      dispatch(addTodo({ title: inputValue, completed: false, id: Date.now() }))
      setInputValue('')

    }
  }



  return (
    <div className="App">

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>{count}</p>
        <button onClick={() => dispatch(increment())}>Добавить</button>
        <button onClick={() => dispatch(decrement())}>Отнять</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='add todo' />
          <button onClick={() => addTodoAndSetInput()}>Add</button>

        </form>

        <div>
          {
            todos.map((el, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                <p
                  className={el.completed?'active':''}
                  onClick={() => dispatch(changeTodoCompleted(el.index))}
                >
                  {el.title}</p>
                <button
                  style={{ height: '25px', display: 'flex', alignSelf: 'center', marginLeft: '10px' }}
                  onClick={() => dispatch(removeTodo(el.id))}>
                  Delete</button>
              </div>
            ))
          }
        </div>
      </div>

    </div >
  );
}

export default App;
