//saga watcher следит за диспатчем экшена в приложении и запускает воркер
// описывает вачеры

//Saga worker сага которая запускаеться в зависимости от какогото выполненного экшина 
// выполняет бизнес логику (запрос, таймоут, запись в кэш) сдесь и пишем логику


// Effects прокидывает в сагу инструкции которую нужно выполнить 
// take указывает ждать выполнение указанного действия
// takeEvery на каждый диспатч выполняется воркер 
// takeLatest только последняя переданная функция
// takeLeading только первый все остальные отменяются
// put тоже что и диспатч
// call дожидается выполнения асинхронщины и только потом возвращяет данные, может принимать параметры
// при работе с асинхронщиной используем call
// take and all are block effects

// spawn если произойдёт ошибка то в отличие от fork остальные саги не отвалятся (тоже не блокирующяя)
// join заблокировать не блокирующюю задачу и сделать что то ещё
// select получить данные из стора
import { call, takeEvery, put, fork, spawn, join } from 'redux-saga/effects'
import { addAsyncComments, addAsyncTodo } from '../Redux/reducers/secontReducer'

// просто функция которую нужно выполнить
async function getMore(pattern) {
   const request = await fetch(`https://jsonplaceholder.typicode.com/${pattern}`)
   const data = await request.json()
   return data
}

export function* loadTodos() {
   // асинхронщину делаем call (вторым параметром можем передать аргументы)
   const todos = yield call(getMore, 'todos/1')
   yield put(addAsyncTodo(todos))
   return todos
}

export function* loadComents() {
   const comments = yield call(getMore, 'comments/1')
   yield put(addAsyncComments(comments))
}

export function* workerSaga() {
   // fork паралельно выполняет 2 функции
   // call последовательно выполняет 2 функции
   const task = yield spawn(loadTodos)
   yield spawn(loadComents)

   const todos = yield join(task)
   console.log('finish paralel', todos);
}



export function* watchClickSaga() {
   // по клику выполняем функцию
   yield takeEvery('LOAD_ASYNK_DATA', workerSaga)
}

export default function* rootSaga() {
   // здесь запускаем все наши саги при помощи вачера
   // только не забудь БЛЭТ
   yield watchClickSaga()
}

